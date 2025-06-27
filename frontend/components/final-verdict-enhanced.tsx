"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Gavel, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock,
  Users,
  Brain,
  Award
} from "lucide-react"

interface VerdictData {
  disputeId: string
  finalVerdict: "CLAIMANT_WINS" | "RESPONDENT_WINS"
  favorVotes: number
  againstVotes: number
  totalVotes: number
  confidence: number
  finalizedAt: string
  txHash: string
  arbiters: Array<{
    address: string
    vote: "FAVOR" | "AGAINST"
    stake: number
    reputationChange: number
    reason: string
  }>
  aiVerdict: {
    verdict: "CLAIMANT_WINS" | "RESPONDENT_WINS"
    confidence: number
    reason: string
    analysisTime: string
  }
  consensusLevel: "HIGH" | "MEDIUM" | "LOW"
  isFinalized: boolean
}

interface FinalVerdictEnhancedProps {
  disputeId: string
  canFinalize?: boolean
}

export function FinalVerdictEnhanced({ disputeId, canFinalize = false }: FinalVerdictEnhancedProps) {
  const [verdictData, setVerdictData] = useState<VerdictData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFinalizing, setIsFinalizing] = useState(false)

  useEffect(() => {
    loadVerdictData()
  }, [disputeId])

  const loadVerdictData = async () => {
    try {
      const response = await fetch(`/api/verdict/finalize?disputeId=${disputeId}`)
      const result = await response.json()
      if (result.success) {
        setVerdictData(result.data)
      }
    } catch (error) {
      console.error("加载判决数据失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFinalize = async () => {
    setIsFinalizing(true)
    try {
      const response = await fetch("/api/verdict/finalize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ disputeId }),
      })

      const result = await response.json()
      if (result.success) {
        setVerdictData(result.data)
        alert("判决已最终化！")
      } else {
        alert(`最终化失败: ${result.error}`)
      }
    } catch (error) {
      console.error("最终化失败:", error)
      alert("最终化失败，请重试")
    } finally {
      setIsFinalizing(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-300">加载判决信息...</p>
        </CardContent>
      </Card>
    )
  }

  if (!verdictData) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5" />
            等待判决
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 mb-4">
            投票尚未结束或判决尚未最终化。
          </p>
          {canFinalize && (
            <Button
              onClick={handleFinalize}
              disabled={isFinalizing}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isFinalizing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  最终化中...
                </>
              ) : (
                <>
                  <Gavel className="h-4 w-4 mr-2" />
                  最终化判决
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  const totalVoteWeight = verdictData.favorVotes + verdictData.againstVotes
  const favorPercentage = totalVoteWeight > 0 ? (verdictData.favorVotes / totalVoteWeight) * 100 : 0
  const isClaimantWin = verdictData.finalVerdict === "CLAIMANT_WINS"
  const aiAgrees = verdictData.aiVerdict.verdict === verdictData.finalVerdict

  return (
    <div className="space-y-6">
      {/* 最终判决 */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Gavel className="h-6 w-6" />
            最终判决
          </CardTitle>
          {verdictData.isFinalized && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>已最终化于 {new Date(verdictData.finalizedAt).toLocaleString()}</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <Badge
                className={`text-lg px-4 py-2 ${
                  isClaimantWin 
                    ? "bg-green-500 hover:bg-green-600" 
                    : "bg-red-500 hover:bg-red-600"
                } text-white`}
              >
                {isClaimantWin ? "申请人胜诉" : "被申请人胜诉"}
              </Badge>
              <p className="text-slate-300">
                投票权重: {verdictData.favorVotes} vs {verdictData.againstVotes}
                ({favorPercentage.toFixed(1)}% vs {(100 - favorPercentage).toFixed(1)}%)
              </p>
            </div>

            {/* 共识水平 */}
            <div className="flex items-center justify-center gap-2">
              <Award className="h-4 w-4 text-yellow-500" />
              <span className="text-slate-300">共识水平: </span>
              <Badge
                variant="outline"
                className={`${
                  verdictData.consensusLevel === "HIGH" 
                    ? "border-green-500 text-green-500"
                    : verdictData.consensusLevel === "MEDIUM"
                    ? "border-yellow-500 text-yellow-500"
                    : "border-red-500 text-red-500"
                }`}
              >
                {verdictData.consensusLevel === "HIGH" ? "高" : 
                 verdictData.consensusLevel === "MEDIUM" ? "中" : "低"}
              </Badge>
            </div>

            {/* 置信度 */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-slate-300">判决置信度: {verdictData.confidence}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${verdictData.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI判决对比 */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI判决对比
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">AI判决:</span>
              <Badge
                className={`${
                  verdictData.aiVerdict.verdict === "CLAIMANT_WINS"
                    ? "bg-green-600"
                    : "bg-red-600"
                } text-white`}
              >
                {verdictData.aiVerdict.verdict === "CLAIMANT_WINS" ? "申请人胜诉" : "被申请人胜诉"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">AI置信度:</span>
              <span className="text-white">{verdictData.aiVerdict.confidence}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">与人工判决一致:</span>
              {aiAgrees ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="bg-slate-900/30 border border-slate-600 rounded-lg p-3">
              <p className="text-sm text-slate-300">{verdictData.aiVerdict.reason}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 仲裁员投票详情 */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5" />
            仲裁员投票详情
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {verdictData.arbiters.map((arbiter, index) => (
              <div
                key={arbiter.address}
                className="bg-slate-900/30 border border-slate-600 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-sm">
                        {arbiter.address.slice(0, 6)}...{arbiter.address.slice(-4)}
                      </span>
                      <Badge
                        className={`${
                          arbiter.vote === "FAVOR" 
                            ? "bg-green-600" 
                            : "bg-red-600"
                        } text-white text-xs`}
                      >
                        {arbiter.vote === "FAVOR" ? "支持" : "反对"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>权重: {arbiter.stake}</span>
                      <span className={`flex items-center gap-1 ${
                        arbiter.reputationChange > 0 ? "text-green-500" : "text-red-500"
                      }`}>
                        声誉变化: {arbiter.reputationChange > 0 ? "+" : ""}{arbiter.reputationChange}
                      </span>
                    </div>
                  </div>
                </div>
                {arbiter.reason && (
                  <div className="mt-2 p-2 bg-slate-800/50 rounded text-xs text-slate-300">
                    {arbiter.reason}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 区块链信息 */}
      {verdictData.isFinalized && (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-sm">区块链记录</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">交易哈希:</span>
                <span className="text-white font-mono text-xs">
                  {verdictData.txHash.slice(0, 10)}...{verdictData.txHash.slice(-8)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">最终化时间:</span>
                <span className="text-white">
                  {new Date(verdictData.finalizedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
