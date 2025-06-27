"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TopNavigation, BottomNavigation } from "@/components/navigation"
import { Web3Connect } from "@/components/web3-connect"
import { ArbiterRegistration } from "@/components/arbiter-registration"
import { ArbitrationPanel } from "@/components/arbitration-panel"
import { FinalVerdictEnhanced } from "@/components/final-verdict-enhanced"
import {
  Palette,
  Eye,
  FileText,
  UserCheck,
  Gavel,
  CheckCircle,
  XCircle,
  Clock,
  Wallet
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function DemoPage() {
  const t = useTranslations("demo")
  const [activeDemo, setActiveDemo] = useState<string>("buttons")

  const buttonDemos = [
    { className: "btn-primary", label: t("buttonDemo.buttons.primary"), icon: CheckCircle },
    { className: "btn-secondary", label: t("buttonDemo.buttons.secondary"), icon: FileText },
    { className: "btn-success", label: t("buttonDemo.buttons.success"), icon: CheckCircle },
    { className: "btn-danger", label: t("buttonDemo.buttons.danger"), icon: XCircle },
    { className: "btn-info", label: t("buttonDemo.buttons.info"), icon: Eye },
    { className: "btn-warning", label: t("buttonDemo.buttons.warning"), icon: Clock },
    { className: "btn-outline", label: t("buttonDemo.buttons.outline"), icon: UserCheck },
    { className: "btn-ghost", label: t("buttonDemo.buttons.ghost"), icon: Gavel },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Navigation */}
      <TopNavigation />
      
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{t("title")}</h1>
          <p className="text-slate-300">{t("subtitle")}</p>
        </div>

        {/* Demo Navigation */}
        <Card className="card-dark mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Palette className="h-5 w-5" />
              {t("navigation.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "buttons", label: t("navigation.buttons"), icon: CheckCircle },
                { id: "web3", label: t("navigation.web3"), icon: Wallet },
                { id: "arbiter", label: t("navigation.arbiter"), icon: UserCheck },
                { id: "panel", label: t("navigation.panel"), icon: Gavel },
                { id: "verdict", label: t("navigation.verdict"), icon: Eye },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    onClick={() => setActiveDemo(item.id)}
                    className={activeDemo === item.id ? "btn-primary" : "btn-ghost"}
                    size="sm"
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {item.label}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Demo Content */}
        <div className="space-y-8">
          {/* Button Styles Demo */}
          {activeDemo === "buttons" && (
            <Card className="card-dark">
              <CardHeader>
                <CardTitle className="text-white">{t("buttonDemo.title")}</CardTitle>
                <p className="text-slate-400">{t("buttonDemo.description")}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {buttonDemos.map((demo) => {
                    const Icon = demo.icon
                    return (
                      <div key={demo.className} className="text-center space-y-2">
                        <Button className={demo.className} size="sm">
                          <Icon className="h-3 w-3 mr-1" />
                          {demo.label}
                        </Button>
                        <p className="text-xs text-slate-500">{demo.className}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 p-4 bg-slate-900/30 rounded-lg">
                  <h4 className="text-white font-medium mb-2">{t("buttonDemo.usage")}</h4>
                  <code className="text-sm text-green-400">
                    &lt;Button className="btn-primary"&gt;{t("buttonDemo.buttons.primary")}&lt;/Button&gt;
                  </code>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Web3 Connect Demo */}
          {activeDemo === "web3" && (
            <Card className="card-dark">
              <CardHeader>
                <CardTitle className="text-white">{t("web3Demo.title")}</CardTitle>
                <p className="text-slate-400">{t("web3Demo.description")}</p>
              </CardHeader>
              <CardContent>
                <Web3Connect />
              </CardContent>
            </Card>
          )}

          {/* Arbiter Registration Demo */}
          {activeDemo === "arbiter" && (
            <Card className="card-dark">
              <CardHeader>
                <CardTitle className="text-white">{t("arbiterDemo.title")}</CardTitle>
                <p className="text-slate-400">{t("arbiterDemo.description")}</p>
              </CardHeader>
              <CardContent>
                <ArbiterRegistration />
              </CardContent>
            </Card>
          )}

          {/* Arbitration Panel Demo */}
          {activeDemo === "panel" && (
            <Card className="card-dark">
              <CardHeader>
                <CardTitle className="text-white">{t("panelDemo.title")}</CardTitle>
                <p className="text-slate-400">{t("panelDemo.description")}</p>
              </CardHeader>
              <CardContent>
                <ArbitrationPanel disputeId="demo-001" isArbiter={true} arbiterAddress="0x1234...5678" />
              </CardContent>
            </Card>
          )}

          {/* Final Verdict Demo */}
          {activeDemo === "verdict" && (
            <Card className="card-dark">
              <CardHeader>
                <CardTitle className="text-white">{t("verdictDemo.title")}</CardTitle>
                <p className="text-slate-400">{t("verdictDemo.description")}</p>
              </CardHeader>
              <CardContent>
                <FinalVerdictEnhanced disputeId="demo-001" canFinalize={true} />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Color Palette */}
        <Card className="card-dark mt-8">
          <CardHeader>
            <CardTitle className="text-white">{t("colorScheme.title")}</CardTitle>
            <p className="text-slate-400">{t("colorScheme.description")}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-purple-600 rounded-lg mx-auto"></div>
                <p className="text-sm text-white">{t("colorScheme.primary")}</p>
                <p className="text-xs text-slate-400">purple-600</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-slate-700 rounded-lg mx-auto"></div>
                <p className="text-sm text-white">{t("colorScheme.secondary")}</p>
                <p className="text-xs text-slate-400">slate-700</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto"></div>
                <p className="text-sm text-white">{t("colorScheme.info")}</p>
                <p className="text-xs text-slate-400">blue-600</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-green-600 rounded-lg mx-auto"></div>
                <p className="text-sm text-white">{t("colorScheme.success")}</p>
                <p className="text-xs text-slate-400">green-600</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Links */}
        <Card className="card-dark mt-8">
          <CardHeader>
            <CardTitle className="text-white">{t("quickNav.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/">
                <Button className="btn-outline w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  {t("quickNav.backHome")}
                </Button>
              </Link>
              <Link href="/dispute/new">
                <Button className="btn-secondary w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  {t("quickNav.submitDispute")}
                </Button>
              </Link>
              <Link href="/arbiter/register">
                <Button className="btn-info w-full">
                  <UserCheck className="h-4 w-4 mr-2" />
                  {t("quickNav.becomeArbiter")}
                </Button>
              </Link>
              <Link href="/dispute/001">
                <Button className="btn-primary w-full">
                  <Gavel className="h-4 w-4 mr-2" />
                  {t("quickNav.demoCase")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
    </div>
  )
}
