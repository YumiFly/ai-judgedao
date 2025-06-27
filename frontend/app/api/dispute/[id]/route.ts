import { type NextRequest, NextResponse } from "next/server"

// Mock 争议数据
const mockDisputes: Record<string, any> = {
  "001": {
    dispute_id: "dispute_001",
    title: "DAO 投票结果是否被操纵？",
    description:
      "提案 #45 被10个同一钱包控制的地址投票通过，疑似投票操纵。该提案涉及分配 100,000 USDC 的社区资金，投票在最后 2 小时内突然逆转，引发社区质疑。",
    evidence_ipfs: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    category: "投票操纵",
    amount: "100,000 USDC",
    status: "resolved",
    submitted_by: "0xAbc123...456def",
    created_at: "2025-06-06T08:00:00Z",
    resolved_at: "2025-06-06T08:05:00Z",
    tx_hash: "0x742d35cc6c8f4c16...",
    agents: [
      {
        agent_id: "agent_001",
        name: "Agent Alpha",
        avatar_url: "/placeholder.svg?height=64&width=64",
        verdict: "GUILTY",
        confidence: 0.92,
        reason:
          "投票地址链上行为显示由同一钱包控制，违反DAO去中心治理规则。通过交易时间戳分析，发现10个地址在相同时间段内接收ETH用于gas费用。",
      },
      {
        agent_id: "agent_002",
        name: "Agent Beta",
        avatar_url: "/placeholder.svg?height=64&width=64",
        verdict: "NOT_GUILTY",
        confidence: 0.75,
        reason: "虽有重叠，但投票时间分散且无其他行为关联，判断证据不足。需要更多链上数据支撑操纵指控。",
      },
      {
        agent_id: "agent_003",
        name: "Agent Gamma",
        avatar_url: "/placeholder.svg?height=64&width=64",
        verdict: "GUILTY",
        confidence: 0.88,
        reason: "多维度分析显示异常模式：相同gas价格、连续nonce、相似投票时间间隔。综合判断存在协调操纵行为。",
      },
    ],
    timeline: [
      { step: "提交争议", timestamp: "2025-06-06T08:00:00Z", completed: true },
      { step: "随机选出 AI Agent", timestamp: "2025-06-06T08:01:00Z", completed: true },
      { step: "AI 判定中", timestamp: "2025-06-06T08:02:00Z", completed: true },
      { step: "仲裁完成", timestamp: "2025-06-06T08:05:00Z", completed: true },
    ],
  },
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const disputeId = params.id
    const dispute = mockDisputes[disputeId]

    if (!dispute) {
      return NextResponse.json({ error: "争议不存在" }, { status: 404 })
    }

    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      data: dispute,
    })
  } catch (error) {
    console.error("获取争议详情失败:", error)
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }
}
