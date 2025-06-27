import { DisputeHeader } from "@/components/dispute-header"
import { DisputeStatusTimeline } from "@/components/dispute-status-timeline"
import { ChainStatusBox } from "@/components/chain-status-box"
import { MockControlPanel } from "@/components/mock-control-panel"
import { EvidencePanel } from "@/components/evidence-panel"
import { ContractStatusPanel } from "@/components/contract-status-panel"
import { TopNavigation, BottomNavigation } from "@/components/navigation"

// Mock data for dispute 001 - Following contract flow
const mockDispute = {
  dispute_id: "dispute_001",
  title: "Smart Contract Payment Dispute",
  description: "Service delivery agreement dispute involving blockchain development services. The claimant alleges that the respondent failed to deliver agreed services within the specified timeframe, triggering a payment dispute clause worth 50,000 USDC.",
  evidence_ipfs: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
  status: "Resolved", // Following DisputeStatusLib.Status
  submitted_by: "0x1234567890123456789012345678901234567890",
  created_at: "2024-01-15T10:30:00Z",
  // Additional contract-specific fields
  claimant: "0x1234567890123456789012345678901234567890",
  respondent: "0x9876543210987654321098765432109876543210",
  ruleSetId: 2, // Smart Contract Dispute Rules v1.0
  amount: "50,000 USDC",
  category: "Contract Breach",
  caseURI: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
  evidenceURI: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
  aiVerdictURI: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
  createdAt: 1705312200, // Unix timestamp: 2024-01-15T10:30:00Z
  finalVerdictAt: 1705571400, // Unix timestamp: 2024-01-18T10:30:00Z
}

// AI Verdict following contract structure
const mockAIVerdict = {
  decision: "GUILTY", // Respondent is found guilty
  confidence: 85,
  reasoning: "Based on the evidence provided, the smart contract terms were clearly violated. The respondent failed to deliver the agreed services within the specified timeframe, triggering the payment dispute clause. Analysis of the communication records shows acknowledgment of delays without valid justification. The work progress screenshots do not demonstrate completion of the required milestones as per the original service agreement.",
  analysisDetails: {
    contractTermsViolation: true,
    evidenceQuality: "High",
    timelineAnalysis: "Delivery was 15 days overdue",
    communicationAnalysis: "Respondent acknowledged delays but provided insufficient justification",
    workProgressAnalysis: "Submitted screenshots show incomplete work not meeting milestone requirements"
  }
}

// Arbiter panel following VerdictManager structure
const mockArbiters = [
  {
    id: "arbiter_001",
    address: "0xABC123...DEF456",
    reputation: 95,
    totalStake: "10,000 JUDGE",
    casesHandled: 47,
    hasVoted: true,
    vote: {
      inFavorClaimant: true, // Agrees with AI verdict
      stake: 10000,
      timestamp: 1705485000, // 2024-01-17T10:30:00Z
      reason: "The evidence clearly shows contract breach. The respondent failed to meet delivery deadlines and the work submitted does not meet the agreed specifications. The AI analysis is accurate and well-reasoned."
    }
  },
  {
    id: "arbiter_002",
    address: "0x789ABC...123DEF",
    reputation: 88,
    totalStake: "8,500 JUDGE",
    casesHandled: 32,
    hasVoted: true,
    vote: {
      inFavorClaimant: false, // Disagrees with AI verdict
      stake: 8500,
      timestamp: 1705488600, // 2024-01-17T11:30:00Z
      reason: "While there were delays, the respondent showed good faith effort and provided regular updates. The work quality appears acceptable despite timeline issues. Partial payment may be more appropriate than full penalty."
    }
  },
  {
    id: "arbiter_003",
    address: "0x456DEF...789ABC",
    reputation: 92,
    totalStake: "12,000 JUDGE",
    casesHandled: 55,
    hasVoted: true,
    vote: {
      inFavorClaimant: true, // Agrees with AI verdict
      stake: 12000,
      timestamp: 1705492200, // 2024-01-17T12:30:00Z
      reason: "Contract terms are clear and binding. The respondent's failure to deliver on time constitutes a material breach. The penalty clause was agreed upon by both parties and should be enforced."
    }
  }
]

// Timeline following contract status flow: None → Submitted → EvidencePending → AwaitingAI → AIProposed → Voting → Resolved → Closed
const mockTimeline = [
  {
    step: "submitDispute",
    timestamp: "2024-01-15T10:30:00Z",
    completed: true
  },
  {
    step: "addEvidence",
    timestamp: "2024-01-15T14:20:00Z",
    completed: true
  },
  {
    step: "awaitingAI",
    timestamp: "2024-01-16T09:00:00Z",
    completed: true
  },
  {
    step: "aiAnalysis",
    timestamp: "2024-01-16T15:45:00Z",
    completed: true
  },
  {
    step: "selectPanel",
    timestamp: "2024-01-17T09:00:00Z",
    completed: true
  },
  {
    step: "voting",
    timestamp: "2024-01-17T12:30:00Z",
    completed: true
  },
  {
    step: "finalize",
    timestamp: "2024-01-18T10:30:00Z",
    completed: true
  },
  {
    step: "closed",
    timestamp: "2024-01-18T10:35:00Z",
    completed: true
  }
]

