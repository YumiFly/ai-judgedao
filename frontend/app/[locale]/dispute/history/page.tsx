"use client"

import { useTranslations } from "next-intl"
import { DisputeHistoryList } from "@/components/dispute-history-list"
import { TopNavigation, BottomNavigation } from "@/components/navigation"

export default function DisputeHistoryPage() {
  const t = useTranslations("dispute.history")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Navigation */}
      <TopNavigation />

      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{t("title")}</h1>
          <p className="text-slate-300">{t("description")}</p>
        </div>

        <DisputeHistoryList />
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
    </div>
  )
}
