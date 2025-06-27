import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { disputeId, arbiterAddress, favorClaimant, stake, reason } = body

    // 验证必填字段
    if (!disputeId || !arbiterAddress || stake === undefined || favorClaimant === undefined) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 })
    }

    // 验证质押金额
    if (stake <= 0) {
      return NextResponse.json({ error: "质押金额必须大于0" }, { status: 400 })
    }

    // 模拟验证仲裁员是否在面板中
    const mockPanelMembers = [
      "0x1234567890123456789012345678901234567890",
      "0x3456789012345678901234567890123456789012",
      "0x5678901234567890123456789012345678901234",
    ]

    if (!mockPanelMembers.includes(arbiterAddress)) {
      return NextResponse.json({ error: "您不是此争议的面板成员" }, { status: 403 })
    }

    // 模拟检查投票期限
    const votingEnds = new Date(Date.now() + 12 * 60 * 60 * 1000) // 12小时后
    if (new Date() > votingEnds) {
      return NextResponse.json({ error: "投票期限已过" }, { status: 400 })
    }

    // 模拟检查是否已投票
    const hasVoted = Math.random() < 0.3 // 30%概率已投票
    if (hasVoted) {
      return NextResponse.json({ error: "您已经投过票了" }, { status: 400 })
    }

    // 模拟区块链交易
    const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`

    const voteData = {
      disputeId,
      arbiterAddress,
      favorClaimant,
      stake,
      reason: reason || "",
      timestamp: new Date().toISOString(),
      txHash: mockTxHash,
    }

    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({
      success: true,
      message: "投票成功",
      data: voteData,
    })
  } catch (error) {
    console.error("投票失败:", error)
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const disputeId = searchParams.get("disputeId")

    if (!disputeId) {
      return NextResponse.json({ error: "缺少争议ID" }, { status: 400 })
    }

    // 模拟获取投票统计
    const mockVotingStats = {
      disputeId,
      totalVoters: 3,
      votedCount: 2,
      favorVotes: 8000, // 总支持票数（加权）
      againstVotes: 3000, // 总反对票数（加权）
      votes: [
        {
          arbiterAddress: "0x1234567890123456789012345678901234567890",
          favorClaimant: true,
          stake: 5000,
          reason: "证据清晰显示申请人的主张成立",
          timestamp: "2024-01-25T10:30:00Z",
        },
        {
          arbiterAddress: "0x3456789012345678901234567890123456789012",
          favorClaimant: false,
          stake: 3000,
          reason: "被申请人提供的反驳证据更有说服力",
          timestamp: "2024-01-25T11:15:00Z",
        },
        {
          arbiterAddress: "0x5678901234567890123456789012345678901234",
          favorClaimant: null, // 尚未投票
          stake: 0,
          reason: "",
          timestamp: null,
        },
      ],
      votingEnds: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(), // 10小时后
      isActive: true,
    }

    return NextResponse.json({
      success: true,
      data: mockVotingStats,
    })
  } catch (error) {
    console.error("获取投票统计失败:", error)
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }
}
