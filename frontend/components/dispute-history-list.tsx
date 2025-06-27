"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock历史数据
const mockHistoryData = [
  {
    dispute_id: "dispute_001",
    title: "DAO 投票结果是否被操纵？",
    category: "投票操纵",
    status: "resolved",
    verdict: "GUILTY",
    created_at: "2025-06-06T08:00:00Z",
    resolved_at: "2025-06-06T08:05:00Z",
    amount: "100,000 USDC",
  },
  {
    dispute_id: "dispute_002",
    title: "智能合约执行异常导致资金损失",
    category: "智能合约执行",
    status: "in_review",
    verdict: null,
    created_at: "2025-06-06T10:30:00Z",
    resolved_at: null,
    amount: "50,000 USDT",
  },
  {
    dispute_id: "dispute_003",
    title: "代币分配不公平争议",
    category: "代币分配",
    status: "resolved",
    verdict: "NOT_GUILTY",
    created_at: "2025-06-05T14:20:00Z",
    resolved_at: "2025-06-05T14:28:00Z",
    amount: "25,000 USDC",
  },
  {
    dispute_id: "dispute_004",
    title: "多签钱包管理权限争议",
    category: "资金管理",
    status: "submitted",
    verdict: null,
    created_at: "2025-06-06T12:15:00Z",
    resolved_at: null,
    amount: "200,000 ETH",
  },
]

export function DisputeHistoryList() {
  const t = useTranslations("dispute.history")
  const tDetail = useTranslations("dispute.detail")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-500"
      case "in_review":
        return "bg-yellow-500"
      case "submitted":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getVerdictColor = (verdict: string | null) => {
    if (!verdict) return ""
    return verdict === "GUILTY" ? "text-red-400" : "text-green-400"
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "resolved":
        return tDetail("status.resolved")
      case "in_review":
        return tDetail("status.inReview")
      case "submitted":
        return tDetail("status.submitted")
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{mockHistoryData.length}</div>
            <div className="text-sm text-slate-400">{t("stats.total")}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {mockHistoryData.filter((d) => d.status === "resolved").length}
            </div>
            <div className="text-sm text-slate-400">{t("stats.resolved")}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {mockHistoryData.filter((d) => d.status === "in_review").length}
            </div>
            <div className="text-sm text-slate-400">{t("stats.inReview")}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {mockHistoryData.filter((d) => d.verdict === "GUILTY").length}
            </div>
            <div className="text-sm text-slate-400">{t("stats.won")}</div>
          </CardContent>
        </Card>
      </div>

      {/* 争议列表 */}
      <div className="space-y-4">
        {mockHistoryData.map((dispute) => (
          <Card
            key={dispute.dispute_id}
            className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg text-white">{dispute.title}</CardTitle>
                    <Badge className={`${getStatusColor(dispute.status)} text-white`}>
                      {getStatusText(dispute.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span>
                      {t("list.id")}
                      {dispute.dispute_id}
                    </span>
                    <span>
                      {t("list.category")}
                      {dispute.category}
                    </span>
                    {dispute.amount && (
                      <span>
                        {t("list.amount")}
                        {dispute.amount}
                      </span>
                    )}
                  </div>
                </div>
                <Link href={`/dispute/${dispute.dispute_id.split("_")[1]}`}>
                  <Button size="sm" className="btn-primary">
                    <Eye className="h-4 w-4 mr-1" />
                    {t("list.viewDetails")}
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <div className="text-xs">{t("list.submissionTime")}</div>
                    <div className="text-sm text-white">{new Date(dispute.created_at).toLocaleString()}</div>
                  </div>
                </div>

                {dispute.resolved_at && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <TrendingUp className="h-4 w-4" />
                    <div>
                      <div className="text-xs">{t("list.resolutionTime")}</div>
                      <div className="text-sm text-white">{new Date(dispute.resolved_at).toLocaleString()}</div>
                    </div>
                  </div>
                )}

                {dispute.verdict && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <FileText className="h-4 w-4" />
                    <div>
                      <div className="text-xs">{t("list.arbitrationResult")}</div>
                      <div className={`text-sm font-medium ${getVerdictColor(dispute.verdict)}`}>
                        {dispute.verdict === "GUILTY" ? t("list.guilty") : t("list.notGuilty")}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 空状态 */}
      {mockHistoryData.length === 0 && (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">{t("empty.title")}</h3>
            <p className="text-slate-400 mb-6">{t("empty.description")}</p>
            <Link href="/dispute/new">
              <Button className="btn-primary">{t("empty.submitFirst")}</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
