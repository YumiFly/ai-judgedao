// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DisputeRegistry
 * @notice Core storage & lifecycle state-machine for AIJudgeDAO disputes.
 *
 * Responsibilities:
 *   • Register new disputes and basic metadata (case + evidence URIs)
 *   • Coordinate evidence window and trigger Chainlink Functions request
 *   • Receive Gemini AI verdict (via trusted oracle role), store IPFS URI
 *   • Expose Automation-friendly hooks for timed transitions
 */

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

import "./DisputeStatusLib.sol";

contract DisputeRegistry is AccessControl, ChainlinkClient, AutomationCompatibleInterface {
    using Counters for Counters.Counter;
    using DisputeStatusLib for DisputeStatusLib.Status;

    bytes32 public constant AI_ORACLE_ROLE  = keccak256("AI_ORACLE_ROLE");
    bytes32 public constant AUTOMATION_ROLE = keccak256("AUTOMATION_ROLE");

    uint64  public immutable subscriptionId;
    address public immutable functionsRouter;

    struct Dispute {
        address claimant;
        address respondent;
        uint256 ruleSetId;
        string  caseURI;
        string  evidenceURI;
        string  aiVerdictURI;
        DisputeStatusLib.Status status;
        uint256 createdAt;
        uint256 finalVerdictAt;
    }

    Counters.Counter private _ids;
    mapping(uint256 => Dispute) public disputes;

    event DisputeSubmitted(uint256 indexed id, address claimant, address respondent, uint256 ruleSetId);
    event EvidenceUpdated(uint256 indexed id, string evidenceURI);
    event AIVerdictProposed(uint256 indexed id, string aiVerdictURI);
    event DisputeStatusChanged(uint256 indexed id, DisputeStatusLib.Status newStatus);

    constructor(
        address admin,
        uint64 _subscriptionId,
        address _functionsRouter
    ) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(AI_ORACLE_ROLE, admin);
        _setupRole(AUTOMATION_ROLE, admin);

        subscriptionId = _subscriptionId;
        functionsRouter = _functionsRouter;
        setChainlinkFunctionsOracle(_functionsRouter);
    }

    function submitDispute(
        address respondent,
        uint256 ruleSetId,
        string calldata caseURI
    ) external returns (uint256 id) {
        _ids.increment();
        id = _ids.current();
        disputes[id] = Dispute({
            claimant: msg.sender,
            respondent: respondent,
            ruleSetId: ruleSetId,
            caseURI: caseURI,
            evidenceURI: "",
            aiVerdictURI: "",
            status: DisputeStatusLib.Status.Submitted,
            createdAt: block.timestamp,
            finalVerdictAt: 0
        });
        emit DisputeSubmitted(id, msg.sender, respondent, ruleSetId);
        emit DisputeStatusChanged(id, DisputeStatusLib.Status.Submitted);
    }

    function addEvidence(uint256 id, string calldata evidenceURI) external {
        Dispute storage d = disputes[id];
        require(msg.sender == d.claimant || msg.sender == d.respondent, "Not party");
        require(d.status == DisputeStatusLib.Status.Submitted || d.status == DisputeStatusLib.Status.EvidencePending, "Stage passed");
        d.evidenceURI = evidenceURI;
        d.status = DisputeStatusLib.Status.EvidencePending;
        emit EvidenceUpdated(id, evidenceURI);
        emit DisputeStatusChanged(id, d.status);
    }

    function attachAIVerdict(uint256 id, string calldata verdictURI) external onlyRole(AI_ORACLE_ROLE) {
        Dispute storage d = disputes[id];
        require(d.status == DisputeStatusLib.Status.AwaitingAI, "Not awaiting AI");
        d.aiVerdictURI = verdictURI;
        d.status = DisputeStatusLib.Status.AIProposed;
        emit AIVerdictProposed(id, verdictURI);
        emit DisputeStatusChanged(id, d.status);
    }

    function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory performData) {
        upkeepNeeded = false; performData = ""; // Implement window checks in production
    }

    function performUpkeep(bytes calldata) external override onlyRole(AUTOMATION_ROLE) {
        // Trigger Functions request for disputes transitioning to AwaitingAI
    }
}