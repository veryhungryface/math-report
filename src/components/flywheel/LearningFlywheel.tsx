import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Brain,
  ClipboardList,
  Dumbbell,
  CheckCircle,
  RefreshCw,
} from 'lucide-react'
import Section from '../ui/Section'

const nodes = [
  { label: '정밀진단', Icon: Brain, color: '#3B82F6' },
  { label: '처방', Icon: ClipboardList, color: '#8B5CF6' },
  { label: '개인화 훈련', Icon: Dumbbell, color: '#EC4899' },
  { label: '평가/재진단', Icon: CheckCircle, color: '#F59E0B' },
  { label: '모델 업데이트', Icon: RefreshCw, color: '#06B6D4' },
]

// Place 5 nodes evenly on a circle (start from top, -90deg offset)
function getPosition(index: number, total: number, radius: number) {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  }
}

export default function LearningFlywheel() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const radius = 160

  return (
    <Section id="flywheel">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center">
        성적상승 엔진
      </h2>
      <p className="text-navy-300 text-center mb-16 text-lg">
        데이터가 쌓일수록 진단은 정밀해지고, 성적은 올라갑니다
      </p>

      <div
        ref={ref}
        className="relative mx-auto"
        style={{ width: 420, height: 420 }}
      >
        {/* SVG arcs connecting nodes */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 420 420"
          fill="none"
        >
          {nodes.map((_, i) => {
            const from = getPosition(i, nodes.length, radius)
            const to = getPosition((i + 1) % nodes.length, nodes.length, radius)
            const cx = 210
            const cy = 210
            return (
              <motion.line
                key={i}
                x1={cx + from.x}
                y1={cy + from.y}
                x2={cx + to.x}
                y2={cy + to.y}
                stroke="#243556"
                strokeWidth={2}
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  inView
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              />
            )
          })}
        </svg>

        {/* Center pulsing label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-28 h-28 rounded-full flex items-center justify-center text-center"
            style={{
              background:
                'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-sm font-bold text-blue-400 leading-tight">
              성적상승
              <br />
              엔진
            </span>
          </motion.div>
        </div>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const pos = getPosition(i, nodes.length, radius)
          return (
            <motion.div
              key={node.label}
              className="absolute flex flex-col items-center"
              style={{
                left: 210 + pos.x - 36,
                top: 210 + pos.y - 36,
                width: 72,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                inView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.5 }
              }
              transition={{ duration: 0.4, delay: 0.1 + i * 0.12 }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-1.5"
                style={{
                  backgroundColor: `${node.color}20`,
                  border: `2px solid ${node.color}`,
                  boxShadow: `0 0 16px ${node.color}30`,
                }}
              >
                <node.Icon className="w-6 h-6" style={{ color: node.color }} />
              </div>
              <span className="text-xs font-semibold text-navy-100 text-center whitespace-nowrap">
                {node.label}
              </span>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
