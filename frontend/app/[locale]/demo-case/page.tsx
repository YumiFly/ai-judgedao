"use client"

import { DisputeHeader } from "@/components/dispute-header"
import { DisputeStatusTimeline } from "@/components/dispute-status-timeline"
import { ChainStatusBox } from "@/components/chain-status-box"
import { MockControlPanel } from "@/components/mock-control-panel"
import { EvidencePanel } from "@/components/evidence-panel"
import { ContractStatusPanel } from "@/components/contract-status-panel"
import { TopNavigation, BottomNavigation } from "@/components/navigation"

// Demo case data - completely static for demonstration
const demoDispute = {
  dispute_id: "dispute_001",
  title: "Smart Contract Payment Dispute",
  description: "Service delivery agreement dispute involving blockchain development services. The claimant alleges that the respondent failed to deliver agreed services within the specified timeframe, triggering a payment dispute clause worth 50,000 USDC.",
  evidence_ipfs: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
  status: "Resolved",
  submitted_by: "0x1234567890123456789012345678901234567890",
  created_at: "2024-01-15T10:30:00Z",
  claimant: "0x1234567890123456789012345678901234567890",
  respondent: "0x9876543210987654321098765432109876543210",
  amount: "50,000 USDC",
  category: "Contract Breach",
  createdAt: 1705312200,
  finalVerdictAt: 1705571400,
}

const demoAIVerdict = {
  decision: "GUILTY",
  confidence: 85,
  reasoning: "Based on the evidence provided, the smart contract terms were clearly violated. The respondent failed to deliver the agreed services within the specified timeframe, triggering the payment dispute clause.",
}

const demoArbiters = [
  {
    id: "arbiter_001",
    address: "0xABC123...DEF456",
    reputation: 95,
    totalStake: "10,000 JUDGE",
    casesHandled: 47,
    hasVoted: true,
    vote: {
      inFavorClaimant: true,
      stake: 10000,
      timestamp: 1705485000,
      reason: "The evidence clearly shows contract breach. The respondent failed to meet delivery deadlines."
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
      inFavorClaimant: false,
      stake: 8500,
      timestamp: 1705488600,
      reason: "While there were delays, the respondent showed good faith effort."
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
      inFavorClaimant: true,
      stake: 12000,
      timestamp: 1705492200,
      reason: "Contract terms are clear and binding. The penalty clause should be enforced."
    }
  }
]

const demoTimeline = [
  { step: "submitDispute", timestamp: "2024-01-15T10:30:00Z", completed: true },
  { step: "addEvidence", timestamp: "2024-01-15T14:20:00Z", completed: true },
  { step: "awaitingAI", timestamp: "2024-01-16T09:00:00Z", completed: true },
  { step: "aiAnalysis", timestamp: "2024-01-16T15:45:00Z", completed: true },
  { step: "selectPanel", timestamp: "2024-01-17T09:00:00Z", completed: true },
  { step: "voting", timestamp: "2024-01-17T12:30:00Z", completed: true },
  { step: "finalize", timestamp: "2024-01-18T10:30:00Z", completed: true },
  { step: "closed", timestamp: "2024-01-18T10:35:00Z", completed: true }
]

const demoFinalVerdict = {
  claimantWins: true,
  favorVotes: 22000,
  againstVotes: 8500,
  totalVotes: 3,
  consensusReached: true,
  executionDetails: {
    paymentToClaimant: "50,000 USDC",
    penaltyToRespondent: "5,000 USDC",
    arbitrationFees: "2,500 USDC",
    platformFee: "1,000 USDC"
  }
}

