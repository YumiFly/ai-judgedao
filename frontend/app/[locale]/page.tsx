"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gavel, Shield, Zap, Users, Clock, Eye, FileText, UserCheck, Wallet } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Web3ConnectButton } from "@/components/web3-connect"
import { TopNavigation, BottomNavigation } from "@/components/navigation"
import { useState } from "react"

export default function HomePage() {
  const t = useTranslations("home")
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState<string>("")

  const handleConnectionChange = (connected: boolean, address?: string) => {
    setIsConnected(connected)
    setUserAddress(address || "")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Navigation */}
      <TopNavigation />

      <div className="container mx-auto px-4 py-16 pb-20 md:pb-16">

        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">{t("hero.title")}</h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">{t("hero.description")}</p>
            </div>

            {/* Key Features */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-sm">{t("features.aiAssisted")}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Users className="h-5 w-5 text-blue-400" />
                <span className="text-sm">{t("features.decentralizedArbitration")}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">{t("features.fastEfficient")}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/dispute/001">
                <Button size="lg" className="btn-primary shadow-lg shadow-purple-500/25">
                  <Eye className="h-4 w-4 mr-2" />
                  {t("hero.viewDemo")}
                </Button>
              </Link>
              <Link href="/dispute/new">
                <Button size="lg" className="btn-secondary shadow-lg shadow-slate-500/25">
                  <FileText className="h-4 w-4 mr-2" />
                  {t("hero.submitDispute")}
                </Button>
              </Link>
              <Link href="/arbiter/register">
                <Button size="lg" className="btn-info shadow-lg shadow-blue-500/25">
                  <UserCheck className="h-4 w-4 mr-2" />
                  {t("buttons.becomeArbiter")}
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" className="btn-warning shadow-lg shadow-yellow-500/25">
                  <Gavel className="h-4 w-4 mr-2" />
                  {t("buttons.componentDemo")}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <Gavel className="h-8 w-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">{t("features.aiArbitration.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm">{t("features.aiArbitration.description")}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <Shield className="h-8 w-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">{t("features.decentralized.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm">{t("features.decentralized.description")}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <Zap className="h-8 w-8 text-yellow-400 mb-2" />
              <CardTitle className="text-white">{t("features.fastResponse.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm">{t("features.fastResponse.description")}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <Users className="h-8 w-8 text-green-400 mb-2" />
              <CardTitle className="text-white">{t("features.communityGovernance.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm">{t("features.communityGovernance.description")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Case */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-2xl">{t("demoCase.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{t("demoCase.heading")}</h3>
              <p className="text-slate-300">{t("demoCase.description")}</p>
              <div className="flex gap-4">
                <Link href="/demo-case">
                  <Button className="btn-primary shadow-md">
                    <Eye className="h-4 w-4 mr-2" />
                    {t("demoCase.viewFullProcess")}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Link href="/dispute/new">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{t("quickNav.submitNew.title")}</h3>
                <p className="text-slate-300 text-sm">{t("quickNav.submitNew.description")}</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/arbiter/register">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <UserCheck className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{t("quickNav.arbiter.title")}</h3>
                <p className="text-slate-300 text-sm">{t("quickNav.arbiter.description")}</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dispute/history">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{t("quickNav.history.title")}</h3>
                <p className="text-slate-300 text-sm">{t("quickNav.history.description")}</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dispute/001">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <Eye className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{t("quickNav.demo.title")}</h3>
                <p className="text-slate-300 text-sm">{t("quickNav.demo.description")}</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Web3 Status and Features */}
        {isConnected && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mt-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-400" />
                {t("web3Features.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-900/30 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <h4 className="text-white font-medium mb-1">{t("web3Features.submitRealDispute.title")}</h4>
                  <p className="text-slate-400 text-sm">{t("web3Features.submitRealDispute.description")}</p>
                </div>
                <div className="text-center p-4 bg-slate-900/30 rounded-lg">
                  <UserCheck className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <h4 className="text-white font-medium mb-1">{t("web3Features.registerArbiter.title")}</h4>
                  <p className="text-slate-400 text-sm">{t("web3Features.registerArbiter.description")}</p>
                </div>
                <div className="text-center p-4 bg-slate-900/30 rounded-lg">
                  <Gavel className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <h4 className="text-white font-medium mb-1">{t("web3Features.participateVoting.title")}</h4>
                  <p className="text-slate-400 text-sm">{t("web3Features.participateVoting.description")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
    </div>
  )
}
