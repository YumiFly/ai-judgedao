import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, stake, qualifications, experience } = body

    // 验证必填字段
    if (!address || !stake) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 })
    }

    // 验证最小质押要求
    const minStakeRequired = 1000 // 示例最小质押
    if (stake < minStakeRequired) {
      return NextResponse.json({ 
        error: `质押金额不足，最少需要 ${minStakeRequired} 代币` 
      }, { status: 400 })
    }

    // 模拟区块链交易
    const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`
    
    // 模拟仲裁员注册数据
    const arbiterData = {
      address,
      stake,
      qualifications: qualifications || "",
      experience: experience || "",
      reputation: 50, // 初始声誉值
      casesHandled: 0,
      isActive: true,
      registeredAt: new Date().toISOString(),
      txHash: mockTxHash,
    }

    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({
      success: true,
      message: "仲裁员注册成功",
      data: arbiterData,
    })
  } catch (error) {
    console.error("仲裁员注册失败:", error)
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // 模拟获取仲裁员列表
    const mockArbiters = [
      {
        address: "0x1234567890123456789012345678901234567890",
        stake: 5000,
        reputation: 85,
        casesHandled: 23,
        isActive: true,
        registeredAt: "2024-01-15T10:30:00Z",
      },
      {
        address: "0x2345678901234567890123456789012345678901",
        stake: 3000,
        reputation: 72,
        casesHandled: 15,
        isActive: true,
        registeredAt: "2024-01-20T14:20:00Z",
      },
      {
        address: "0x3456789012345678901234567890123456789012",
        stake: 8000,
        reputation: 91,
        casesHandled: 45,
        isActive: true,
        registeredAt: "2024-01-10T09:15:00Z",
      },
    ]

    return NextResponse.json({
      success: true,
      data: mockArbiters,
    })
  } catch (error) {
    console.error("获取仲裁员列表失败:", error)
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }
}