const demoEvidence = [
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

export default function DemoCasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <TopNavigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20 md:pb-8 max-w-7xl">
        {/* Demo Banner - 响应式设计 */}
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-blue-300 font-semibold mb-2 text-lg sm:text-xl">📋 Demo Case - Smart Contract Dispute</h2>
          <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
            This is a demonstration of the complete dispute resolution process, showing all 7 contract states from submission to closure.
          </p>
        </div>

        <DisputeHeader dispute={demoDispute} />

        {/* 响应式布局：移动端单列，桌面端三列 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mt-8">
          {/* 左侧栏：时间线和状态信息 */}
          <div className="xl:col-span-1 space-y-6">
            <DisputeStatusTimeline timeline={demoTimeline} />
            <ContractStatusPanel
              currentStatus={demoDispute.status}
              disputeId={demoDispute.dispute_id}
              createdAt={demoDispute.createdAt}
              finalVerdictAt={demoDispute.finalVerdictAt}
            />
            <EvidencePanel
              evidence={demoEvidence}
              disputeStatus={demoDispute.status}
              canAddEvidence={false}
            />
            {/* 在移动端隐藏这些组件以减少复杂性 */}
            <div className="hidden lg:block">
              <ChainStatusBox />
            </div>
            <div className="hidden lg:block">
              <MockControlPanel />
            </div>
          </div>

          {/* 右侧主内容区：AI判决和仲裁员投票 */}
          <div className="xl:col-span-2 space-y-6">
            {/* AI Verdict Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                🤖 AI Verdict Analysis
              </h3>
              <div className="space-y-4">
                {/* AI判决结果 - 响应式布局 */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="px-3 py-1 rounded-full text-sm font-medium bg-red-600 text-white text-center sm:text-left">
                    Respondent Guilty
                  </div>
                  <div className="text-slate-300 text-center sm:text-left">
                    Confidence: {demoAIVerdict.confidence}%
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{demoAIVerdict.reasoning}</p>
              </div>
            </div>

            {/* Arbiter Votes Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                ⚖️ Arbiter Panel Votes
              </h3>
              <div className="space-y-4">
                {demoArbiters.map((arbiter) => (
                  <div key={arbiter.id} className="border border-slate-600 rounded-lg p-4">
                    {/* 响应式布局：移动端垂直排列，桌面端水平排列 */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium truncate">{arbiter.address}</div>
                        <div className="text-slate-400 text-sm">
                          Rep: {arbiter.reputation}% | Stake: {arbiter.totalStake} | Cases: {arbiter.casesHandled}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium text-center sm:text-left ${
                        arbiter.vote.inFavorClaimant ? "bg-green-600 text-white" : "bg-red-600 text-white"
                      }`}>
                        {arbiter.vote.inFavorClaimant ? "For Claimant" : "For Respondent"}
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">{arbiter.vote.reason}</p>
                    <div className="text-slate-400 text-xs">
                      <div className="flex flex-col sm:flex-row sm:gap-4">
                        <span>Vote Weight: {arbiter.vote.stake.toLocaleString()}</span>
                        <span>Voted: {new Date(arbiter.vote.timestamp * 1000).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Verdict */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                🏛️ Final Verdict
              </h3>
              <div className="space-y-4">
                {/* 判决结果 - 响应式布局 */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="px-4 py-2 rounded-lg text-lg font-bold bg-green-600 text-white text-center sm:text-left">
                    Claimant Wins
                  </div>
                  <div className="text-slate-300 text-center sm:text-left">
                    Consensus: Reached
                  </div>
                </div>

                {/* 投票统计 - 响应式网格 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="text-center sm:text-left">
                    <div className="text-slate-400">Votes For Claimant</div>
                    <div className="text-white font-medium">{demoFinalVerdict.favorVotes.toLocaleString()} JUDGE</div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-slate-400">Votes For Respondent</div>
                    <div className="text-white font-medium">{demoFinalVerdict.againstVotes.toLocaleString()} JUDGE</div>
                  </div>
                </div>

                {/* 执行细节 - 响应式网格 */}
                <div className="border-t border-slate-600 pt-4">
                  <div className="text-slate-300 font-medium mb-3 text-center sm:text-left">Execution Details:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between sm:contents">
                      <span className="text-slate-400">Payment to Claimant:</span>
                      <span className="text-green-400">{demoFinalVerdict.executionDetails.paymentToClaimant}</span>
                    </div>
                    <div className="flex justify-between sm:contents">
                      <span className="text-slate-400">Penalty from Respondent:</span>
                      <span className="text-red-400">{demoFinalVerdict.executionDetails.penaltyToRespondent}</span>
                    </div>
                    <div className="flex justify-between sm:contents">
                      <span className="text-slate-400">Arbitration Fees:</span>
                      <span className="text-blue-400">{demoFinalVerdict.executionDetails.arbitrationFees}</span>
                    </div>
                    <div className="flex justify-between sm:contents">
                      <span className="text-slate-400">Platform Fee:</span>
                      <span className="text-purple-400">{demoFinalVerdict.executionDetails.platformFee}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  )
}
