import { motion } from 'framer-motion'
import { ClipboardCheck } from 'lucide-react'

interface TestIntroProps {
  beginQuestions: () => void
}

export default function TestIntro({ beginQuestions }: TestIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center text-center py-16"
    >
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center mb-8">
        <ClipboardCheck className="w-10 h-10 text-white" />
      </div>

      <h2 className="text-3xl font-bold text-navy-50 mb-3">
        Math Diagnostic Test
      </h2>

      <p className="text-lg text-navy-300 mb-2">
        Check your readiness for the Grade 6 &rarr; Grade 7 transition
      </p>

      <p className="text-sm text-navy-400 mb-10">
        10 questions &middot; about 5 minutes &middot; follow-up on wrong answers
      </p>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={beginQuestions}
        className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
      >
        Start Test
      </motion.button>
    </motion.div>
  )
}
