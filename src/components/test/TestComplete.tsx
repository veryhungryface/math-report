import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import type { TestResult } from '../../data/diagnosticQuestions'

interface TestCompleteProps {
  results: TestResult[]
  totalQuestions: number
}

export default function TestComplete({ results, totalQuestions }: TestCompleteProps) {
  const correctCount = results.filter((r) => r.correct).length

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center text-center py-16"
    >
      <motion.div
        initial={{ rotate: -20, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-8"
      >
        <Trophy className="w-10 h-10 text-white" />
      </motion.div>

      <h2 className="text-3xl font-bold text-navy-50 mb-4">테스트 완료!</h2>

      <p className="text-xl text-navy-200 mb-2">
        <span className="text-2xl font-bold text-white">{correctCount}</span>
        <span className="text-navy-400"> / {totalQuestions}</span>
        {' '}문항 정답
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10 text-navy-400"
      >
        <p className="text-sm">잠시 후 결과 페이지로 이동합니다</p>
      </motion.div>
    </motion.div>
  )
}
