import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Brain,
  GitBranch,
  MessageSquare,
  Compass,
  RotateCcw,
  Shuffle,
} from 'lucide-react'
import Section from '../ui/Section'
import Card from '../ui/Card'
import SixAxisRadar from './SixAxisRadar'
import { sixAxes } from '../../data/diagnosticReport'

const iconMap: Record<string, React.ElementType> = {
  Brain,
  GitBranch,
  MessageSquare,
  Compass,
  RotateCcw,
  Shuffle,
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export default function DiagnosticModel() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' })

  return (
    <Section id="diagnosis">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center">
        Six-Axis Precision Diagnostic Model
      </h2>
      <p className="text-navy-300 text-center mb-12 text-lg">
        We don't just look at right answers — we break down{' '}
        <span className="text-white font-semibold">why students get stuck</span>
      </p>

      {/* Radar chart */}
      <div className="mb-16">
        <SixAxisRadar />
      </div>

      {/* 3x2 axis cards grid */}
      <motion.div
        ref={cardsRef}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={stagger}
        initial="hidden"
        animate={cardsInView ? 'show' : 'hidden'}
      >
        {sixAxes.map((axis) => {
          const Icon = iconMap[axis.icon]
          return (
            <motion.div key={axis.id} variants={fadeUp}>
              <Card
                className="h-full"
                key={axis.id}
              >
                <div className="flex items-start gap-4">
                  {/* Colored left border accent */}
                  <div
                    className="w-1 self-stretch rounded-full flex-shrink-0"
                    style={{ backgroundColor: axis.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-2">
                      {Icon && (
                        <Icon
                          className="w-5 h-5 flex-shrink-0"
                          style={{ color: axis.color }}
                        />
                      )}
                      <h3 className="text-white font-bold text-lg">
                        {axis.nameKo}
                      </h3>
                      <span className="text-navy-400 text-sm">
                        {axis.nameEn}
                      </span>
                    </div>
                    <p className="text-navy-300 text-sm mb-3 leading-relaxed">
                      {axis.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {axis.examples.map((ex, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-md bg-navy-700/60 text-navy-200 border border-navy-600/40"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
