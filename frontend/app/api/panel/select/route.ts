import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { disputeId, panelSize = 3 } = body

    // 验证必填字段
    if (!disputeId) {
      return NextResponse.json({ error: "缺少争议ID" }, { status: 400 })
    }

    // 模拟活跃仲裁员池
    const activeArbiters = [
      {
        address: "0x1234567890123456789012345678901234567890",
        stake: 5000,
        reputation: 85,
        casesHandled: 23,
        specialization: "合同纠纷",
      },
      {
        address: "0x2345678901234567890123456789012345678901",
        stake: 3000,
        reputation: 72,
        casesHandled: 15,
        specialization: "知识产权",
      },
      {
        address: "0x3456789012345678901234567890123456789012",
        stake: 8000,
        reputation: 91,
        casesHandled: 45,
        specialization: "商业争议",
      },
      {
        address: "0x4567890123456789012345678901234567890123",
        stake: 4500,
        reputation: 78,
        casesHandled: 31,
        specialization: "技术纠纷",
      },
      {
        address: "0x5678901234567890123456789012345678901234",
        stake: 6000,
        reputation: 88,
        casesHandled: 38,
        specialization: "金融争议",
      },
    ]

    // 检查是否有足够的仲裁员
    if (activeArbiters.length < panelSize) {
      return NextResponse.json({ 
        error: "活跃仲裁员数量不足" 
      }, { status: 400 })
    }

    // 模拟Fisher-Yates洗牌算法进行随机选择
    const shuffled = [...activeArbiters]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    // 选择前N个作为面板成员
    const selectedPanel = shuffled.slice(0, panelSize)

    // 模拟区块链交易
    const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`

    // 计算投票截止时间（24小时后）
    const votingEnds = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

    const panelData = {
      disputeId,
      panelMembers: selectedPanel,
      panelSize,
      votingEnds,
      selectedAt: new Date().toISOString(),
      txHash: mockTxHash,
      randomSeed: Math.random().toString(36).substring(2, 15), // 模拟随机种子
    }

    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return NextResponse.json({
      success: true,
      message: "仲裁员面板选择成功",
      data: panelData,
    })
  } catch (error) {
    console.error("面板选择失败:", error)
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

    // 模拟获取已选择的面板信息
    const mockPanelData = {
      disputeId,
      panelMembers: [
        {
          address: "0x1234567890123456789012345678901234567890",
          stake: 5000,
          reputation: 85,
          casesHandled: 23,
          specialization: "合同纠纷",
          voted: false,
        },
        {
          address: "0x3456789012345678901234567890123456789012",
          stake: 8000,
          reputation: 91,
          casesHandled: 45,
          specialization: "商业争议",
          voted: true,
          vote: { favorClaimant: true, stake: 5000, reason: "证据充分支持申请人" },
        },
        {
          address: "0x5678901234567890123456789012345678901234",
          stake: 6000,
          reputation: 88,
          casesHandled: 38,
          specialization: "金融争议",
          voted: false,
        },
      ],
      votingEnds: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12小时后
      selectedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12小时前选择
    }

    return NextResponse.json({
      success: true,
      data: mockPanelData,
    })
  } catch (error) {
    console.error("获取面板信息失败:", error)
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }
}
