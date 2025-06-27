"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTranslations, useMessages } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  LogOut,
  AlertCircle,
  CheckCircle,
  Copy,
  ExternalLink
} from "lucide-react"
import { web3Manager, formatAddress } from "@/lib/web3"

interface Web3ConnectProps {
  onConnectionChange?: (connected: boolean, address?: string) => void
}

export function Web3Connect({ onConnectionChange }: Web3ConnectProps) {
  const t = useTranslations("web3")
  const messages = useMessages() as any
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string>("")
  const [chainId, setChainId] = useState<number>(0)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    checkConnection()
    setupEventListeners()
  }, [])

  const checkConnection = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          const connectionResult = await web3Manager.connect()
          setIsConnected(true)
          setAddress(connectionResult.address)
          setChainId(connectionResult.chainId)
          onConnectionChange?.(true, connectionResult.address)
        }
      }
    } catch (error) {
      console.error('Failed to check connection:', error)
    }
  }

  const setupEventListeners = () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
    }
  }

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      handleDisconnect()
    } else {
      setAddress(accounts[0])
      onConnectionChange?.(true, accounts[0])
    }
  }

  const handleChainChanged = (chainId: string) => {
    setChainId(parseInt(chainId, 16))
    window.location.reload() // 简单处理，实际项目中可能需要更优雅的处理
  }

  const handleConnect = async () => {
    setIsConnecting(true)
    setError("")

    try {
      const connectionResult = await web3Manager.connect()
      setIsConnected(true)
      setAddress(connectionResult.address)
      setChainId(connectionResult.chainId)
      onConnectionChange?.(true, connectionResult.address)
    } catch (error: any) {
      setError(error.message || "连接失败")
      console.error('Connection failed:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    await web3Manager.disconnect()
    setIsConnected(false)
    setAddress("")
    setChainId(0)
    setError("")
    onConnectionChange?.(false)
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      // 可以添加一个toast提示
    }
  }

  const getChainName = (chainId: number): string => {
    switch (chainId) {
      case 1: return "Ethereum Mainnet"
      case 5: return "Goerli Testnet"
      case 11155111: return "Sepolia Testnet"
      case 137: return "Polygon Mainnet"
      case 80001: return "Mumbai Testnet"
      default: return `Chain ${chainId}`
    }
  }

  const isTestnet = (chainId: number): boolean => {
    return [5, 11155111, 80001].includes(chainId)
  }

  if (!isConnected) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            {t("connect.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          <p className="text-slate-300 text-sm">
            {t("connect.description")}
          </p>

          <div className="space-y-2">
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t("connect.connecting")}
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  {t("connect.connectMetaMask")}
                </>
              )}
            </Button>

            {typeof window !== 'undefined' && !window.ethereum && (
              <div className="text-center">
                <p className="text-slate-400 text-xs mb-2">{t("connect.noMetaMask")}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://metamask.io/download/', '_blank')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  {t("connect.installMetaMask")}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          {t("connected.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 地址信息 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">{t("connected.address")}</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-mono text-sm">
                {formatAddress(address)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyAddress}
                className="h-6 w-6 p-0 hover:bg-slate-700"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">{t("connected.network")}</span>
            <Badge
              variant="outline"
              className={`text-xs ${
                isTestnet(chainId)
                  ? "border-yellow-500 text-yellow-500"
                  : "border-green-500 text-green-500"
              }`}
            >
              {getChainName(chainId)}
            </Badge>
          </div>
        </div>

        {/* 网络警告 */}
        {chainId !== 11155111 && chainId !== 0 && (
          <div className="flex items-start gap-2 p-3 bg-yellow-900/30 border border-yellow-500/50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
            <div className="space-y-1">
              <p className="text-yellow-300 text-sm font-medium">{t("connected.networkWarning")}</p>
              <p className="text-yellow-200 text-xs">
                {t("connected.networkDescription")}
              </p>
            </div>
          </div>
        )}

        {/* 功能提示 */}
        <div className="bg-slate-900/30 border border-slate-600 rounded-lg p-3">
          <p className="text-slate-300 text-sm mb-2">{t("connected.availableFeatures")}</p>
          <ul className="text-slate-400 text-xs space-y-1">
            {messages?.web3?.connected?.features?.map((feature: string, index: number) => (
              <li key={index}>• {feature}</li>
            )) || []}
          </ul>
        </div>

        <Button
          onClick={handleDisconnect}
          variant="outline"
          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {t("connected.disconnect")}
        </Button>
      </CardContent>
    </Card>
  )
}

// 简化的连接按钮组件
export function Web3ConnectButton({ onConnectionChange }: Web3ConnectProps) {
  const t = useTranslations("web3")
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string>("")
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          const connectionResult = await web3Manager.connect()
          setIsConnected(true)
          setAddress(connectionResult.address)
          onConnectionChange?.(true, connectionResult.address)
        }
      }
    } catch (error) {
      console.error('Failed to check connection:', error)
    }
  }

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const connectionResult = await web3Manager.connect()
      setIsConnected(true)
      setAddress(connectionResult.address)
      onConnectionChange?.(true, connectionResult.address)
    } catch (error) {
      console.error('Connection failed:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    await web3Manager.disconnect()
    setIsConnected(false)
    setAddress("")
    onConnectionChange?.(false)
  }

  if (isConnected) {
    return (
      <Button
        onClick={handleDisconnect}
        variant="outline"
        className="border-slate-600 text-slate-300 hover:bg-slate-700"
      >
        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
        {formatAddress(address)}
      </Button>
    )
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-purple-600 hover:bg-purple-700"
    >
      {isConnecting ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          {t("button.connecting")}
        </>
      ) : (
        <>
          <Wallet className="h-4 w-4 mr-2" />
          {t("button.connect")}
        </>
      )}
    </Button>
  )
}
