"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Calendar, User } from "lucide-react"

interface Evidence {
  id: string
  title: string
  type: string
  submittedBy: string
  timestamp: string
  ipfsHash: string
}

interface EvidencePanelProps {
  evidence: Evidence[]
  disputeStatus: string
  canAddEvidence?: boolean
}

export function EvidencePanel({ evidence, disputeStatus, canAddEvidence = false }: EvidencePanelProps) {
  const getFileTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return '📄'
      case 'text':
        return '📝'
      case 'images':
        return '🖼️'
      default:
        return '📎'
    }
  }

  const getSubmitterColor = (submitter: string) => {
    switch (submitter.toLowerCase()) {
      case 'claimant':
      case '申请人':
        return 'bg-blue-600'
      case 'respondent':
      case '被申请人':
        return 'bg-orange-600'
      default:
        return 'bg-gray-600'
    }
  }

  const canStillAddEvidence = disputeStatus === 'Submitted' || disputeStatus === 'EvidencePending'

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Evidence Submitted
          <Badge variant="outline" className="ml-auto">
            {evidence.length} items
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {evidence.map((item) => (
          <div key={item.id} className="border border-slate-600 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-lg">{getFileTypeIcon(item.type)}</div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-white font-medium text-sm truncate">{item.title}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge
                      className={`text-xs ${getSubmitterColor(item.submittedBy)}`}
                    >
                      {item.submittedBy}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" className="btn-outline h-7 w-7 p-0">
                  <Eye className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" className="btn-outline h-7 w-7 p-0">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="text-xs text-slate-400">
              <div className="flex items-center gap-1 mb-1">
                <Calendar className="h-3 w-3" />
                {new Date(item.timestamp).toLocaleDateString()}
              </div>
              <div className="font-mono truncate">
                IPFS: {item.ipfsHash.substring(0, 30)}...
              </div>
            </div>
          </div>
        ))}

        {evidence.length === 0 && (
          <div className="text-center py-6">
            <FileText className="h-8 w-8 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">No evidence submitted yet</p>
          </div>
        )}

        {/* Evidence Collection Status - 简化版 */}
        <div className="border-t border-slate-600 pt-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm font-medium">Collection Status</p>
              <p className="text-slate-400 text-xs">
                {canStillAddEvidence ? "Open" : "Closed"}
              </p>
            </div>
            {canAddEvidence && canStillAddEvidence && (
              <Button size="sm" className="btn-secondary h-7 text-xs">
                <FileText className="h-3 w-3 mr-1" />
                Add
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
