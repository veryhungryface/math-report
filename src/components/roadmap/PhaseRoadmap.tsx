import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from '../ui/Section'
import { phaseRoadmap } from '../../data/diagnosticReport'

export default function PhaseRoadmap() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Section id="roadmap">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-14 text-center">
        Roadmap
      </h2>

      {/* Horizontal timeline */}
      <div ref={ref} className="relative">
        {/* Connecting horizontal line */}
        <div className="hidden md:block absolute top-[38px] left-0 right-0 h-px bg-navy-600" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {phaseRoadmap.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {/* Timeline dot */}
              <div
                className={`relative z-10 w-4 h-4 rounded-full mb-6 ${
                  phase.active
                    ? 'bg-blue-500 shadow-[0_0_16px_rgba(59,130,246,0.6)]'
                    : 'bg-navy-600'
                }`}
              />

              {/* Card */}
              <div
                className={`w-full rounded-xl p-5 border transition-all ${
                  phase.active
                    ? 'bg-navy-800/90 border-blue-500/50 shadow-[0_0_24px_rgba(59,130,246,0.15)]'
                    : 'bg-navy-800/50 border-navy-600/40'
                }`}
              >
                <span
                  className={`text-xs font-bold tracking-wider uppercase mb-1 block ${
                    phase.active ? 'text-blue-400' : 'text-navy-400'
                  }`}
                >
                  {phase.label}
                </span>
                <span className="text-[11px] text-navy-400 mb-2 block">
                  {phase.period}
                </span>
                <h3
                  className={`text-sm font-bold mb-2 ${
                    phase.active ? 'text-white' : 'text-navy-200'
                  }`}
                >
                  {phase.title}
                </h3>
                <p className="text-xs text-navy-300 italic mb-2 leading-relaxed">
                  "{phase.goal}"
                </p>
                <span className="text-[11px] text-navy-400">{phase.kpi}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
