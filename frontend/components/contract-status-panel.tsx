"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, Gavel, Bot, Users, FileText } from "lucide-react"

interface ContractStatusPanelProps {
  currentStatus: string
  disputeId: string
  createdAt: number
  finalVerdictAt?: number
}

// Contract status definitions from DisputeStatusLib.sol
const CONTRACT_STATUSES = [
  {
    id: 0,
    name: "None",
    label: "Initial",
    description: "Dispute not yet created",
    icon: AlertCircle,
    color: "text-gray-400"
  },
  {
    id: 1,
    name: "Submitted", 
    label: "Submitted",
    description: "Dispute submitted to contract",
    icon: FileText,
    color: "text-blue-400"
  },
  {
    id: 2,
    name: "EvidencePending",
    label: "Evidence Collection",
    description: "Parties can submit evidence",
    icon: FileText,
    color: "text-yellow-400"
  },
  {
    id: 3,
    name: "AwaitingAI",
    label: "Awaiting AI",
    description: "Chainlink Functions triggered",
    icon: Clock,
    color: "text-purple-400"
  },
  {
    id: 4,
    name: "AIProposed",
    label: "AI Analysis Complete",
    description: "AI verdict attached to dispute",
    icon: Bot,
    color: "text-green-400"
  },
  {
    id: 5,
    name: "Voting",
    label: "Arbiter Voting",
    description: "Arbiters casting weighted votes",
    icon: Users,
    color: "text-orange-400"
  },
  {
    id: 6,
    name: "Resolved",
    label: "Resolved",
    description: "Final verdict calculated",
    icon: Gavel,
    color: "text-green-500"
  },
  {
    id: 7,
    name: "Closed",
    label: "Closed",
    description: "Dispute fully completed",
    icon: CheckCircle,
    color: "text-green-600"
  }
]

export function ContractStatusPanel({ currentStatus, disputeId, createdAt, finalVerdictAt }: ContractStatusPanelProps) {
  const currentStatusIndex = CONTRACT_STATUSES.findIndex(status => status.name === currentStatus)
  const currentStatusInfo = CONTRACT_STATUSES[currentStatusIndex] || CONTRACT_STATUSES[0]

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "None": return "bg-gray-600"
      case "Submitted": return "bg-blue-600"
      case "EvidencePending": return "bg-yellow-600"
      case "AwaitingAI": return "bg-purple-600"
      case "AIProposed": return "bg-green-600"
      case "Voting": return "bg-orange-600"
      case "Resolved": return "bg-green-700"
      case "Closed": return "bg-green-800"
      default: return "bg-gray-600"
    }
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString()
  }

  const calculateDuration = () => {
    if (!finalVerdictAt) return "In Progress"
    const duration = finalVerdictAt - createdAt
    const days = Math.floor(duration / (24 * 60 * 60))
    const hours = Math.floor((duration % (24 * 60 * 60)) / (60 * 60))
    return `${days}d ${hours}h`
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Gavel className="h-5 w-5" />
          Contract Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <currentStatusInfo.icon className={`h-8 w-8 ${currentStatusInfo.color}`} />
          </div>
          <Badge className={`text-sm ${getStatusBadgeColor(currentStatus)}`}>
            {currentStatusInfo.label}
          </Badge>
          <p className="text-slate-300 text-sm mt-2">{currentStatusInfo.description}</p>
        </div>

        {/* Status Timeline */}
        <div className="space-y-3">
          <h4 className="text-slate-300 font-medium text-sm">Status Flow</h4>
          <div className="space-y-2">
            {CONTRACT_STATUSES.slice(1).map((status, index) => {
              const isCompleted = index + 1 <= currentStatusIndex
              const isCurrent = index + 1 === currentStatusIndex
              const StatusIcon = status.icon

              return (
                <div key={status.id} className="flex items-center gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? "bg-green-600" 
                      : isCurrent 
                        ? "bg-blue-600" 
                        : "bg-slate-600"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-3 w-3 text-white" />
                    ) : (
                      <StatusIcon className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm ${
                      isCompleted || isCurrent ? "text-white" : "text-slate-400"
                    }`}>
                      {status.label}
                    </div>
                    <div className="text-xs text-slate-500">{status.description}</div>
                  </div>
                  {isCurrent && (
                    <Badge variant="outline" className="text-xs border-blue-500 text-blue-400">
                      Current
                    </Badge>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Contract Details */}
        <div className="border-t border-slate-600 pt-4 space-y-3">
          <h4 className="text-slate-300 font-medium text-sm">Contract Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Dispute ID:</span>
              <span className="text-white font-mono">{disputeId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Created:</span>
              <span className="text-white">{formatTimestamp(createdAt)}</span>
            </div>
            {finalVerdictAt && (
              <div className="flex justify-between">
                <span className="text-slate-400">Resolved:</span>
                <span className="text-white">{formatTimestamp(finalVerdictAt)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-400">Duration:</span>
              <span className="text-white">{calculateDuration()}</span>
            </div>
          </div>
        </div>

        {/* Contract Functions */}
        <div className="border-t border-slate-600 pt-4">
          <h4 className="text-slate-300 font-medium text-sm mb-3">Contract Functions Used</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span className="text-slate-300">submitDispute()</span>
              <span className="text-slate-500">- Initial submission</span>
            </div>
            {currentStatusIndex >= 2 && (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-slate-300">addEvidence()</span>
                <span className="text-slate-500">- Evidence collection</span>
              </div>
            )}
            {currentStatusIndex >= 4 && (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-slate-300">attachAIVerdict()</span>
                <span className="text-slate-500">- AI analysis complete</span>
              </div>
            )}
            {currentStatusIndex >= 5 && (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-slate-300">selectPanel()</span>
                <span className="text-slate-500">- Arbiter selection</span>
              </div>
            )}
            {currentStatusIndex >= 5 && (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-slate-300">castVote()</span>
                <span className="text-slate-500">- Arbiter voting</span>
              </div>
            )}
            {currentStatusIndex >= 6 && (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-slate-300">finalize()</span>
                <span className="text-slate-500">- Final verdict</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
