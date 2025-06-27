import { DisputeHeader } from "@/components/dispute-header"
import { AgentVerdictPanel } from "@/components/agent-verdict-panel"
import { DisputeStatusTimeline } from "@/components/dispute-status-timeline"
import { ChainStatusBox } from "@/components/chain-status-box"
import { FinalVerdict } from "@/components/final-verdict"
import { MockControlPanel } from "@/components/mock-control-panel"

// Mock data for dispute 001
const mockDispute = {
  dispute_id: "dispute_001",
  title: "DAO 投票结果是否被操纵？",
  description:
    "提案 #45 被10个同一钱包控制的地址投票通过，疑似投票操纵。该提案涉及分配 100,000 USDC 的社区资金，投票在最后 2 小时内突然逆转，引发社区质疑。",
  evidence_ipfs: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
  status: "resolved",
  submitted_by: "0xAbc123...456def",
  created_at: "2025-06-06T08:00:00Z",
}

const mockAgents = [
  {
    agent_id: "agent_001",
    name: "Agent Alpha",
    avatar_url: "/placeholder.svg?height=64&width=64",
    verdict: "GUILTY" as const,
    confidence: 0.92,
    reason:
      "投票地址链上行为显示由同一钱包控制，违反DAO去中心治理规则。通过交易时间戳分析，发现10个地址在相同时间段内接收ETH用于gas费用。",
  },
  {
    agent_id: "agent_002",
    name: "Agent Beta",
    avatar_url: "/placeholder.svg?height=64&width=64",
    verdict: "NOT_GUILTY" as const,
    confidence: 0.75,
    reason: "虽有重叠，但投票时间分散且无其他行为关联，判断证据不足。需要更多链上数据支撑操纵指控。",
  },
  {
    agent_id: "agent_003",
    name: "Agent Gamma",
    avatar_url: "/placeholder.svg?height=64&width=64",
    verdict: "GUILTY" as const,
    confidence: 0.88,
    reason: "多维度分析显示异常模式：相同gas价格、连续nonce、相似投票时间间隔。综合判断存在协调操纵行为。",
  },
]

const mockTimeline = [
  { step: "提交争议", timestamp: "2025-06-06T08:00:00Z", completed: true },
  { step: "随机选出 AI Agent", timestamp: "2025-06-06T08:01:00Z", completed: true },
  { step: "AI 判定中", timestamp: "2025-06-06T08:02:00Z", completed: true },
  { step: "仲裁完成", timestamp: "2025-06-06T08:05:00Z", completed: true },
]

export default function DisputePage() {
  // Note: This page displays static demo data
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <DisputeHeader dispute={mockDispute} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Timeline & Chain Status */}
          <div className="space-y-6">
            <DisputeStatusTimeline timeline={mockTimeline} />
            <ChainStatusBox />
            <MockControlPanel />
          </div>

          {/* Right Column - Agent Verdicts */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid gap-6">
              {mockAgents.map((agent) => (
                <AgentVerdictPanel key={agent.agent_id} agent={agent} />
              ))}
            </div>

            {/* Final Verdict */}
            <FinalVerdict agents={mockAgents} />
          </div>
        </div>
      </div>
    </div>
  )
}
