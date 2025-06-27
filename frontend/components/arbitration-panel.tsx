"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  Vote, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Gavel,
  User,
  Star,
  Coins
} from "lucide-react"

interface ArbiterInfo {
  address: string
  stake: number
  reputation: number
  casesHandled: number
  specialization: string
  voted?: boolean
  vote?: {
    favorClaimant: boolean
    stake: number
    reason: string
  }
}

interface ArbitrationPanelProps {
  disputeId: string
  isArbiter?: boolean
  arbiterAddress?: string
}

export function ArbitrationPanel({ disputeId, isArbiter = false, arbiterAddress }: ArbitrationPanelProps) {
  const [panelData, setPanelData] = useState<{
    panelMembers: ArbiterInfo[]
    votingEnds: string
    selectedAt: string
  } | null>(null)
  const [votingStats, setVotingStats] = useState<{
    favorVotes: number
    againstVotes: number
    totalVoters: number
    votedCount: number
    isActive: boolean
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVoting, setIsVoting] = useState(false)
  const [voteForm, setVoteForm] = useState({
    favorClaimant: true,
    stake: "",
    reason: "",
  })

  useEffect(() => {
    loadPanelData()
    loadVotingStats()
  }, [disputeId])

  const loadPanelData = async () => {
    try {
      const response = await fetch(`/api/panel/select?disputeId=${disputeId}`)
      const result = await response.json()
      if (result.success) {
        setPanelData(result.data)
      }
    } catch (error) {
      console.error("加载面板数据失败:", error)
    }
  }

  const loadVotingStats = async () => {
    try {
      const response = await fetch(`/api/vote/cast?disputeId=${disputeId}`)
      const result = await response.json()
      if (result.success) {
        setVotingStats(result.data)
      }
    } catch (error) {
      console.error("加载投票统计失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVote = async () => {
    if (!arbiterAddress) return
    
    setIsVoting(true)
    try {
      const response = await fetch("/api/vote/cast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disputeId,
          arbiterAddress,
          favorClaimant: voteForm.favorClaimant,
          stake: parseFloat(voteForm.stake),
          reason: voteForm.reason,
        }),
      })

      const result = await response.json()
      if (result.success) {
        alert("投票成功！")
        loadPanelData()
        loadVotingStats()
      } else {
        alert(`投票失败: ${result.error}`)
      }
    } catch (error) {
      console.error("投票失败:", error)
      alert("投票失败，请重试")
    } finally {
      setIsVoting(false)
    }
  }

  const selectPanel = async () => {
    try {
      const response = await fetch("/api/panel/select", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disputeId,
          panelSize: 3,
        }),
      })

      const result = await response.json()
      if (result.success) {
        alert("面板选择成功！")
        loadPanelData()
      } else {
        alert(`面板选择失败: ${result.error}`)
      }
    } catch (error) {
      console.error("面板选择失败:", error)
      alert("面板选择失败，请重试")
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-300">加载仲裁面板信息...</p>
        </CardContent>
      </Card>
    )
  }

  const isVotingActive = votingStats?.isActive && panelData && new Date() < new Date(panelData.votingEnds)
  const currentArbiter = panelData?.panelMembers.find(member => member.address === arbiterAddress)
  const hasVoted = currentArbiter?.voted || false

  return (
    <div className="space-y-6">
      {/* 面板选择 */}
      {!panelData && (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              仲裁员面板选择
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-4">
              该争议尚未选择仲裁员面板。点击下方按钮随机选择仲裁员。
            </p>
            <Button onClick={selectPanel} className="bg-purple-600 hover:bg-purple-700">
              <Users className="h-4 w-4 mr-2" />
              选择仲裁员面板
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 仲裁员面板信息 */}
      {panelData && (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              仲裁员面板
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>选择时间: {new Date(panelData.selectedAt).toLocaleString()}</span>
              <span>投票截止: {new Date(panelData.votingEnds).toLocaleString()}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {panelData.panelMembers.map((arbiter, index) => (
                <div
                  key={arbiter.address}
                  className="bg-slate-900/30 border border-slate-600 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="text-white font-mono text-sm">
                          {arbiter.address.slice(0, 6)}...{arbiter.address.slice(-4)}
                        </span>
                        {arbiter.voted && (
                          <Badge className="bg-green-600">已投票</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          声誉: {arbiter.reputation}
                        </span>
                        <span className="flex items-center gap-1">
                          <Gavel className="h-3 w-3" />
                          案件: {arbiter.casesHandled}
                        </span>
                        <span className="flex items-center gap-1">
                          <Coins className="h-3 w-3" />
                          质押: {arbiter.stake}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{arbiter.specialization}</p>
                      {arbiter.vote && (
                        <div className="mt-2 p-2 bg-slate-800/50 rounded text-xs">
                          <div className="flex items-center gap-2 mb-1">
                            {arbiter.vote.favorClaimant ? (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            ) : (
                              <XCircle className="h-3 w-3 text-red-500" />
                            )}
                            <span className="text-white">
                              {arbiter.vote.favorClaimant ? "支持申请人" : "支持被申请人"}
                            </span>
                            <span className="text-slate-400">
                              (权重: {arbiter.vote.stake})
                            </span>
                          </div>
                          {arbiter.vote.reason && (
                            <p className="text-slate-400">{arbiter.vote.reason}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 投票统计 */}
      {votingStats && (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Vote className="h-5 w-5" />
              投票统计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{votingStats.favorVotes}</div>
                <div className="text-sm text-slate-400">支持票数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{votingStats.againstVotes}</div>
                <div className="text-sm text-slate-400">反对票数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{votingStats.votedCount}</div>
                <div className="text-sm text-slate-400">已投票</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-300">{votingStats.totalVoters}</div>
                <div className="text-sm text-slate-400">总仲裁员</div>
              </div>
            </div>
            
            {/* 投票进度条 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-500">支持</span>
                <span className="text-red-500">反对</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(votingStats.favorVotes / (votingStats.favorVotes + votingStats.againstVotes)) * 100 || 0}%`
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 仲裁员投票界面 */}
      {isArbiter && currentArbiter && isVotingActive && !hasVoted && (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Vote className="h-5 w-5" />
              投票
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 投票选择 */}
              <div className="space-y-2">
                <Label className="text-slate-300">您的判决 *</Label>
                <div className="flex gap-4">
                  <Button
                    variant={voteForm.favorClaimant ? "default" : "outline"}
                    onClick={() => setVoteForm(prev => ({ ...prev, favorClaimant: true }))}
                    className={voteForm.favorClaimant ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    支持申请人
                  </Button>
                  <Button
                    variant={!voteForm.favorClaimant ? "default" : "outline"}
                    onClick={() => setVoteForm(prev => ({ ...prev, favorClaimant: false }))}
                    className={!voteForm.favorClaimant ? "bg-red-600 hover:bg-red-700" : ""}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    支持被申请人
                  </Button>
                </div>
              </div>

              {/* 投票权重 */}
              <div className="space-y-2">
                <Label htmlFor="stake" className="text-slate-300">
                  投票权重 * <span className="text-xs text-slate-500">(最大: {currentArbiter.stake})</span>
                </Label>
                <Input
                  id="stake"
                  type="number"
                  min="1"
                  max={currentArbiter.stake}
                  value={voteForm.stake}
                  onChange={(e) => setVoteForm(prev => ({ ...prev, stake: e.target.value }))}
                  placeholder="输入投票权重"
                  className="bg-slate-900/50 border-slate-600 text-white"
                  required
                />
              </div>

              {/* 投票理由 */}
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-slate-300">
                  投票理由
                </Label>
                <Textarea
                  id="reason"
                  value={voteForm.reason}
                  onChange={(e) => setVoteForm(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="请说明您的判决理由..."
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 min-h-[100px]"
                />
              </div>

              <Button
                onClick={handleVote}
                disabled={isVoting || !voteForm.stake}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isVoting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    提交投票中...
                  </>
                ) : (
                  <>
                    <Vote className="h-4 w-4 mr-2" />
                    提交投票
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 投票状态提示 */}
      {isArbiter && currentArbiter && (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="py-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="text-slate-300">
                {hasVoted ? "您已完成投票" : 
                 isVotingActive ? "投票进行中" : "投票已结束"}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
