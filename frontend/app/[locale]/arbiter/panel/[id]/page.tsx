"use client"

import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TopNavigation, BottomNavigation } from "@/components/navigation"
import { 
  Gavel, 
  Users, 
  Clock, 
  FileText, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Vote,
  Scale
} from "lucide-react"
import Link from "next/link"

interface ArbiterPanelData {
  disputeId: string
  title: string
  description: string
  claimant: string
  respondent: string
  amount: string
  category: string
  status: string
  createdAt: string
  votingDeadline: string
  aiVerdict: {
    decision: "GUILTY" | "NOT_GUILTY"
    confidence: number
    reasoning: string
  }
  panelMembers: {
    id: string
    address: string
    reputation: number
    stake: string
    hasVoted: boolean
    vote?: "GUILTY" | "NOT_GUILTY"
  }[]
  evidence: {
    id: string
    title: string
    type: string
    uri: string
    submittedBy: string
    timestamp: string
  }[]
}

export default function ArbiterPanelPage() {
  const t = useTranslations("arbiter.panel")
  const params = useParams()
  const disputeId = params.id as string

  const [panelData, setPanelData] = useState<ArbiterPanelData | null>(null)
  const [loading, setLoading] = useState(true)
  const [voting, setVoting] = useState(false)
  const [vote, setVote] = useState<"GUILTY" | "NOT_GUILTY" | null>(null)
  const [reasoning, setReasoning] = useState("")

  useEffect(() => {
    fetchPanelData()
  }, [disputeId])

  const fetchPanelData = async () => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockData: ArbiterPanelData = {
        disputeId,
        title: "Smart Contract Payment Dispute",
        description: "Dispute regarding payment execution in a smart contract between two parties for a service delivery agreement.",
        claimant: "0x1234...5678",
        respondent: "0x8765...4321", 
        amount: "50,000 USDC",
        category: "Contract Breach",
        status: "Voting",
        createdAt: "2024-01-15T10:30:00Z",
        votingDeadline: "2024-01-18T10:30:00Z",
        aiVerdict: {
          decision: "GUILTY",
          confidence: 85,
          reasoning: "Based on the evidence provided, the smart contract terms were clearly violated. The respondent failed to deliver the agreed services within the specified timeframe, triggering the payment dispute clause."
        },
        panelMembers: [
          {
            id: "arbiter_001",
            address: "0xABC...DEF",
            reputation: 95,
            stake: "10,000 JUDGE",
            hasVoted: true,
            vote: "GUILTY"
          },
          {
            id: "arbiter_002", 
            address: "0x123...789",
            reputation: 88,
            stake: "8,500 JUDGE",
            hasVoted: false
          },
          {
            id: "arbiter_003",
            address: "0x456...012",
            reputation: 92,
            stake: "12,000 JUDGE", 
            hasVoted: true,
            vote: "NOT_GUILTY"
          }
        ],
        evidence: [
          {
            id: "evidence_001",
            title: "Original Contract Agreement",
            type: "PDF",
            uri: "ipfs://bafy...",
            submittedBy: "Claimant",
            timestamp: "2024-01-15T10:30:00Z"
          },
          {
            id: "evidence_002",
            title: "Communication Records",
            type: "Text",
            uri: "ipfs://bafy...",
            submittedBy: "Respondent", 
            timestamp: "2024-01-15T14:20:00Z"
          }
        ]
      }
      
      setPanelData(mockData)
    } catch (error) {
      console.error("Failed to fetch panel data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async () => {
    if (!vote || !reasoning.trim()) {
      alert(t("voteValidationError"))
      return
    }

    setVoting(true)
    try {
      // 模拟投票API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 更新本地状态
      setPanelData(prev => {
        if (!prev) return prev
        return {
          ...prev,
          panelMembers: prev.panelMembers.map(member => 
            member.id === "arbiter_002" // 假设当前用户是arbiter_002
              ? { ...member, hasVoted: true, vote }
              : member
          )
        }
      })
      
      alert(t("voteSubmitted"))
    } catch (error) {
      console.error("Vote submission failed:", error)
      alert(t("voteError"))
    } finally {
      setVoting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <TopNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    )
  }

  if (!panelData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <TopNavigation />
        <div className="container mx-auto px-4 py-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="text-center py-12">
              <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">{t("notFound")}</h2>
              <p className="text-slate-300">{t("notFoundDescription")}</p>
            </CardContent>
          </Card>
        </div>
        <BottomNavigation />
      </div>
    )
  }

  const currentUser = panelData.panelMembers.find(m => m.id === "arbiter_002")
  const votedCount = panelData.panelMembers.filter(m => m.hasVoted).length
  const totalMembers = panelData.panelMembers.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <TopNavigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/arbiter/dashboard">
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("backToDashboard")}
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
            <p className="text-slate-300">{t("subtitle", { id: disputeId })}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dispute Overview */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t("disputeOverview")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{panelData.title}</h3>
                  <p className="text-slate-300 text-sm">{panelData.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-400">{t("claimant")}</Label>
                    <p className="text-white font-mono text-sm">{panelData.claimant}</p>
                  </div>
                  <div>
                    <Label className="text-slate-400">{t("respondent")}</Label>
                    <p className="text-white font-mono text-sm">{panelData.respondent}</p>
                  </div>
                  <div>
                    <Label className="text-slate-400">{t("amount")}</Label>
                    <p className="text-white font-semibold">{panelData.amount}</p>
                  </div>
                  <div>
                    <Label className="text-slate-400">{t("category")}</Label>
                    <Badge variant="outline" className="border-purple-500 text-purple-300">
                      {panelData.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Verdict */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  {t("aiVerdict")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Badge 
                    variant={panelData.aiVerdict.decision === "GUILTY" ? "destructive" : "default"}
                    className="text-sm"
                  >
                    {panelData.aiVerdict.decision === "GUILTY" ? t("guilty") : t("notGuilty")}
                  </Badge>
                  <div className="text-sm text-slate-300">
                    {t("confidence")}: {panelData.aiVerdict.confidence}%
                  </div>
                </div>
                <p className="text-slate-300 text-sm">{panelData.aiVerdict.reasoning}</p>
              </CardContent>
            </Card>

            {/* Voting Section */}
            {currentUser && !currentUser.hasVoted && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Vote className="h-5 w-5" />
                    {t("castVote")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setVote("GUILTY")}
                      variant={vote === "GUILTY" ? "default" : "outline"}
                      className={vote === "GUILTY" ? "bg-red-600 hover:bg-red-700" : "border-red-600 text-red-400 hover:bg-red-900/20"}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      {t("guilty")}
                    </Button>
                    <Button
                      onClick={() => setVote("NOT_GUILTY")}
                      variant={vote === "NOT_GUILTY" ? "default" : "outline"}
                      className={vote === "NOT_GUILTY" ? "bg-green-600 hover:bg-green-700" : "border-green-600 text-green-400 hover:bg-green-900/20"}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {t("notGuilty")}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-slate-300">{t("reasoning")}</Label>
                    <Textarea
                      value={reasoning}
                      onChange={(e) => setReasoning(e.target.value)}
                      placeholder={t("reasoningPlaceholder")}
                      className="bg-slate-900/50 border-slate-600 text-white"
                      rows={4}
                    />
                  </div>
                  
                  <Button
                    onClick={handleVote}
                    disabled={!vote || !reasoning.trim() || voting}
                    className="w-full btn-primary"
                  >
                    {voting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t("submittingVote")}
                      </>
                    ) : (
                      t("submitVote")
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Panel Status */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t("panelStatus")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{votedCount}/{totalMembers}</div>
                  <div className="text-sm text-slate-400">{t("votesSubmitted")}</div>
                </div>
                
                <div className="space-y-2">
                  {panelData.panelMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-2 bg-slate-900/30 rounded">
                      <div>
                        <div className="text-sm text-white font-mono">{member.address}</div>
                        <div className="text-xs text-slate-400">Rep: {member.reputation}% | Stake: {member.stake}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {member.hasVoted ? (
                          <>
                            <Badge 
                              variant={member.vote === "GUILTY" ? "destructive" : "default"}
                              className="text-xs"
                            >
                              {member.vote === "GUILTY" ? t("guilty") : t("notGuilty")}
                            </Badge>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </>
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Voting Deadline */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {t("deadline")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-lg font-semibold text-white">
                    {new Date(panelData.votingDeadline).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-slate-400">
                    {new Date(panelData.votingDeadline).toLocaleTimeString()}
                  </div>
                  <div className="text-xs text-yellow-400 mt-2">
                    {t("timeRemaining")}: 2d 14h 23m
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  )
}
