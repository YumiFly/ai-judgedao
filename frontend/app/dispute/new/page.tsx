import { DisputeForm } from "@/components/dispute-form"

export default function NewDisputePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">提交新争议</h1>
          <p className="text-slate-300">详细描述您的争议，AIJudgeDAO将为您提供公正仲裁</p>
        </div>

        <DisputeForm />
      </div>
    </div>
  )
}
