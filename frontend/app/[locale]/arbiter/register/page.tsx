"use client"

import { useTranslations, useMessages } from "next-intl"
import { ArbiterRegistration } from "@/components/arbiter-registration"
import { Web3Connect } from "@/components/web3-connect"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Info, Shield, Coins, Users, Award } from "lucide-react"
import { TopNavigation, BottomNavigation } from "@/components/navigation"
import Link from "next/link"
import { useState } from "react"

export default function ArbiterRegisterPage() {
  const t = useTranslations("arbiter.register")
  const messages = useMessages() as any
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

      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("backToHome")}
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* What is an Arbiter */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-400" />
                  {t("whatIsArbiter.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-300 text-sm">
                  {t("whatIsArbiter.description")}
                </p>
                <ul className="text-slate-400 text-sm space-y-1">
                  {messages?.arbiter?.register?.whatIsArbiter?.responsibilities?.map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  )) || []}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  {t("requirements.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    <span className="text-slate-300 text-sm">{t("requirements.minStake")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span className="text-slate-300 text-sm">{t("requirements.selectSpecialty")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-purple-400" />
                    <span className="text-slate-300 text-sm">{t("requirements.provideQualifications")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  {t("benefits.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-slate-300 text-sm space-y-2">
                  {messages?.arbiter?.register?.benefits?.items?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  )) || []}
                </ul>
              </CardContent>
            </Card>

            {/* Risks */}
            <Card className="bg-slate-800/50 border-red-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-400" />
                  {t("risks.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-slate-300 text-sm space-y-2">
                  {messages?.arbiter?.register?.risks?.items?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  )) || []}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Registration Form */}
          <div className="lg:col-span-2">
            {!isConnected ? (
              <div className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-center">
                      {t("connectWallet")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-slate-300 mb-6">
                      {t("connectDescription")}
                    </p>
                  </CardContent>
                </Card>
                <Web3Connect onConnectionChange={handleConnectionChange} />
              </div>
            ) : (
              <ArbiterRegistration />
            )}
          </div>
        </div>

        {/* Process Flow */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mt-8">
          <CardHeader>
            <CardTitle className="text-white text-center">{t("workflow.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {messages?.arbiter?.register?.workflow?.steps?.map((step: any, index: number) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    index === 0 ? 'bg-purple-600' :
                    index === 1 ? 'bg-blue-600' :
                    index === 2 ? 'bg-green-600' : 'bg-yellow-600'
                  }`}>
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h4 className="text-white font-medium mb-2">{step.title}</h4>
                  <p className="text-slate-400 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
    </div>
  )
}
