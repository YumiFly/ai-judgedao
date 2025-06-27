"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle } from "lucide-react"

interface AgentVerdictPanelProps {
  agent: {
    agent_id: string
    name: string
    avatar_url: string
    verdict: "GUILTY" | "NOT_GUILTY"
    confidence: number
    reason: string
  }
}

export function AgentVerdictPanel({ agent }: AgentVerdictPanelProps) {
  const t = useTranslations("arbitration.agent")
  const isGuilty = agent.verdict === "GUILTY"

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-slate-600">
            <AvatarImage src={agent.avatar_url || "/placeholder.svg"} alt={agent.name} />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold">
              {agent.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
              <Badge
                variant={isGuilty ? "destructive" : "secondary"}
                className={`${isGuilty ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white`}
              >
                {isGuilty ? (
                  <>
                    <AlertTriangle className="h-3 w-3 mr-1" /> {t("guilty")}
                  </>
                ) : (
                  <>
                    <Shield className="h-3 w-3 mr-1" /> {t("notGuilty")}
                  </>
                )}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{t("confidenceLevel")}</span>
                <span className="text-white font-medium">{Math.round(agent.confidence * 100)}%</span>
              </div>
              <Progress value={agent.confidence * 100} className="h-2" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <h4 className="text-sm font-medium text-slate-300 mb-2">{t("reasoningTitle")}</h4>
          <p className="text-slate-200 leading-relaxed">{agent.reason}</p>
        </div>
      </CardContent>
    </Card>
  )
}
