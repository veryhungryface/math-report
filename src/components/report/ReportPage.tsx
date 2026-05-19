import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
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
    <section id="report" className="py-10 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-navy-900/80 border border-navy-700/50 p-4 md:p-6 shadow-2xl shadow-blue-500/5"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
            <div className="lg:col-span-4">
              <ReadinessScore />
            </div>
            <div className="lg:col-span-8">
              <RiskAreaCards />
            </div>
          </div>

          <div className="mb-4">
            <ErrorPatternChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <BeforeAfterComparison />
            <PrescriptionPlan />
          </div>

          <SkillBreakdownTable />
        </motion.div>
      </div>
    </section>
  )
}
