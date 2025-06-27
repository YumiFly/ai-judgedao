// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RuleSetRegistry
 * @notice Stores metadata pointers (IPFS hashes) to legal rule sets that
 *         a dispute may reference. Governance or an authorized admin can
 *         add rule packs. Designed for easy plug-in of multi-jurisdiction
 *         regulations.
 */

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RuleSetRegistry is AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant RULE_ADMIN = keccak256("RULE_ADMIN");

    struct RuleSet {
        bytes32 ipfsHash;
        string  title;
        string  jurisdiction;
        uint256 timestamp;
    }

    Counters.Counter private _ids;
    mapping(uint256 => RuleSet) public ruleSets;

    event RuleSetAdded(uint256 indexed id, bytes32 ipfsHash, string title, string jurisdiction);

    constructor(address admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(RULE_ADMIN, admin);
    }

    function addRuleSet(
        bytes32 ipfsHash,
        string calldata title,
        string calldata jurisdiction
    ) external onlyRole(RULE_ADMIN) returns (uint256 id) {
        _ids.increment();
        id = _ids.current();
        ruleSets[id] = RuleSet({
            ipfsHash: ipfsHash,
            title: title,
            jurisdiction: jurisdiction,
            timestamp: block.timestamp
        });
        emit RuleSetAdded(id, ipfsHash, title, jurisdiction);
    }
}