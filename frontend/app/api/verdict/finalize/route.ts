import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { disputeId } = body

    // 验证必填字段
    if (!disputeId) {
      return NextResponse.json({ error: "缺少争议ID" }, { status: 400 })
    }

    // 模拟检查投票期限是否结束
    const votingEnds = new Date(Date.now() - 1 * 60 * 60 * 1000) // 1小时前结束
    if (new Date() <= votingEnds) {
      return NextResponse.json({ error: "投票期限尚未结束" }, { status: 400 })
    }

    // 模拟检查是否已经最终化
    const isFinalized = Math.random() < 0.2 // 20%概率已最终化
    if (isFinalized) {
      return NextResponse.json({ error: "判决已经最终化" }, { status: 400 })
    }

    // 模拟投票统计
    const mockVotes = [
      { arbiterAddress: "0x1234...7890", favorClaimant: true, stake: 5000 },
      { arbiterAddress: "0x3456...9012", favorClaimant: false, stake: 3000 },
      { arbiterAddress: "0x5678...1234", favorClaimant: true, stake: 6000 },
    ]

    let favorVotes = 0
    let againstVotes = 0
    let totalVotes = 0

    mockVotes.forEach(vote => {
      totalVotes++
      if (vote.favorClaimant) {
        favorVotes += vote.stake
      } else {
        againstVotes += vote.stake
      }
    })

    const claimantWins = favorVotes > againstVotes
    const winMargin = Math.abs(favorVotes - againstVotes)
    const confidence = Math.min(95, 60 + (winMargin / (favorVotes + againstVotes)) * 35)

    // 模拟区块链交易
    const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`

    const verdictData = {
      disputeId,
      finalVerdict: claimantWins ? "CLAIMANT_WINS" : "RESPONDENT_WINS",
      favorVotes,
      againstVotes,
      totalVotes,
      confidence: Math.round(confidence * 100) / 100,
      finalizedAt: new Date().toISOString(),
      txHash: mockTxHash,
      arbiters: mockVotes.map(vote => ({
        address: vote.arbiterAddress,
        vote: vote.favorClaimant ? "FAVOR" : "AGAINST",
        stake: vote.stake,
        reputationChange: vote.favorClaimant === claimantWins ? +1 : -1,
      })),
    }

    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return NextResponse.json({
      success: true,
      message: "判决最终化成功",
      data: verdictData,
    })
  } catch (error) {
    console.error("判决最终化失败:", error)
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

    // 模拟获取最终判决信息
    const mockVerdictData = {
      disputeId,
      finalVerdict: "CLAIMANT_WINS",
      favorVotes: 11000,
      againstVotes: 3000,
      totalVotes: 3,
      confidence: 78.5,
      finalizedAt: "2024-01-25T15:30:00Z",
      txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      arbiters: [
        {
          address: "0x1234567890123456789012345678901234567890",
          vote: "FAVOR",
          stake: 5000,
          reputationChange: +1,
          reason: "证据清晰显示申请人的主张成立",
        },
        {
          address: "0x3456789012345678901234567890123456789012",
          vote: "AGAINST",
          stake: 3000,
          reputationChange: -1,
          reason: "被申请人提供的反驳证据更有说服力",
        },
        {
          address: "0x5678901234567890123456789012345678901234",
          vote: "FAVOR",
          stake: 6000,
          reputationChange: +1,
          reason: "综合考虑各方面证据，支持申请人",
        },
      ],
      aiVerdict: {
        verdict: "CLAIMANT_WINS",
        confidence: 82.3,
        reason: "AI分析显示申请人提供的证据更加充分和可信",
        analysisTime: "2024-01-25T12:00:00Z",
      },
      consensusLevel: "HIGH", // HIGH/MEDIUM/LOW
      isFinalized: true,
    }

    return NextResponse.json({
      success: true,
      data: mockVerdictData,
    })
  } catch (error) {
    console.error("获取判决信息失败:", error)
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }
}
