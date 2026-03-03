import { motion } from 'framer-motion'

interface TrafficLightProps {
  level: 'red' | 'yellow' | 'green'
  headline: string
}

const config = {
  red: {
    bg: 'bg-red-500',
    shadow: 'shadow-red-500/50',
    ring: 'ring-red-500/30',
    emoji: '\u{1F6A8}',
  },
  yellow: {
    bg: 'bg-amber-400',
    shadow: 'shadow-amber-400/50',
    ring: 'ring-amber-400/30',
    emoji: '\u26A0\uFE0F',
  },
  green: {
    bg: 'bg-emerald-500',
    shadow: 'shadow-emerald-500/50',
    ring: 'ring-emerald-500/30',
    emoji: '\u2705',
  },
} as const

const dots: Array<'red' | 'yellow' | 'green'> = ['red', 'yellow', 'green']

const dotColors = {
  red: { active: 'bg-red-500', dim: 'bg-red-500/20' },
  yellow: { active: 'bg-amber-400', dim: 'bg-amber-400/20' },
  green: { active: 'bg-emerald-500', dim: 'bg-emerald-500/20' },
}

export default function TrafficLight({ level, headline }: TrafficLightProps) {
  const active = config[level]

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main light */}
      <motion.div
        className={`relative flex items-center justify-center w-20 h-20 rounded-full ${active.bg} shadow-lg ${active.shadow}`}
        animate={{
          boxShadow: [
            `0 0 20px 0px var(--tw-shadow-color, rgba(0,0,0,0))`,
            `0 0 40px 8px var(--tw-shadow-color, rgba(0,0,0,0))`,
            `0 0 20px 0px var(--tw-shadow-color, rgba(0,0,0,0))`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-3xl">{active.emoji}</span>
      </motion.div>

      {/* Three indicator dots */}
      <div className="flex items-center gap-3 mt-6">
        {dots.map((dot) => (
          <motion.div
            key={dot}
            className={`w-4 h-4 rounded-full ${
              dot === level ? dotColors[dot].active : dotColors[dot].dim
            }`}
            animate={
              dot === level
                ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }
                : {}
            }
            transition={
              dot === level
                ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                : {}
            }
          />
        ))}
      </div>

      {/* Headline */}
      <motion.p
        className="mt-6 text-2xl font-bold text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {headline}
      </motion.p>
    </motion.div>
  )
}
