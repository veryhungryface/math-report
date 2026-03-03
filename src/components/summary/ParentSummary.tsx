import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import type { ParentSummaryData } from '../../data/diagnosticQuestions'
import TrafficLight from './TrafficLight'
import { MetricCards } from './MetricCard'
import ParentGuide from './ParentGuide'

interface ParentSummaryProps {
  data: ParentSummaryData
}

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function ParentSummary({ data }: ParentSummaryProps) {
  return (
    <section id="parent-summary" className="py-20 px-6">
      <motion.div
        className="max-w-4xl mx-auto space-y-12"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section title */}
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/20">
            <Eye className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {'\uD559\uBD80\uBAA8 \uD55C\uB208\uC5D0 \uBCF4\uAE30'}
          </h2>
        </motion.div>

        {/* Traffic light */}
        <motion.div variants={fadeUp}>
          <TrafficLight level={data.level} headline={data.headline} />
        </motion.div>

        {/* Metric cards */}
        <motion.div variants={fadeUp}>
          <MetricCards data={data} />
        </motion.div>

        {/* Parent guide */}
        <motion.div variants={fadeUp}>
          <ParentGuide
            strengths={data.strengths}
            weaknesses={data.weaknesses}
            parentTips={data.parentTips}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
