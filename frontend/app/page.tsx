import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gavel, Shield, Zap, Users, Clock, Eye, FileText } from "lucide-react"
import { redirect } from "next/navigation"
import { defaultLocale } from "@/lib/i18n"

// 根路径重定向到默认语言
export default function RootPage() {
  redirect(`/${defaultLocale}`)
}

// HomePage component can be kept as is for the specific locale page
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white">🧑‍⚖️ AIJudgeDAO</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              去中心化AI仲裁DAO，让智能合约争议得到公正、透明的解决
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/dispute/001">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                查看演示案例
              </Button>
            </Link>
            <Link href="/dispute/new">
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                提交争议
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <Gavel className="h-8 w-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">AI 仲裁</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm">多个AI Agent独立分析，确保判决公正性</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <Shield className="h-8 w-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">去中心化</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm">链上执行，无需信任第三方机构</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <Zap className="h-8 w-8 text-yellow-400 mb-2" />
              <CardTitle className="text-white">快速响应</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm">自动化流程，分钟级完成仲裁</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <Users className="h-8 w-8 text-green-400 mb-2" />
              <CardTitle className="text-white">社区治理</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm">开放透明，社区参与监督</p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Case */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-2xl">演示案例</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">DAO 投票操纵争议</h3>
              <p className="text-slate-300">
                某DAO提案#45涉及10万USDC资金分配，投票过程中发现异常行为。
                多个地址疑似由同一实体控制，在最后时刻集中投票改变结果。
              </p>
              <div className="flex gap-4">
                <Link href="/dispute/001">
                  <Button className="bg-purple-600 hover:bg-purple-700">查看完整仲裁过程</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link href="/dispute/new">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">提交新争议</h3>
                <p className="text-slate-300 text-sm">遇到争议？让AI法官为您仲裁</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dispute/history">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">争议历史</h3>
                <p className="text-slate-300 text-sm">查看您的历史争议记录</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dispute/001">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <Eye className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">演示案例</h3>
                <p className="text-slate-300 text-sm">查看完整的仲裁流程演示</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
