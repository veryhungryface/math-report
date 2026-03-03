import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { AlertTriangle, AlertCircle, Info } from 'lucide-react'
import { riskAreas } from '../../data/diagnosticReport'

const severityConfig = {
  high: {
    icon: AlertTriangle,
    label: '위험',
    border: 'border-l-red-500',
    bg: 'bg-red-500/10',
    badge: 'bg-red-500/20 text-red-400',
    barColor: 'bg-red-500',
  },
  medium: {
    icon: AlertCircle,
    label: '경고',
    border: 'border-l-amber-500',
    bg: 'bg-amber-500/10',
    badge: 'bg-amber-500/20 text-amber-400',
    barColor: 'bg-amber-500',
  },
  low: {
    icon: Info,
    label: '주의',
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-500/10',
    badge: 'bg-emerald-500/20 text-emerald-400',
    barColor: 'bg-emerald-500',
  },
}

export default function RiskAreaCards() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="space-y-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-semibold text-navy-200">위험 영역 Top 3</h4>
        <span className="text-xs text-navy-400">재발률 기준</span>
      </div>

      {riskAreas.map((area, i) => {
        const config = severityConfig[area.severity]
        const Icon = config.icon
        return (
          <motion.div
            key={area.rank}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className={`rounded-xl bg-navy-800/80 border border-navy-600/50 border-l-4 ${config.border} p-4 flex-1`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-current" style={{ color: area.severity === 'high' ? '#EF4444' : area.severity === 'medium' ? '#F59E0B' : '#10B981' }} />
                <span className="font-semibold text-white text-sm">{area.title}</span>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${config.badge}`}>
                {config.label}
              </span>
            </div>
            <p className="text-xs text-navy-300 mb-1">{area.description}</p>
            <p className="text-[11px] text-navy-400 mb-3">{area.impact}</p>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-navy-400">재발률</span>
                <span className="text-xs font-semibold text-white">{area.recurrenceRate}%</span>
              </div>
              <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${config.barColor}`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${area.recurrenceRate}%` } : {}}
                  transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: [0.33, 1, 0.68, 1] }}
                />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
