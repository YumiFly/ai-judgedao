"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, LinkIcon, Zap } from "lucide-react"

export function ChainStatusBox() {
  const t = useTranslations("arbitration.chainStatus")

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <LinkIcon className="h-5 w-5" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">{t("network")}</span>
            <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
              Ethereum
            </Badge>
          </div>

          <div>
            <span className="text-xs text-slate-400">{t("txHash")}</span>
            <div className="flex items-center gap-1 mt-1">
              <code className="text-xs bg-slate-900 px-2 py-1 rounded text-green-400 flex-1 truncate">
                0x742d35cc...8f4c16
              </code>
              <ExternalLink className="h-3 w-3 text-slate-500 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-400">{t("contractAddress")}</span>
            <div className="flex items-center gap-1 mt-1">
              <code className="text-xs bg-slate-900 px-2 py-1 rounded text-blue-400 flex-1 truncate">
                0x1f9840a...92e1c
              </code>
              <ExternalLink className="h-3 w-3 text-slate-500 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-700">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-yellow-500" />
              <span className="text-xs text-slate-400">{t("gasFee")}</span>
            </div>
            <span className="text-xs text-white">0.0023 ETH</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
