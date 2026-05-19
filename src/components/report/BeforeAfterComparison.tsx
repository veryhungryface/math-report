import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer
} from 'recharts'
import { sixAxes, sixAxisScores } from '../../data/diagnosticReport'
import { TrendingUp, TrendingDown } from 'lucide-react'

const radarData = sixAxes.map(axis => ({
  axis: axis.nameKo,
  before: sixAxisScores.before[axis.id],
  after: sixAxisScores.after[axis.id],
}))

const metrics = [
  { label: 'Readiness Score', before: 67, after: 82, unit: '', better: 'up' as const },
  { label: 'Risk Areas', before: 3, after: 1, unit: '', better: 'down' as const },
  { label: 'Procedural Recurrence', before: 78, after: 25, unit: '%', better: 'down' as const },
  { label: 'Transfer Success', before: 32, after: 68, unit: '%', better: 'up' as const },
]

function AnimatedNum({ target, inView }: { target: number; inView: boolean }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const dur = 1500
    function tick(now: number) {
      const p = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return <>{val}</>
}

export default function BeforeAfterComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="rounded-2xl bg-navy-800/80 border border-navy-600/50 p-6 h-full">
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-navy-200">Before / After Projection</h4>
        <p className="text-xs text-navy-400 mt-0.5">Expected change after 4-week prescription</p>
      </div>

      {/* Radar chart */}
      <div className="w-full h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="#243556" />
            <PolarAngleAxis dataKey="axis" tick={{ fill: '#9BB5D6', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Before"
              dataKey="before"
              stroke="#EF4444"
              fill="#EF4444"
              fillOpacity={0.15}
              strokeWidth={2}
            />
            <Radar
              name="After"
              dataKey="after"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.2}
              strokeWidth={2}
              strokeDasharray=""
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mb-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-red-500 rounded" />
          <span className="text-navy-400">At diagnosis</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-emerald-500 rounded" />
          <span className="text-navy-400">Projected after 4 weeks</span>
        </div>
      </div>

      {/* Metrics table */}
      <div className="space-y-2">
        {metrics.map((m, i) => {
          const diff = m.after - m.before
          const isImproved = m.better === 'up' ? diff > 0 : diff < 0
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-navy-700/30"
            >
              <span className="text-xs text-navy-400 w-28">{m.label}</span>
              <span className="text-xs text-navy-500 w-12 text-right">
                {m.before}{m.unit}
              </span>
              <span className="text-xs text-navy-600 mx-1">→</span>
              <span className="text-xs font-semibold text-white w-12 text-right">
                <AnimatedNum target={m.after} inView={isInView} />{m.unit}
              </span>
              <div className={`flex items-center gap-0.5 w-16 justify-end text-xs font-medium ${isImproved ? 'text-emerald-400' : 'text-red-400'}`}>
                {isImproved ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{diff > 0 ? '+' : ''}{diff}{m.unit}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
