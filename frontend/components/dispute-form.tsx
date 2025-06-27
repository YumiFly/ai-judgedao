"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function DisputeForm() {
  const router = useRouter()
  const t = useTranslations("dispute.form")
  const tSuccess = useTranslations("dispute.success")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    respondent: "", // 被申请人地址
    ruleSetId: "1", // 规则集ID，默认为1
    evidenceFile: null as File | null,
    category: "",
    amount: "",
  })

  const categories = [
    { id: "daoGovernance", label: t("categories.daoGovernance") },
    { id: "smartContract", label: t("categories.smartContract") },
    { id: "tokenDistribution", label: t("categories.tokenDistribution") },
    { id: "votingManipulation", label: t("categories.votingManipulation") },
    { id: "fundManagement", label: t("categories.fundManagement") },
    { id: "other", label: t("categories.other") },
  ]

  // 定义提交须知的要点
  const noticePoints = [t("notice.point1"), t("notice.point2"), t("notice.point3"), t("notice.point4")]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 验证被申请人地址格式
      if (!formData.respondent.match(/^0x[a-fA-F0-9]{40}$/)) {
        alert("请输入有效的以太坊地址")
        setIsSubmitting(false)
        return
      }

      // 模拟IPFS上传案例描述
      const caseURI = `ipfs://bafy${Math.random().toString(36).substring(2, 15)}`
      const evidenceURI = formData.evidenceFile
        ? `ipfs://bafy${Math.random().toString(36).substring(2, 15)}`
        : ""

      // 调用争议提交API
      const response = await fetch("/api/dispute/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          respondent: formData.respondent,
          ruleSetId: parseInt(formData.ruleSetId),
          caseURI,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          amount: formData.amount ? parseFloat(formData.amount) : 0,
          evidenceURI,
        }),
      })

      const result = await response.json()

      if (result.success) {
        console.log("争议提交成功:", result.data)
        setSubmitted(true)

        // 3秒后跳转到争议详情页
        setTimeout(() => {
          router.push(`/dispute/${result.disputeId}`)
        }, 3000)
      } else {
        alert(`提交失败: ${result.error}`)
      }
    } catch (error) {
      console.error("提交争议失败:", error)
      alert("提交失败，请重试")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, evidenceFile: file }))
    }
  }

  if (submitted) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">{tSuccess("title")}</h2>
          <p className="text-slate-300 mb-4">{tSuccess("description")}</p>
          <div className="space-y-2">
            <p className="text-sm text-slate-400">
              {tSuccess("disputeId")}dispute_{Date.now()}
            </p>
            <p className="text-sm text-slate-400">{tSuccess("estimatedTime")}</p>
          </div>
          <div className="mt-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-sm text-slate-400 mt-2">{tSuccess("redirecting")}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {t("details")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 争议标题 */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-300">
              {t("title")} *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder={t("titlePlaceholder")}
              className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              required
            />
          </div>

          {/* 被申请人地址 */}
          <div className="space-y-2">
            <Label htmlFor="respondent" className="text-slate-300">
              被申请人地址 *
            </Label>
            <Input
              id="respondent"
              value={formData.respondent}
              onChange={(e) => setFormData((prev) => ({ ...prev, respondent: e.target.value }))}
              placeholder="0x..."
              className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 font-mono"
              pattern="^0x[a-fA-F0-9]{40}$"
              title="请输入有效的以太坊地址"
              required
            />
            <p className="text-xs text-slate-500">请输入被申请人的以太坊钱包地址</p>
          </div>

          {/* 规则集选择 */}
          <div className="space-y-2">
            <Label htmlFor="ruleSetId" className="text-slate-300">
              适用规则集 *
            </Label>
            <select
              id="ruleSetId"
              value={formData.ruleSetId}
              onChange={(e) => setFormData((prev) => ({ ...prev, ruleSetId: e.target.value }))}
              className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-md px-3 py-2"
              required
            >
              <option value="1">通用争议解决规则 v1.0</option>
              <option value="2">智能合约争议规则 v1.0</option>
              <option value="3">DAO治理争议规则 v1.0</option>
            </select>
          </div>

          {/* 争议类别 */}
          <div className="space-y-2">
            <Label className="text-slate-300">{t("category")} *</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={formData.category === category.id ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    formData.category === category.id
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700"
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, category: category.id }))}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* 涉及金额 */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-slate-300">
              {t("amount")}
            </Label>
            <Input
              id="amount"
              value={formData.amount}
              onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
              placeholder={t("amountPlaceholder")}
              className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
            />
          </div>

          {/* 详细描述 */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300">
              {t("description")} *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder={t("descriptionPlaceholder")}
              className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 min-h-32"
              required
            />
          </div>

          {/* 证据上传 */}
          <div className="space-y-2">
            <Label className="text-slate-300">{t("evidence")}</Label>
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="evidence-upload"
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              />
              <label htmlFor="evidence-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-300 mb-1">{t("uploadEvidence")}</p>
                <p className="text-xs text-slate-500">{t("supportedFormats")}</p>
              </label>
              {formData.evidenceFile && (
                <div className="mt-3 text-sm text-green-400">
                  {t("fileSelected")}
                  {formData.evidenceFile.name}
                </div>
              )}
            </div>
          </div>

          {/* 提示信息 */}
          <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-200">
                <p className="font-medium mb-1">{t("notice.title")}</p>
                <ul className="space-y-1 text-xs">
                  {noticePoints.map((point, index) => (
                    <li key={index}>• {point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 提交按钮 */}
          <Button
            type="submit"
            disabled={isSubmitting || !formData.title || !formData.description || !formData.category}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t("submitting")}
              </>
            ) : (
              t("submit")
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
