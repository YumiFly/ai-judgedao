"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Circle } from "lucide-react"

interface TimelineStep {
  step: string
  timestamp: string
  completed: boolean
}

interface DisputeStatusTimelineProps {
  timeline: TimelineStep[]
}

export function DisputeStatusTimeline({ timeline }: DisputeStatusTimelineProps) {
  const t = useTranslations("arbitration.timeline")

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="h-5 w-5" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {item.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${item.completed ? "text-white" : "text-slate-400"}`}>
                  {t(`steps.${item.step}`)}
                </p>
                <p className="text-xs text-slate-500 mt-1">{new Date(item.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
