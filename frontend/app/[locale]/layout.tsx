import type React from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { locales } from "@/lib/i18n"
import "../globals.css"

export const metadata: Metadata = {
  title: "AIJudgeDAO - 去中心化AI仲裁平台",
  description: "基于AI的去中心化争议仲裁DAO系统",
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // 等待 params
  const { locale } = await params

  // 获取消息
  const messages = await getMessages({ locale })

  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
