import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import Section from '../ui/Section'
import Card from '../ui/Card'

const painPoints = [
  {
    dot: 'bg-red-500',
    text: 'Students accumulate practice without knowing what they actually don\'t understand',
  },
  {
    dot: 'bg-amber-500',
    text: 'The real driver of achievement gaps is missing diagnosis and intervention — not a content shortage',
  },
  {
    dot: 'bg-red-500',
    text: 'Existing solutions focus on scores and units — they fail to explain the learner\'s actual state',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function ProblemStatement() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="problem">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-14 text-center">
        Why{' '}
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Precision Diagnosis
        </span>
        ?
      </h2>

      <div ref={ref} className="grid md:grid-cols-5 gap-8 items-start">
        {/* Left: pain points */}
        <motion.div
          className="md:col-span-3 space-y-5"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {painPoints.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-4"
            >
              <span
                className={`mt-2 flex-shrink-0 w-3 h-3 rounded-full ${p.dot}`}
              />
              <p className="text-navy-200 text-lg leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: insight card */}
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="relative overflow-hidden border-blue-500/30">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
            <div className="flex items-center gap-3 mb-4 mt-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                Key Insight
              </span>
            </div>
            <blockquote className="text-xl md:text-2xl font-bold text-white leading-snug">
              "Questions aren't inventory —
              <br />
              they're{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                sensors
              </span>
              "
            </blockquote>
          </Card>
        </motion.div>
      </div>
    </Section>
  )
}
