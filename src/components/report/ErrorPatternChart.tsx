import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { errorPatterns } from '../../data/diagnosticReport'

export default function ErrorPatternChart() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const maxPercentage = Math.max(...errorPatterns.map(p => p.percentage))

  return (
    <div ref={ref} className="rounded-2xl bg-navy-800/80 border border-navy-600/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-sm font-semibold text-navy-200">Error Pattern Distribution</h4>
          <p className="text-xs text-navy-400 mt-0.5">Six-axis error cause decomposition</p>
        </div>
        <span className="text-[11px] text-navy-500">Based on 25 items</span>
      </div>

      <div className="space-y-4">
        {errorPatterns.map((pattern, i) => (
          <div key={pattern.category} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pattern.color }} />
                <span className="text-sm text-navy-200 font-medium">{pattern.category}</span>
                <span className="text-[10px] text-navy-500">{pattern.nameEn}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-navy-400">{pattern.count}</span>
                <span className="text-sm font-semibold text-white w-10 text-right">{pattern.percentage}%</span>
              </div>
            </div>
            <div className="h-3 bg-navy-700/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full relative"
                style={{ backgroundColor: pattern.color }}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${(pattern.percentage / maxPercentage) * 100}%` } : {}}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
              >
                <div
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${pattern.color})`,
                  }}
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-navy-700/50 flex items-center justify-between">
        <p className="text-[11px] text-navy-500">
          Procedural errors lead at 32% — top remediation priority
        </p>
        <div className="flex items-center gap-1 text-[10px] text-navy-500">
          <span className="w-1.5 h-1.5 rounded-full bg-navy-500" />
          Includes time & edit patterns
        </div>
      </div>
    </div>
  )
}
