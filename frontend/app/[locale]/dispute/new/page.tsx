"use client"

import { useTranslations } from "next-intl"
import { DisputeForm } from "@/components/dispute-form"
import { TopNavigation, BottomNavigation } from "@/components/navigation"

export default function NewDisputePage() {
  const t = useTranslations("dispute.new")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Navigation */}
      <TopNavigation />

      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{t("title")}</h1>
          <p className="text-slate-300">{t("description")}</p>
        </div>

        <DisputeForm />
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
    </div>
  )
}
