import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      respondent,
      ruleSetId,
      caseURI,
      title,
      description,
      category,
      amount,
      evidenceURI
    } = body

    // 验证必填字段
    if (!respondent || !ruleSetId || !caseURI || !title || !description) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 })
    }

    // 验证地址格式
    if (!respondent.match(/^0x[a-fA-F0-9]{40}$/)) {
      return NextResponse.json({ error: "被申请人地址格式无效" }, { status: 400 })
    }

    // 模拟生成争议ID（在实际合约中由计数器生成）
    const disputeId = Math.floor(Math.random() * 10000) + 1

    // 模拟区块链交易
    const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`

    // 模拟IPFS上传案例描述
    const mockCaseURI = caseURI || `ipfs://bafy${Math.random().toString(36).substring(2, 15)}`
    const mockEvidenceURI = evidenceURI || ""

    // 符合合约结构的争议数据
    const disputeData = {
      disputeId,
      claimant: `0x${Math.random().toString(16).substring(2, 42)}`, // 模拟申请人地址
      respondent,
      ruleSetId,
      caseURI: mockCaseURI,
      evidenceURI: mockEvidenceURI,
      aiVerdictURI: "", // 初始为空
      status: "Submitted", // 对应 DisputeStatusLib.Status.Submitted
      createdAt: Math.floor(Date.now() / 1000), // Unix timestamp
      finalVerdictAt: 0,

      // 额外的前端显示信息
      title,
      description,
      category,
      amount,
      txHash: mockTxHash,
      createdAtISO: new Date().toISOString(),
    }

    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({
      success: true,
      disputeId,
      txHash: mockTxHash,
      message: "争议提交成功",
      data: disputeData,
    })
  } catch (error) {
    console.error("提交争议失败:", error)
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }
}

// 获取争议详情
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const disputeId = searchParams.get("disputeId")

    if (!disputeId) {
      return NextResponse.json({ error: "缺少争议ID" }, { status: 400 })
    }

    // 模拟获取争议详情
    const mockDisputeData = {
      disputeId: parseInt(disputeId),
      claimant: "0x1234567890123456789012345678901234567890",
      respondent: "0x2345678901234567890123456789012345678901",
      ruleSetId: 1,
      caseURI: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
      evidenceURI: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
      aiVerdictURI: "",
      status: "EvidencePending",
      createdAt: Math.floor(Date.now() / 1000) - 3600, // 1小时前
      finalVerdictAt: 0,

      // 前端显示信息
      title: "智能合约执行争议",
      description: "关于智能合约条款执行的争议案例",
      category: "合同纠纷",
      amount: 50000,
      createdAtISO: new Date(Date.now() - 3600000).toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: mockDisputeData,
    })
  } catch (error) {
    console.error("获取争议详情失败:", error)
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }
}
