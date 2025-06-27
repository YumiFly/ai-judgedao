"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gavel, TrendingUp } from "lucide-react"

interface Agent {
  verdict: "GUILTY" | "NOT_GUILTY"
  confidence: number
}

interface FinalVerdictProps {
  agents: Agent[]
}

export function FinalVerdict({ agents }: FinalVerdictProps) {
  const t = useTranslations("arbitration.verdict")

  const guiltyCount = agents.filter((agent) => agent.verdict === "GUILTY").length
  const totalAgents = agents.length
  const guiltyPercentage = (guiltyCount / totalAgents) * 100
  const finalVerdict = guiltyCount > totalAgents / 2 ? "GUILTY" : "NOT_GUILTY"

  const avgConfidence = agents.reduce((sum, agent) => sum + agent.confidence, 0) / agents.length

  return (
    <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Gavel className="h-6 w-6" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <Badge
              className={`text-lg px-4 py-2 ${
                finalVerdict === "GUILTY" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              {finalVerdict === "GUILTY" ? t("guilty") : t("notGuilty")}
            </Badge>
            <p className="text-slate-300">
              {guiltyCount} / {totalAgents} {t("agentsJudged")} ({guiltyPercentage.toFixed(0)}%)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-500/30">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-slate-400">{t("confidenceLevel")}</span>
            </div>
            <span className="text-2xl font-bold text-white">{Math.round(avgConfidence * 100)}%</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gavel className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-slate-400">{t("consensusStrength")}</span>
            </div>
            <span className="text-2xl font-bold text-white">
              {guiltyPercentage > 66 || guiltyPercentage < 34 ? t("strong") : t("medium")}
            </span>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <h4 className="text-sm font-medium text-slate-300 mb-2">{t("explanation")}</h4>
          <p className="text-slate-200 text-sm leading-relaxed">
            {t.rich("explanationText", {
              count: totalAgents,
              guiltyCount: guiltyCount,
              verdictExplanation: finalVerdict === "GUILTY" ? t("guiltyExplanation") : t("notGuiltyExplanation"),
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
