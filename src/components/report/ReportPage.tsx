import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ReportHeader from './ReportHeader'
import ReadinessScore from './ReadinessScore'
import RiskAreaCards from './RiskAreaCards'
import ErrorPatternChart from './ErrorPatternChart'
import PrescriptionPlan from './PrescriptionPlan'
import BeforeAfterComparison from './BeforeAfterComparison'
import SkillBreakdownTable from './SkillBreakdownTable'

export default function ReportPage() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="report" className="py-24 px-6 relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full mb-4">
            DIAGNOSTIC REPORT
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            진단 리포트 미리보기
          </h2>
          <p className="text-navy-300 max-w-lg mx-auto">
            25문항으로 학습자의 상태를 정밀 분해합니다.
            <br />
            <span className="text-navy-400 text-sm">아래는 실제 리포트의 데모입니다.</span>
          </p>
        </motion.div>

        {/* Dashboard frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl bg-navy-900/80 border border-navy-700/50 p-4 md:p-6 shadow-2xl shadow-blue-500/5"
        >
          {/* Report Header */}
          <div className="mb-6">
            <ReportHeader />
          </div>

          {/* Score + Risk Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
            <div className="lg:col-span-4">
              <ReadinessScore />
            </div>
            <div className="lg:col-span-8">
              <RiskAreaCards />
            </div>
          </div>

          {/* Error Pattern */}
          <div className="mb-4">
            <ErrorPatternChart />
          </div>

          {/* Before/After + Prescription */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <BeforeAfterComparison />
            <PrescriptionPlan />
          </div>

          {/* Skill Breakdown */}
          <SkillBreakdownTable />
        </motion.div>
      </div>
    </section>
  )
}
