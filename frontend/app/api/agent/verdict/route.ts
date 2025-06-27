import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { dispute_id, input_text, agent_id } = body

    // 验证必填字段
    if (!dispute_id || !input_text) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 })
    }

    // 模拟AI分析延迟
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 模拟AI判决逻辑（基于关键词）
    const suspiciousKeywords = ["操纵", "异常", "同一", "控制", "可疑"]
    const innocentKeywords = ["正常", "合理", "分散", "独立", "合法"]

    const suspiciousCount = suspiciousKeywords.filter((keyword) => input_text.includes(keyword)).length

    const innocentCount = innocentKeywords.filter((keyword) => input_text.includes(keyword)).length

    // 基于关键词数量和随机因素决定判决
    const randomFactor = Math.random()
    const isGuilty = suspiciousCount > innocentCount || (suspiciousCount === innocentCount && randomFactor > 0.5)

    const confidence = Math.min(
      0.95,
      Math.max(0.6, 0.7 + Math.abs(suspiciousCount - innocentCount) * 0.1 + randomFactor * 0.2),
    )

    const reasons = {
      GUILTY: [
        "通过链上数据分析发现异常交易模式，多个地址存在关联性。",
        "投票时间集中且gas价格相同，显示协调行为特征。",
        "地址行为分析显示由同一实体控制的可能性较高。",
        "交易时间戳和nonce序列显示非自然投票模式。",
      ],
      NOT_GUILTY: [
        "虽存在部分重叠，但证据不足以证明恶意操纵。",
        "投票行为在可接受的正常范围内，未发现明显异常。",
        "需要更多证据支撑操纵指控，当前数据不足。",
        "地址间关联性可能是巧合，缺乏决定性证据。",
      ],
    }

    const verdict = isGuilty ? "GUILTY" : "NOT_GUILTY"
    const reason = reasons[verdict][Math.floor(Math.random() * reasons[verdict].length)]

    return NextResponse.json({
      success: true,
      data: {
        agent_id: agent_id || `agent_${Date.now()}`,
        verdict,
        confidence: Math.round(confidence * 100) / 100,
        reason,
        analysis_time: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("AI判决失败:", error)
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }
}
