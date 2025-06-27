import { DisputeHistoryList } from "@/components/dispute-history-list"

export default function DisputeHistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">争议历史</h1>
          <p className="text-slate-300">查看您提交的所有争议记录和仲裁结果</p>
        </div>

        <DisputeHistoryList />
      </div>
    </div>
  )
}
