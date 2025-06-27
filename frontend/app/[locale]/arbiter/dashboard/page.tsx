"use client"

import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TopNavigation, BottomNavigation } from "@/components/navigation"
import { 
  Gavel, 
  Users, 
  Clock, 
  TrendingUp, 
  Award,
  FileText,
  Vote,
  CheckCircle,
  AlertCircle,
  DollarSign
} from "lucide-react"
import Link from "next/link"

interface ArbiterStats {
  totalCases: number
  activeCases: number
  completedCases: number
  reputation: number
  totalStaked: string
  totalEarned: string
  successRate: number
}

interface ActiveCase {
  id: string
  title: string
  category: string
  amount: string
  deadline: string
  status: "pending_vote" | "voting" | "evidence_review"
  priority: "high" | "medium" | "low"
}

export default function ArbiterDashboard() {
  const t = useTranslations("arbiter.dashboard")
  const [stats, setStats] = useState<ArbiterStats | null>(null)
  const [activeCases, setActiveCases] = useState<ActiveCase[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockStats: ArbiterStats = {
        totalCases: 47,
        activeCases: 3,
        completedCases: 44,
        reputation: 94,
        totalStaked: "25,000 JUDGE",
        totalEarned: "12,450 JUDGE",
        successRate: 96.8
      }
      
      const mockActiveCases: ActiveCase[] = [
        {
          id: "dispute_123",
          title: "Smart Contract Payment Dispute",
          category: "Contract Breach",
          amount: "50,000 USDC",
          deadline: "2024-01-18T10:30:00Z",
          status: "pending_vote",
          priority: "high"
        },
        {
          id: "dispute_124", 
          title: "DAO Governance Voting Issue",
          category: "Governance",
          amount: "N/A",
          deadline: "2024-01-19T15:00:00Z",
          status: "evidence_review",
          priority: "medium"
        },
        {
          id: "dispute_125",
          title: "Token Distribution Dispute",
          category: "Token Rights",
          amount: "100,000 TOKENS",
          deadline: "2024-01-20T12:00:00Z", 
          status: "voting",
          priority: "low"
        }
      ]
      
      setStats(mockStats)
      setActiveCases(mockActiveCases)
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_vote": return "bg-yellow-600"
      case "voting": return "bg-blue-600"
      case "evidence_review": return "bg-purple-600"
      default: return "bg-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-500 text-red-400"
      case "medium": return "border-yellow-500 text-yellow-400"
      case "low": return "border-green-500 text-green-400"
      default: return "border-gray-500 text-gray-400"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <TopNavigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{t("title")}</h1>
          <p className="text-slate-300">{t("subtitle")}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{t("stats.totalCases")}</p>
                  <p className="text-2xl font-bold text-white">{stats?.totalCases}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{t("stats.activeCases")}</p>
                  <p className="text-2xl font-bold text-white">{stats?.activeCases}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{t("stats.reputation")}</p>
                  <p className="text-2xl font-bold text-white">{stats?.reputation}%</p>
                </div>
                <Award className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{t("stats.successRate")}</p>
                  <p className="text-2xl font-bold text-white">{stats?.successRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Cases */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  {t("activeCases")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeCases.map((case_) => (
                    <div key={case_.id} className="p-4 bg-slate-900/30 rounded-lg border border-slate-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">{case_.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {case_.category}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getPriorityColor(case_.priority)}`}
                            >
                              {case_.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-slate-400 text-sm">
                            {t("amount")}: {case_.amount}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={`text-xs ${getStatusColor(case_.status)}`}>
                            {t(`status.${case_.status}`)}
                          </Badge>
                          <p className="text-slate-400 text-xs mt-1">
                            {t("deadline")}: {new Date(case_.deadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link href={`/arbiter/panel/${case_.id}`}>
                          <Button size="sm" className="btn-primary">
                            <Vote className="h-3 w-3 mr-1" />
                            {t("viewCase")}
                          </Button>
                        </Link>
                        <Link href={`/dispute/${case_.id}`}>
                          <Button size="sm" variant="outline" className="btn-outline">
                            <FileText className="h-3 w-3 mr-1" />
                            {t("viewDetails")}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                  
                  {activeCases.length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                      <p className="text-slate-300">{t("noActiveCases")}</p>
                      <p className="text-slate-500 text-sm">{t("noActiveCasesDescription")}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Financial Overview */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  {t("financialOverview")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-slate-400 text-sm">{t("totalStaked")}</p>
                  <p className="text-xl font-bold text-white">{stats?.totalStaked}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">{t("totalEarned")}</p>
                  <p className="text-xl font-bold text-green-400">{stats?.totalEarned}</p>
                </div>
                <div className="pt-2 border-t border-slate-700">
                  <Link href="/arbiter/earnings">
                    <Button size="sm" className="w-full btn-secondary">
                      {t("viewEarnings")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t("quickActions")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/arbiter/register">
                  <Button size="sm" className="w-full btn-primary">
                    {t("updateProfile")}
                  </Button>
                </Link>
                <Link href="/arbiter/stake">
                  <Button size="sm" className="w-full btn-secondary">
                    {t("manageStake")}
                  </Button>
                </Link>
                <Link href="/dispute/history">
                  <Button size="sm" className="w-full btn-outline">
                    {t("viewAllCases")}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {t("recentActivity")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-white">{t("activity.voteSubmitted")}</p>
                      <p className="text-slate-400 text-xs">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-white">{t("activity.newCaseAssigned")}</p>
                      <p className="text-slate-400 text-xs">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="h-4 w-4 text-purple-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-white">{t("activity.reputationIncreased")}</p>
                      <p className="text-slate-400 text-xs">3 days ago</p>
                    </div>
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
