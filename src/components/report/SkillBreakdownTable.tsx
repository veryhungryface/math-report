import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skillBreakdown } from '../../data/diagnosticReport'

const statusConfig = {
  high: { label: 'High', dot: 'bg-red-500', text: 'text-red-400', bg: 'bg-red-500/10' },
  medium: { label: 'Warning', dot: 'bg-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10' },
  low: { label: 'Notice', dot: 'bg-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  safe: { label: 'Good', dot: 'bg-blue-500', text: 'text-blue-400', bg: 'bg-blue-500/10' },
}

function getBarColor(score: number) {
  if (score >= 80) return 'bg-blue-500'
  if (score >= 60) return 'bg-emerald-500'
  if (score >= 50) return 'bg-amber-500'
  return 'bg-red-500'
}

export default function SkillBreakdownTable() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="rounded-2xl bg-navy-800/80 border border-navy-600/50 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h4 className="text-sm font-semibold text-navy-200">Skill-Level Diagnosis</h4>
          <p className="text-xs text-navy-400 mt-0.5">Micro-skill analysis</p>
        </div>
        <span className="text-[11px] text-navy-500">{skillBreakdown.length} skills analyzed</span>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[10px] text-navy-500 font-medium uppercase tracking-wider border-b border-navy-700/50 mb-1">
        <div className="col-span-3">Skill</div>
        <div className="col-span-3">Score</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-2">Error Cause</div>
        <div className="col-span-2 text-center">Priority</div>
      </div>

      {/* Table rows */}
      <div className="space-y-0.5">
        {skillBreakdown.map((skill, i) => {
          const config = statusConfig[skill.status]
          return (
            <motion.div
              key={skill.skill}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="grid grid-cols-12 gap-2 px-3 py-2.5 rounded-lg hover:bg-navy-700/30 transition-colors items-center"
            >
              {/* Skill name */}
              <div className="col-span-3">
                <span className="text-sm text-navy-100">{skill.skill}</span>
              </div>

              {/* Score bar */}
              <div className="col-span-3 flex items-center gap-2">
                <div className="flex-1 h-2 bg-navy-700/50 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${getBarColor(skill.score)}`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.score}%` } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.05 }}
                  />
                </div>
                <span className="text-xs font-semibold text-white w-8 text-right tabular-nums">{skill.score}</span>
              </div>

              {/* Status */}
              <div className="col-span-2 flex justify-center">
                <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                  {config.label}
                </span>
              </div>

              {/* Error cause */}
              <div className="col-span-2">
                <span className="text-xs text-navy-300">{skill.errorCause}</span>
              </div>

              {/* Priority */}
              <div className="col-span-2 flex justify-center">
                {skill.priority ? (
                  <span className="text-xs font-semibold text-white bg-navy-600/50 px-2 py-0.5 rounded">
                    #{skill.priority}
                  </span>
                ) : (
                  <span className="text-xs text-navy-600">—</span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
