"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, FileText } from "lucide-react"

interface DisputeHeaderProps {
  dispute: {
    dispute_id: string
    title: string
    description: string
    evidence_ipfs: string
    status: string
    submitted_by: string
    created_at: string
  }
}

export function DisputeHeader({ dispute }: DisputeHeaderProps) {
  const t = useTranslations("dispute.detail")

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

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl text-white">{dispute.title}</CardTitle>
              <Badge className={`${getStatusColor(dispute.status)} text-white`}>{t(`status.${dispute.status}`)}</Badge>
            </div>
            <div className="text-sm text-slate-400">
              {t("disputeId")}
              {dispute.dispute_id}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-300 leading-relaxed">{dispute.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-700">
          <div className="flex items-center gap-2 text-slate-400">
            <User className="h-4 w-4" />
            <span className="text-sm">
              {t("submitter")}
              {dispute.submitted_by}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              {t("submissionTime")}
              {new Date(dispute.created_at).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <FileText className="h-4 w-4" />
            <span className="text-sm">{t("evidence")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