// Final verdict calculation following VerdictManager.finalize()
const mockFinalVerdict = {
  claimantWins: true, // Based on weighted voting
  favorVotes: 22000, // 10000 + 12000 (arbiters who voted for claimant)
  againstVotes: 8500, // 8500 (arbiter who voted against)
  totalVotes: 3,
  consensusReached: true,
  executionDetails: {
    paymentToClaimant: "50,000 USDC",
    penaltyToRespondent: "5,000 USDC",
    arbitrationFees: "2,500 USDC",
    platformFee: "1,000 USDC"
  }
}

// Evidence data following contract addEvidence() function
const mockEvidence = [
  {
    id: "evidence_001",
    title: "Original Service Agreement",
    type: "PDF",
    submittedBy: "Claimant",
    timestamp: "2024-01-15T10:30:00Z",
    ipfsHash: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"
  },
  {
    id: "evidence_002",
    title: "Communication Records",
    type: "Text",
    submittedBy: "Respondent",
    timestamp: "2024-01-15T14:20:00Z",
    ipfsHash: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"
  },
  {
    id: "evidence_003",
    title: "Work Progress Screenshots",
    type: "Images",
    submittedBy: "Respondent",
    timestamp: "2024-01-16T09:15:00Z",
    ipfsHash: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"
  }
]

export default function DisputePage() {
  // 使用静态数据展示demo case，避免参数解构问题
  const id = "001" // Demo case ID

  // Note: This page displays a static demo case for demonstration purposes

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Navigation */}
      <TopNavigation />

      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8 max-w-6xl">
        {/* Header */}
        <DisputeHeader dispute={mockDispute} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Timeline, Evidence & Chain Status */}
          <div className="space-y-6">
            <DisputeStatusTimeline timeline={mockTimeline} />
            <ContractStatusPanel
              currentStatus={mockDispute.status}
              disputeId={mockDispute.dispute_id}
              createdAt={mockDispute.createdAt}
              finalVerdictAt={mockDispute.finalVerdictAt}
            />
            <EvidencePanel
              evidence={mockEvidence}
              disputeStatus={mockDispute.status}
              canAddEvidence={false}
            />
            <ChainStatusBox />
            <MockControlPanel />
          </div>

          {/* Right Column - AI Verdict & Arbiter Votes */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Verdict Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                🤖 AI Verdict Analysis
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    mockAIVerdict.decision === "GUILTY"
                      ? "bg-red-600 text-white"
                      : "bg-green-600 text-white"
                  }`}>
                    {mockAIVerdict.decision === "GUILTY" ? "Respondent Guilty" : "Respondent Not Guilty"}
                  </div>
                  <div className="text-slate-300">
                    Confidence: {mockAIVerdict.confidence}%
                  </div>
                </div>
                <p className="text-slate-300 text-sm">{mockAIVerdict.reasoning}</p>
              </div>
            </div>

            {/* Arbiter Votes Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                ⚖️ Arbiter Panel Votes
              </h3>
              <div className="space-y-4">
                {mockArbiters.map((arbiter) => (
                  <div key={arbiter.id} className="border border-slate-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-white font-medium">{arbiter.address}</div>
                        <div className="text-slate-400 text-sm">
                          Rep: {arbiter.reputation}% | Stake: {arbiter.totalStake} | Cases: {arbiter.casesHandled}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        arbiter.vote && arbiter.vote.inFavorClaimant
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}>
                        {arbiter.vote && arbiter.vote.inFavorClaimant ? "For Claimant" : "For Respondent"}
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm">{arbiter.vote && arbiter.vote.reason ? arbiter.vote.reason : 'No reason provided'}</p>
                    <div className="text-slate-400 text-xs mt-2">
                      Vote Weight: {arbiter.vote && arbiter.vote.stake ? arbiter.vote.stake.toLocaleString() : 'N/A'} |
                      Voted: {arbiter.vote && arbiter.vote.timestamp ? new Date(arbiter.vote.timestamp * 1000).toLocaleString() : 'N/A'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Verdict */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                🏛️ Final Verdict
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded-lg text-lg font-bold ${
                    mockFinalVerdict.claimantWins
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}>
                    {mockFinalVerdict.claimantWins ? "Claimant Wins" : "Respondent Wins"}
                  </div>
                  <div className="text-slate-300">
                    Consensus: {mockFinalVerdict.consensusReached ? "Reached" : "Not Reached"}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-400">Votes For Claimant</div>
                    <div className="text-white font-medium">{mockFinalVerdict.favorVotes.toLocaleString()} JUDGE</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Votes For Respondent</div>
                    <div className="text-white font-medium">{mockFinalVerdict.againstVotes.toLocaleString()} JUDGE</div>
                  </div>
                </div>
                <div className="border-t border-slate-600 pt-4">
                  <div className="text-slate-300 font-medium mb-2">Execution Details:</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-slate-400">Payment to Claimant:</div>
                    <div className="text-green-400">{mockFinalVerdict.executionDetails.paymentToClaimant}</div>
                    <div className="text-slate-400">Penalty from Respondent:</div>
                    <div className="text-red-400">{mockFinalVerdict.executionDetails.penaltyToRespondent}</div>
                    <div className="text-slate-400">Arbitration Fees:</div>
                    <div className="text-blue-400">{mockFinalVerdict.executionDetails.arbitrationFees}</div>
                    <div className="text-slate-400">Platform Fee:</div>
                    <div className="text-purple-400">{mockFinalVerdict.executionDetails.platformFee}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
    </div>
  )
}
