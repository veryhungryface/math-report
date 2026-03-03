import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { cn } from '../../lib/cn'
import MathRenderer from '../ui/MathRenderer'
import type { FollowUp } from '../../data/diagnosticQuestions'

interface FollowUpPanelProps {
  followUp: FollowUp
  followUpSelected: number | null
  selectFollowUp: (i: number) => void
  nextQuestion: () => void
}

const prefixes = ['A', 'B', 'C', 'D']

export default function FollowUpPanel({
  followUp,
  followUpSelected,
  selectFollowUp,
  nextQuestion,
}: FollowUpPanelProps) {
  const isAnswered = followUpSelected !== null
  const isCorrect = followUpSelected === followUp.followUpAnswer

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mt-6 overflow-hidden"
    >
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 mb-5 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-200">{followUp.errorDiagnosis}</p>
      </div>

      <p className="text-sm text-navy-300 mb-3 font-medium">추가 진단 문항</p>

      <div className="mb-4 bg-navy-900/50 rounded-xl p-4">
        <MathRenderer math={followUp.followUpQuestion} displayMode />
      </div>

      <div className="flex flex-col gap-2 mb-5">
        {followUp.followUpChoices.map((choice, i) => {
          let state: 'default' | 'correct' | 'wrong' = 'default'
          if (isAnswered) {
            if (i === followUp.followUpAnswer) state = 'correct'
            else if (i === followUpSelected) state = 'wrong'
          }

          return (
            <button
              key={i}
              onClick={() => !isAnswered && selectFollowUp(i)}
              disabled={isAnswered}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm border transition-colors',
                state === 'default' &&
                  'bg-navy-800/70 border-navy-700/50 hover:bg-navy-700/60',
                state === 'correct' &&
                  'bg-emerald-500/20 border-emerald-400/60',
                state === 'wrong' &&
                  'bg-red-500/20 border-red-400/60',
                isAnswered && state === 'default' && 'opacity-50 cursor-not-allowed',
              )}
            >
              <span
                className={cn(
                  'w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0',
                  state === 'correct'
                    ? 'bg-emerald-500 text-white'
                    : state === 'wrong'
                      ? 'bg-red-500 text-white'
                      : 'bg-navy-700 text-navy-300',
                )}
              >
                {prefixes[i]}
              </span>
              <span className="text-navy-100">
                <MathRenderer math={choice} />
              </span>
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <p className={cn('text-sm font-medium', isCorrect ? 'text-emerald-400' : 'text-red-400')}>
            {isCorrect ? '정답입니다!' : '아쉽지만 틀렸습니다'}
          </p>
          <button
            onClick={nextQuestion}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
          >
            다음 문항
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
