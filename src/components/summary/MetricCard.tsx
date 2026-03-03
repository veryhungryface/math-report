import { motion } from 'framer-motion'
import { Target, AlertTriangle, Clock } from 'lucide-react'
import type { ReactNode } from 'react'
import type { ParentSummaryData } from '../../data/diagnosticQuestions'

interface MetricCardProps {
  value: string | number
  label: string
  icon: ReactNode
  color?: string
}

export default function MetricCard({ value, label, icon, color }: MetricCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6 text-center"
      whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className="flex items-center justify-center w-12 h-12 rounded-xl mb-4"
        style={{ backgroundColor: color ? `${color}20` : 'rgba(59,130,246,0.13)' }}
      >
        <div style={{ color: color || '#3B82F6' }}>{icon}</div>
      </div>
      <p className="text-4xl font-bold text-white">{value}</p>
      <p className="mt-2 text-sm text-navy-300">{label}</p>
    </motion.div>
  )
}

export function MetricCards({ data }: { data: ParentSummaryData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <MetricCard
        icon={<Target className="w-6 h-6" />}
        value={`${data.score}/${data.total}`}
        label="\uC815\uB2F5 \uC810\uC218"
        color="#3B82F6"
      />
      <MetricCard
        icon={<AlertTriangle className="w-6 h-6" />}
        value={`${data.riskCount}\uAC1C`}
        label="\uC704\uD5D8 \uC601\uC5ED"
        color="#EF4444"
      />
      <MetricCard
        icon={<Clock className="w-6 h-6" />}
        value={`${data.estimatedWeeks}\uC8FC`}
        label="\uC608\uC0C1 \uAC1C\uC120 \uAE30\uAC04"
        color="#F59E0B"
      />
    </div>
  )
}
