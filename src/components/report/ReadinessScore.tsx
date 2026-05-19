import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { readinessScore } from '../../data/diagnosticReport'

const RADIUS = 80
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const STROKE_WIDTH = 14

function getScoreColor(score: number): string {
  if (score >= 80) return '#10B981'
  if (score >= 60) return '#3B82F6'
  if (score >= 40) return '#F59E0B'
  return '#EF4444'
}

function getStatusBg(status: string): string {
  switch (status) {
    case 'warning': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    case 'danger': return 'bg-red-500/20 text-red-400 border-red-500/30'
    case 'good': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'excellent': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    default: return 'bg-navy-600/50 text-navy-300 border-navy-500/30'
  }
}

export default function ReadinessScore() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)

  const { score, statusLabel, peerAverage, percentile } = readinessScore
  const color = getScoreColor(score)
  const offset = CIRCUMFERENCE * (1 - (isInView ? score : 0) / 100)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const startTime = performance.now()

    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.round(eased * score)
      setCount(start)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, score])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center rounded-2xl bg-navy-800/80 border border-navy-600/50 p-6 h-full">
      <p className="text-sm text-navy-400 mb-4 font-medium">Middle School Readiness</p>

      <div className="relative w-48 h-48 mb-4">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          {/* Background track */}
          <circle
            cx="100" cy="100" r={RADIUS}
            fill="none"
            stroke="#1A2744"
            strokeWidth={STROKE_WIDTH}
          />
          {/* Score arc */}
          <motion.circle
            cx="100" cy="100" r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
            style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-white tabular-nums">{count}</span>
          <span className="text-sm text-navy-400">/ 100</span>
        </div>
      </div>

      <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusBg(readinessScore.status)} mb-4`}>
        {statusLabel}
      </div>

      <div className="w-full grid grid-cols-2 gap-3">
        <div className="text-center rounded-lg bg-navy-700/50 py-2 px-3">
          <p className="text-xs text-navy-400">Peer Average</p>
          <p className="text-lg font-semibold text-white">{peerAverage}</p>
        </div>
        <div className="text-center rounded-lg bg-navy-700/50 py-2 px-3">
          <p className="text-xs text-navy-400">Top</p>
          <p className="text-lg font-semibold text-white">{percentile}%</p>
        </div>
      </div>
    </div>
  )
}
