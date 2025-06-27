"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { UserCheck, Gavel, AlertCircle, CheckCircle, Coins } from "lucide-react"

export function ArbiterRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [formData, setFormData] = useState({
    address: "",
    stake: "",
    qualifications: "",
    experience: "",
    specializations: [] as string[],
  })

  const specializations = [
    { id: "contract", label: "智能合约争议" },
    { id: "governance", label: "DAO治理争议" },
    { id: "token", label: "代币分发争议" },
    { id: "defi", label: "DeFi协议争议" },
    { id: "nft", label: "NFT相关争议" },
    { id: "other", label: "其他" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 验证地址格式
      if (!formData.address.match(/^0x[a-fA-F0-9]{40}$/)) {
        alert("请输入有效的以太坊地址")
        setIsSubmitting(false)
        return
      }

      // 验证质押金额
      const stakeAmount = parseFloat(formData.stake)
      if (isNaN(stakeAmount) || stakeAmount < 1000) {
        alert("质押金额必须至少为1000代币")
        setIsSubmitting(false)
        return
      }

      // 调用仲裁员注册API
      const response = await fetch("/api/arbiter/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: formData.address,
          stake: stakeAmount,
          qualifications: formData.qualifications,
          experience: formData.experience,
          specializations: formData.specializations,
        }),
      })

      const result = await response.json()

      if (result.success) {
        console.log("仲裁员注册成功:", result.data)
        setRegistered(true)
      } else {
        alert(`注册失败: ${result.error}`)
      }
    } catch (error) {
      console.error("注册失败:", error)
      alert("注册失败，请重试")
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleSpecialization = (specId: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specId)
        ? prev.specializations.filter(id => id !== specId)
        : [...prev.specializations, specId]
    }))
  }

  if (registered) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">注册成功！</h2>
          <p className="text-slate-300 mb-4">您已成功注册为AIJudgeDAO仲裁员</p>
          <div className="space-y-2">
            <p className="text-sm text-slate-400">
              地址: {formData.address}
            </p>
            <p className="text-sm text-slate-400">
              质押金额: {formData.stake} 代币
            </p>
            <p className="text-sm text-slate-400">
              初始声誉: 50/100
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          仲裁员注册
        </CardTitle>
        <p className="text-slate-400 text-sm">
          成为AIJudgeDAO仲裁员，参与争议解决并获得奖励
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 钱包地址 */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-slate-300">
              钱包地址 *
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="0x..."
              className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 font-mono"
              pattern="^0x[a-fA-F0-9]{40}$"
              title="请输入有效的以太坊地址"
              required
            />
          </div>

          {/* 质押金额 */}
          <div className="space-y-2">
            <Label htmlFor="stake" className="text-slate-300">
              质押金额 * <span className="text-xs text-slate-500">(最少1000代币)</span>
            </Label>
            <div className="relative">
              <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                id="stake"
                type="number"
                min="1000"
                value={formData.stake}
                onChange={(e) => setFormData(prev => ({ ...prev, stake: e.target.value }))}
                placeholder="1000"
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 pl-10"
                required
              />
            </div>
          </div>

          {/* 专业领域 */}
          <div className="space-y-2">
            <Label className="text-slate-300">专业领域 *</Label>
            <div className="flex flex-wrap gap-2">
              {specializations.map((spec) => (
                <Badge
                  key={spec.id}
                  variant={formData.specializations.includes(spec.id) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    formData.specializations.includes(spec.id)
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700"
                  }`}
                  onClick={() => toggleSpecialization(spec.id)}
                >
                  {spec.label}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-slate-500">请选择您擅长的争议解决领域</p>
          </div>

          {/* 资格证明 */}
          <div className="space-y-2">
            <Label htmlFor="qualifications" className="text-slate-300">
              资格证明
            </Label>
            <Textarea
              id="qualifications"
              value={formData.qualifications}
              onChange={(e) => setFormData(prev => ({ ...prev, qualifications: e.target.value }))}
              placeholder="请描述您的相关资格、证书或专业背景..."
              className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 min-h-[100px]"
            />
          </div>

          {/* 相关经验 */}
          <div className="space-y-2">
            <Label htmlFor="experience" className="text-slate-300">
              相关经验
            </Label>
            <Textarea
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              placeholder="请描述您在争议解决、法律、区块链等相关领域的经验..."
              className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 min-h-[100px]"
            />
          </div>

          {/* 注意事项 */}
          <div className="bg-slate-900/30 border border-slate-600 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-white font-medium">注册须知</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• 质押的代币将被锁定，用于保证仲裁公正性</li>
                  <li>• 恶意投票或不当行为可能导致质押被扣除</li>
                  <li>• 仲裁员需要及时参与分配的案件投票</li>
                  <li>• 声誉系统将影响您被选中的概率</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !formData.address || !formData.stake || formData.specializations.length === 0}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                注册中...
              </>
            ) : (
              <>
                <Gavel className="h-4 w-4 mr-2" />
                注册为仲裁员
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
