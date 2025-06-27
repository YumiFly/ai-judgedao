"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Play, RotateCcw, Zap } from "lucide-react"

interface MockControlPanelProps {
  onTriggerArbitration?: () => void
  onResetDemo?: () => void
  onUpdateAgentVerdict?: (agentId: string, verdict: "GUILTY" | "NOT_GUILTY") => void
}

export function MockControlPanel({ onTriggerArbitration, onResetDemo, onUpdateAgentVerdict }: MockControlPanelProps) {
  const t = useTranslations("arbitration.mockPanel")

  const [isArbitrating, setIsArbitrating] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState("")
  const [selectedVerdict, setSelectedVerdict] = useState("")

  const agents = [
    { id: "agent_001", name: "Agent Alpha" },
    { id: "agent_002", name: "Agent Beta" },
    { id: "agent_003", name: "Agent Gamma" },
  ]

  const handleTriggerArbitration = async () => {
    setIsArbitrating(true)

    // 模拟仲裁过程
    await new Promise((resolve) => setTimeout(resolve, 3000))

    onTriggerArbitration?.()
    setIsArbitrating(false)
  }

  const handleUpdateVerdict = () => {
    if (selectedAgent && selectedVerdict) {
      onUpdateAgentVerdict?.(selectedAgent, selectedVerdict as "GUILTY" | "NOT_GUILTY")
      setSelectedAgent("")
      setSelectedVerdict("")
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="h-5 w-5" />
          {t("title")}
          <Badge variant="outline" className="border-yellow-500 text-yellow-400 ml-2">
            DEMO
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 仲裁触发 - 简化版 */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-slate-300">{t("controls")}</h4>
          <div className="flex gap-2">
            <Button
              onClick={handleTriggerArbitration}
              disabled={isArbitrating}
              className="btn-primary disabled:opacity-50 h-8 text-xs flex-1"
            >
              {isArbitrating ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                  {t("arbitrating")}
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 mr-1" />
                  {t("triggerArbitration")}
                </>
              )}
            </Button>
            <Button
              onClick={onResetDemo}
              className="btn-outline h-8 text-xs"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Agent 判决修改 - 简化版 */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-slate-300">{t("modifyVerdict")}</h4>
          <div className="grid grid-cols-2 gap-2">
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white h-8 text-xs">
                <SelectValue placeholder={t("selectAgent")} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id} className="text-white hover:bg-slate-700 text-xs">
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedVerdict} onValueChange={setSelectedVerdict}>
              <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white h-8 text-xs">
                <SelectValue placeholder={t("selectVerdict")} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="GUILTY" className="text-red-400 hover:bg-slate-700 text-xs">
                  {t("guilty")}
                </SelectItem>
                <SelectItem value="NOT_GUILTY" className="text-green-400 hover:bg-slate-700 text-xs">
                  {t("notGuilty")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleUpdateVerdict}
            disabled={!selectedAgent || !selectedVerdict}
            className="w-full btn-secondary disabled:opacity-50 h-8 text-xs"
          >
            <Zap className="h-3 w-3 mr-1" />
            {t("updateVerdict")}
          </Button>
        </div>

        {/* 快速场景 - 简化版 */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-slate-300">{t("quickScenarios")}</h4>
          <div className="grid grid-cols-2 gap-1">
            <Button
              size="sm"
              className="btn-success h-7 text-xs"
              onClick={() => {
                agents.forEach((agent) => {
                  onUpdateAgentVerdict?.(agent.id, "NOT_GUILTY")
                })
              }}
            >
              {t("allNotGuilty")}
            </Button>
            <Button
              size="sm"
              className="btn-danger h-7 text-xs"
              onClick={() => {
                agents.forEach((agent) => {
                  onUpdateAgentVerdict?.(agent.id, "GUILTY")
                })
              }}
            >
              {t("allGuilty")}
            </Button>
            <Button
              size="sm"
              className="btn-warning h-7 text-xs"
              onClick={() => {
                onUpdateAgentVerdict?.("agent_001", "GUILTY")
                onUpdateAgentVerdict?.("agent_002", "NOT_GUILTY")
                onUpdateAgentVerdict?.("agent_003", "GUILTY")
              }}
            >
              {t("splitDecision")}
            </Button>
            <Button
              size="sm"
              className="btn-info h-7 text-xs"
              onClick={() => {
                agents.forEach((agent) => {
                  const randomVerdict = Math.random() > 0.5 ? "GUILTY" : "NOT_GUILTY"
                  onUpdateAgentVerdict?.(agent.id, randomVerdict)
                })
              }}
            >
              {t("randomDecision")}
            </Button>
          </div>
        </div>

        {/* 说明 - 简化版 */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded p-2">
          <p className="text-xs text-blue-300 leading-relaxed">Demo Control Panel</p>
        </div>
      </CardContent>
    </Card>
  )
}
