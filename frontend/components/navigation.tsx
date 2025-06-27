"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Home,
  FileText,
  UserCheck,
  Clock,
  Eye,
  Gavel,
  Users,
  Settings
} from "lucide-react"
import { Web3ConnectButton } from "@/components/web3-connect"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useState } from "react"

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname()
  const t = useTranslations("navigation")
  const [isConnected, setIsConnected] = useState(false)

  const handleConnectionChange = (connected: boolean, address?: string) => {
    setIsConnected(connected)
  }

  const navItems = [
    {
      href: "/",
      label: t("home"),
      icon: Home,
      description: t("descriptions.home")
    },
    {
      href: "/dispute/new",
      label: t("submitDispute"),
      icon: FileText,
      description: t("descriptions.submitDispute")
    },
    {
      href: "/arbiter/register",
      label: t("becomeArbiter"),
      icon: UserCheck,
      description: t("descriptions.becomeArbiter")
    },
    {
      href: "/dispute/history",
      label: t("disputeHistory"),
      icon: Clock,
      description: t("descriptions.disputeHistory")
    },
    {
      href: "/dispute/001",
      label: t("demoCase"),
      icon: Eye,
      description: t("descriptions.demoCase")
    },
    {
      href: "/demo",
      label: t("componentDemo"),
      icon: Settings,
      description: t("descriptions.componentDemo")
    }
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/zh" || pathname === "/en"
    }
    return pathname.includes(href)
  }

  return (
    <Card className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm ${className}`}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Gavel className="h-6 w-6 text-purple-400" />
            <h2 className="text-lg font-bold text-white">AIJudgeDAO</h2>
          </div>
          <div className="flex items-center gap-2">
            <Web3ConnectButton onConnectionChange={handleConnectionChange} />
            <LanguageSwitcher />
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-auto p-3 ${
                    active 
                      ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" 
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                </Button>
              </Link>
            )
          })}
        </div>

        {/* Web3 Status */}
        {isConnected && (
          <div className="mt-6 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-green-300">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">{t("walletConnected")}</span>
            </div>
            <p className="text-xs text-green-400/70 mt-1">
              {t("walletDescription")}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-medium text-slate-400 mb-3">{t("quickActions")}</h3>

          <Link href="/dispute/new">
            <Button
              size="sm"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              <FileText className="h-3 w-3 mr-2" />
              {t("submitDispute")}
            </Button>
          </Link>

          {isConnected && (
            <Link href="/arbiter/register">
              <Button
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <UserCheck className="h-3 w-3 mr-2" />
                {t("becomeArbiter")}
              </Button>
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-slate-900/30 rounded">
            <div className="text-lg font-bold text-white">156</div>
            <div className="text-xs text-slate-400">{t("stats.totalDisputes")}</div>
          </div>
          <div className="text-center p-2 bg-slate-900/30 rounded">
            <div className="text-lg font-bold text-white">89</div>
            <div className="text-xs text-slate-400">{t("stats.activeArbiters")}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 简化的顶部导航栏
export function TopNavigation() {
  const t = useTranslations("navigation")
  const [isConnected, setIsConnected] = useState(false)

  const handleConnectionChange = (connected: boolean, address?: string) => {
    setIsConnected(connected)
  }

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Gavel className="h-6 w-6 text-purple-400" />
            <span className="text-lg font-bold text-white">AIJudgeDAO</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dispute/new" className="text-slate-300 hover:text-white transition-colors">
              {t("submitDispute")}
            </Link>
            <Link href="/arbiter/register" className="text-slate-300 hover:text-white transition-colors">
              {t("becomeArbiter")}
            </Link>
            <Link href="/dispute/history" className="text-slate-300 hover:text-white transition-colors">
              {t("disputeHistory")}
            </Link>
            <Link href="/dispute/001" className="text-slate-300 hover:text-white transition-colors">
              {t("demoCase")}
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Web3ConnectButton onConnectionChange={handleConnectionChange} />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  )
}

// 移动端底部导航
export function BottomNavigation() {
  const pathname = usePathname()
  const t = useTranslations("navigation")

  const navItems = [
    { href: "/", icon: Home, label: t("home") },
    { href: "/dispute/new", icon: FileText, label: t("submitDispute") },
    { href: "/arbiter/register", icon: UserCheck, label: t("becomeArbiter") },
    { href: "/demo", icon: Settings, label: t("componentDemo") },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/zh" || pathname === "/en"
    }
    return pathname.includes(href)
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700">
      <div className="grid grid-cols-4 gap-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col gap-1 h-auto p-2 ${
                  active 
                    ? "text-purple-400" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
