import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from '../ui/Section'
import { competitorGenerations } from '../../data/diagnosticReport'

export default function GenerationComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Section id="competition">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center">
        The Evolution of Diagnostic Tech
      </h2>
      <p className="text-navy-300 text-center mb-14 text-lg">
        4th-generation diagnosis fills the gap in today's market
      </p>

      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end"
      >
        {competitorGenerations.map((gen, i) => {
          const isHighlight = gen.highlight === true
          // Ascending step height: gen 1 shortest, gen 4 tallest
          const minH = 220 + i * 30

          return (
            <motion.div
              key={gen.gen}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className={`rounded-xl border p-6 transition-all ${
                isHighlight
                  ? 'bg-navy-800/90 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)]'
                  : 'bg-navy-800/50 border-navy-600/40 opacity-70'
              }`}
              style={{ minHeight: minH }}
            >
              <span
                className={`text-xs font-bold tracking-wider uppercase mb-1 block ${
                  isHighlight ? 'text-blue-400' : 'text-navy-400'
                }`}
              >
                {gen.label}
              </span>
              <h3
                className={`text-lg font-bold mb-3 ${
                  isHighlight ? 'text-white' : 'text-navy-200'
                }`}
              >
                {gen.title}
              </h3>
              <p className="text-xs text-navy-400 mb-3">{gen.examples}</p>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-navy-400 text-xs">Input: </span>
                  <span className="text-navy-200 text-xs">{gen.input}</span>
                </div>
                <div>
                  <span className="text-navy-400 text-xs">Output: </span>
                  <span className="text-navy-200 text-xs">{gen.output}</span>
                </div>
                {gen.limitation && (
                  <div className="mt-3 pt-3 border-t border-navy-600/40">
                    <span className="text-red-400/80 text-xs italic">
                      {gen.limitation}
                    </span>
                  </div>
                )}
                {isHighlight && (
                  <div className="mt-3 pt-3 border-t border-blue-500/30">
                    <span className="text-blue-400 text-xs font-semibold">
                      Math MRI
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
