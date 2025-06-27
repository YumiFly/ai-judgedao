// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// ===================== Shared Types =====================

library DisputeStatusLib {
    enum Status {
        None,
        Submitted,
        EvidencePending,
        AwaitingAI,
        AIProposed,
        Voting,
        Resolved,
        Closed
    }
}
