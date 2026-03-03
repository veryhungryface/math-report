import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { prescriptionPlan } from '../../data/diagnosticReport'
import { ArrowRight } from 'lucide-react'

export default function PrescriptionPlan() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="rounded-2xl bg-navy-800/80 border border-navy-600/50 p-6 h-full">
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-navy-200">4주 맞춤 처방 플랜</h4>
        <p className="text-xs text-navy-400 mt-0.5">진단 결과 기반 자동 생성</p>
      </div>

      <div className="space-y-3">
        {prescriptionPlan.map((week, i) => (
          <motion.div
            key={week.week}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="relative"
          >
            <div className="flex gap-3">
              {/* Week indicator */}
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: `${week.color}30`, color: week.color }}
                >
                  W{week.week}
                </div>
                {i < prescriptionPlan.length - 1 && (
                  <div className="w-px h-full min-h-[8px] bg-navy-600/50 my-1" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">{week.focus}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                    style={{ backgroundColor: `${week.color}20`, color: week.color }}
                  >
                    {week.scaffold}
                  </span>
                </div>
                <p className="text-xs text-navy-300 mb-2">{week.topic}</p>
                <div className="flex items-center gap-3 text-[11px] text-navy-400">
                  <span>매일 {week.dailyMinutes}분</span>
                  <span className="w-1 h-1 rounded-full bg-navy-600" />
                  <span>{week.dailyItems}문항/일</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scaffold progression */}
      <div className="mt-4 pt-4 border-t border-navy-700/50">
        <p className="text-[10px] text-navy-500 mb-2">학습 단계 진행</p>
        <div className="flex items-center gap-1 text-[11px]">
          {['예제', '유사', '변형', '혼합', '시험형'].map((stage, i) => (
            <div key={stage} className="flex items-center gap-1">
              <span className={`px-2 py-0.5 rounded ${i <= 1 ? 'bg-red-500/15 text-red-400' : i <= 2 ? 'bg-amber-500/15 text-amber-400' : i <= 3 ? 'bg-blue-500/15 text-blue-400' : 'bg-emerald-500/15 text-emerald-400'}`}>
                {stage}
              </span>
              {i < 4 && <ArrowRight className="w-3 h-3 text-navy-600" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
