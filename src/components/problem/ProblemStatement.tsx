import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import Section from '../ui/Section'
import Card from '../ui/Card'

const painPoints = [
  {
    dot: 'bg-red-500',
    text: '학생은 무엇을 모르는지 모른 채 문제풀이만 누적',
  },
  {
    dot: 'bg-amber-500',
    text: '성취도 격차의 핵심은 콘텐츠 부족이 아니라 진단·개입의 부재',
  },
  {
    dot: 'bg-red-500',
    text: '기존 솔루션은 점수/단원 중심 → 학습자 상태 설명이 약함',
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
        왜{' '}
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          정밀 진단
        </span>
        인가?
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
              "문항은 재고가 아니라
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                센서
              </span>
              다"
            </blockquote>
          </Card>
        </motion.div>
      </div>
    </Section>
  )
}
