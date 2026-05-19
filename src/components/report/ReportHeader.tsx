import { mockStudent } from '../../data/diagnosticReport'
import { FileText, Calendar, BookOpen, Clock } from 'lucide-react'

export default function ReportHeader() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-800 to-navy-700 border border-navy-600 p-6">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/20">
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Math MRI Precision Report</h3>
            <p className="text-sm text-navy-300">Precision Diagnostic Report</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-600/50 flex items-center justify-center">
              <span className="text-sm">👤</span>
            </div>
            <div>
              <p className="text-xs text-navy-400">Student</p>
              <p className="text-sm font-semibold text-white">{mockStudent.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-600/50 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-navy-300" />
            </div>
            <div>
              <p className="text-xs text-navy-400">Grade</p>
              <p className="text-sm font-semibold text-white">{mockStudent.grade}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-600/50 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-navy-300" />
            </div>
            <div>
              <p className="text-xs text-navy-400">Date</p>
              <p className="text-sm font-semibold text-white">{mockStudent.diagnosisDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-600/50 flex items-center justify-center">
              <Clock className="w-4 h-4 text-navy-300" />
            </div>
            <div>
              <p className="text-xs text-navy-400">Duration</p>
              <p className="text-sm font-semibold text-white">{mockStudent.timeSpent}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-navy-600/50">
          <p className="text-xs text-navy-400">
            Scope: <span className="text-navy-200">{mockStudent.scope}</span>
            {' · '}
            {mockStudent.totalItems} items analyzed
          </p>
        </div>
      </div>
    </div>
  )
}
