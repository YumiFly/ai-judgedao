// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title VerdictManager
 * @notice Handles panel selection, voting, and final verdict emission for AIJudgeDAO.
 *         Enhanced with improved random selection and arbiter pool management.
 *         Supports weighted voting based on stakes and comprehensive arbiter lifecycle.
 */

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./DisputeRegistry.sol";
import "./DisputeStatusLib.sol";

contract VerdictManager is AccessControl {
    using EnumerableSet for EnumerableSet.AddressSet;
    using Counters for Counters.Counter;

    bytes32 public constant ARBITER_ROLE = keccak256("ARBITER_ROLE");
    bytes32 public constant ARBITER_ADMIN_ROLE = keccak256("ARBITER_ADMIN_ROLE");

    DisputeRegistry public immutable registry;
    uint8   public immutable panelSize;
    uint256 public immutable votingPeriod; // seconds
    uint256 public immutable minStakeRequired; // minimum stake to become arbiter

    struct Vote {
        bool inFavorClaimant;
        uint256 stake;
        uint256 timestamp;
        string reason; // optional reasoning
    }

    struct ArbiterInfo {
        uint256 totalStake;
        uint256 casesHandled;
        uint256 reputation; // 0-100 score
        bool isActive;
        uint256 lastActiveTime;
    }

    // Core storage
    EnumerableSet.AddressSet private _activeArbiters;                   // pool of active arbiters
    mapping(address => ArbiterInfo) public arbiterInfo;                 // arbiter details
    mapping(uint256 => EnumerableSet.AddressSet) private _panel;        // disputeId → arbiters
    mapping(uint256 => mapping(address => Vote)) public votes;          // disputeId → voter → vote
    mapping(uint256 => uint256) public votingEnds;                      // disputeId → timestamp
    mapping(uint256 => bool) public verdictFinalized;                   // disputeId → finalized

    // Events
    event ArbiterRegistered(address indexed arbiter, uint256 stake);
    event ArbiterDeactivated(address indexed arbiter);
    event ArbiterReactivated(address indexed arbiter);
    event PanelSelected(uint256 indexed id, address[] arbiters);
    event Voted(uint256 indexed id, address voter, bool favorClaimant, uint256 stake, string reason);
    event VerdictFinalized(uint256 indexed id, bool favorClaimant, uint256 favorVotes, uint256 againstVotes);

    constructor(
        address admin,
        DisputeRegistry _registry,
        uint8 _panelSize,
        uint256 _votingPeriod,
        uint256 _minStakeRequired
    ) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(ARBITER_ADMIN_ROLE, admin);
        registry = _registry;
        panelSize = _panelSize;
        votingPeriod = _votingPeriod;
        minStakeRequired = _minStakeRequired;
    }

    // ---- Arbiter Management ----

    /**
     * @notice Register as an arbiter with required stake
     * @param stake Amount of tokens to stake
     */
    function registerArbiter(uint256 stake) external payable {
        require(stake >= minStakeRequired, "Insufficient stake");
        require(!hasRole(ARBITER_ROLE, msg.sender), "Already registered");
        require(msg.value >= stake, "Insufficient payment");

        _grantRole(ARBITER_ROLE, msg.sender);
        _activeArbiters.add(msg.sender);

        arbiterInfo[msg.sender] = ArbiterInfo({
            totalStake: stake,
            casesHandled: 0,
            reputation: 50, // start with neutral reputation
            isActive: true,
            lastActiveTime: block.timestamp
        });

        emit ArbiterRegistered(msg.sender, stake);
    }

    /**
     * @notice Add additional stake to existing arbiter account
     */
    function addStake() external payable {
        require(hasRole(ARBITER_ROLE, msg.sender), "Not an arbiter");
        require(msg.value > 0, "No stake provided");

        arbiterInfo[msg.sender].totalStake += msg.value;
    }

    /**
     * @notice Deactivate an arbiter (admin only)
     */
    function deactivateArbiter(address arbiter) external onlyRole(ARBITER_ADMIN_ROLE) {
        require(hasRole(ARBITER_ROLE, arbiter), "Not an arbiter");

        arbiterInfo[arbiter].isActive = false;
        _activeArbiters.remove(arbiter);

        emit ArbiterDeactivated(arbiter);
    }

    /**
     * @notice Reactivate an arbiter (admin only)
     */
    function reactivateArbiter(address arbiter) external onlyRole(ARBITER_ADMIN_ROLE) {
        require(hasRole(ARBITER_ROLE, arbiter), "Not an arbiter");
        require(!arbiterInfo[arbiter].isActive, "Already active");

        arbiterInfo[arbiter].isActive = true;
        arbiterInfo[arbiter].lastActiveTime = block.timestamp;
        _activeArbiters.add(arbiter);

        emit ArbiterReactivated(arbiter);
    }

    // ---- Enhanced Panel Selection ----

    /**
     * @notice Select arbiters for a dispute panel using improved randomization
     * @param id Dispute ID
     */
    function selectPanel(uint256 id) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_panel[id].length() == 0, "Panel already set");
        require(_activeArbiters.length() >= panelSize, "Insufficient active arbiters");

        // Create enhanced randomness using multiple sources
        uint256 seed = uint256(keccak256(abi.encodePacked(
            blockhash(block.number - 1),
            blockhash(block.number - 2),
            block.timestamp,
            block.difficulty,
            id,
            msg.sender
        )));

        // Get all active arbiters
        address[] memory candidates = _activeArbiters.values();
        uint256 candidateCount = candidates.length;

        // Fisher-Yates shuffle for fair selection
        for (uint256 i = 0; i < panelSize; i++) {
            uint256 randomIndex = (uint256(keccak256(abi.encodePacked(seed, i))) % (candidateCount - i)) + i;

            // Swap current with random
            address temp = candidates[i];
            candidates[i] = candidates[randomIndex];
            candidates[randomIndex] = temp;

            // Add to panel
            _panel[id].add(candidates[i]);

            // Update arbiter's last active time
            arbiterInfo[candidates[i]].lastActiveTime = block.timestamp;
        }

        votingEnds[id] = block.timestamp + votingPeriod;
        emit PanelSelected(id, _panel[id].values());
    }

    /**
     * @notice Get panel members for a dispute
     */
    function getPanelMembers(uint256 id) external view returns (address[] memory) {
        return _panel[id].values();
    }

    /**
     * @notice Get active arbiters count
     */
    function getActiveArbitersCount() external view returns (uint256) {
        return _activeArbiters.length();
    }

    /**
     * @notice Get all active arbiters
     */
    function getActiveArbiters() external view returns (address[] memory) {
        return _activeArbiters.values();
    }

    // ---- Enhanced Voting ----

    /**
     * @notice Cast vote on a dispute with optional reasoning
     * @param id Dispute ID
     * @param favorClaimant True if voting in favor of claimant
     * @param stake Voting weight (must not exceed arbiter's total stake)
     * @param reason Optional reasoning for the vote
     */
    function castVote(
        uint256 id,
        bool favorClaimant,
        uint256 stake,
        string calldata reason
    ) external {
        require(_panel[id].contains(msg.sender), "Not panel member");
        require(block.timestamp <= votingEnds[id], "Voting period ended");
        require(votingEnds[id] != 0, "Voting not started");
        require(stake > 0, "Stake must be positive");
        require(stake <= arbiterInfo[msg.sender].totalStake, "Stake exceeds balance");
        require(votes[id][msg.sender].timestamp == 0, "Already voted");

        votes[id][msg.sender] = Vote({
            inFavorClaimant: favorClaimant,
            stake: stake,
            timestamp: block.timestamp,
            reason: reason
        });

        emit Voted(id, msg.sender, favorClaimant, stake, reason);
    }

    /**
     * @notice Finalize verdict after voting period ends
     * @param id Dispute ID
     */
    function finalize(uint256 id) external {
        require(block.timestamp > votingEnds[id], "Voting still active");
        require(votingEnds[id] != 0, "Voting not started");
        require(!verdictFinalized[id], "Already finalized");

        uint256 favorVotes = 0;
        uint256 againstVotes = 0;
        uint256 totalVotes = 0;

        // Count weighted votes
        for (uint256 i = 0; i < _panel[id].length(); i++) {
            address arbiter = _panel[id].at(i);
            Vote memory vote = votes[id][arbiter];

            if (vote.timestamp != 0) { // arbiter voted
                totalVotes++;
                if (vote.inFavorClaimant) {
                    favorVotes += vote.stake;
                } else {
                    againstVotes += vote.stake;
                }

                // Update arbiter stats
                arbiterInfo[arbiter].casesHandled++;
            }
        }

        require(totalVotes > 0, "No votes cast");

        bool claimantWins = favorVotes > againstVotes;
        verdictFinalized[id] = true;

        // Update arbiters' reputation based on consensus
        _updateArbitersReputation(id, claimantWins, favorVotes, againstVotes);

        emit VerdictFinalized(id, claimantWins, favorVotes, againstVotes);
    }

    /**
     * @notice Update arbiters' reputation based on voting consensus
     */
    function _updateArbitersReputation(
        uint256 id,
        bool finalVerdict,
        uint256 favorVotes,
        uint256 againstVotes
    ) private {
        uint256 totalVotes = favorVotes + againstVotes;
        if (totalVotes == 0) return;

        for (uint256 i = 0; i < _panel[id].length(); i++) {
            address arbiter = _panel[id].at(i);
            Vote memory vote = votes[id][arbiter];

            if (vote.timestamp != 0) { // arbiter voted
                bool votedWithMajority = (vote.inFavorClaimant == finalVerdict);

                if (votedWithMajority) {
                    // Increase reputation for voting with majority
                    if (arbiterInfo[arbiter].reputation < 100) {
                        arbiterInfo[arbiter].reputation =
                            arbiterInfo[arbiter].reputation + 1;
                    }
                } else {
                    // Decrease reputation for voting against majority
                    if (arbiterInfo[arbiter].reputation > 0) {
                        arbiterInfo[arbiter].reputation =
                            arbiterInfo[arbiter].reputation - 1;
                    }
                }
            }
        }
    }

    /**
     * @notice Get vote details for a specific arbiter on a dispute
     */
    function getVote(uint256 id, address arbiter) external view returns (
        bool inFavorClaimant,
        uint256 stake,
        uint256 timestamp,
        string memory reason
    ) {
        Vote memory vote = votes[id][arbiter];
        return (vote.inFavorClaimant, vote.stake, vote.timestamp, vote.reason);
    }

    /**
     * @notice Check if voting period is active for a dispute
     */
    function isVotingActive(uint256 id) external view returns (bool) {
        return votingEnds[id] != 0 && block.timestamp <= votingEnds[id];
    }

    /**
     * @notice Get voting statistics for a dispute
     */
    function getVotingStats(uint256 id) external view returns (
        uint256 favorVotes,
        uint256 againstVotes,
        uint256 totalVoters,
        uint256 votedCount
    ) {
        totalVoters = _panel[id].length();

        for (uint256 i = 0; i < totalVoters; i++) {
            address arbiter = _panel[id].at(i);
            Vote memory vote = votes[id][arbiter];

            if (vote.timestamp != 0) {
                votedCount++;
                if (vote.inFavorClaimant) {
                    favorVotes += vote.stake;
                } else {
                    againstVotes += vote.stake;
                }
            }
        }
    }
}
