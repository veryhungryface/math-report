import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import MathRenderer from '../ui/MathRenderer'
import AnswerOption from './AnswerOption'
import FollowUpPanel from './FollowUpPanel'
import type { DiagnosticQuestion, AxisType } from '../../data/diagnosticQuestions'

interface QuestionCardProps {
  question: DiagnosticQuestion
  selectedAnswer: number | null
  isRevealed: boolean
  showFollowUp: boolean
  followUpSelected: number | null
  selectAnswer: (i: number) => void
  selectFollowUp: (i: number) => void
  nextQuestion: () => void
}

const axisColors: Record<AxisType, string> = {
  concept: 'bg-axis-concept/20 text-axis-concept border-axis-concept/30',
  procedure: 'bg-axis-procedure/20 text-axis-procedure border-axis-procedure/30',
  expression: 'bg-axis-expression/20 text-axis-expression border-axis-expression/30',
  strategy: 'bg-axis-strategy/20 text-axis-strategy border-axis-strategy/30',
  habit: 'bg-axis-habit/20 text-axis-habit border-axis-habit/30',
  transfer: 'bg-axis-transfer/20 text-axis-transfer border-axis-transfer/30',
}

export default function QuestionCard({
  question,
  selectedAnswer,
  isRevealed,
  showFollowUp,
  followUpSelected,
  selectAnswer,
  selectFollowUp,
  nextQuestion,
}: QuestionCardProps) {
  const isCorrect = selectedAnswer === question.correctAnswer
  const followUp = selectedAnswer !== null && !isCorrect ? question.followUps[selectedAnswer] : null

  // Auto-advance on correct answer after 1.2s
  useEffect(() => {
    if (isRevealed && isCorrect) {
      const timer = setTimeout(nextQuestion, 1200)
      return () => clearTimeout(timer)
    }
  }, [isRevealed, isCorrect, nextQuestion])

  function getState(index: number) {
    if (!isRevealed) return 'default' as const
    if (index === question.correctAnswer) return 'correct' as const
    if (index === selectedAnswer) return 'wrong' as const
    return 'default' as const
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="text-sm text-navy-400 font-medium">{question.topic}</span>
          <span
            className={cn(
              'text-xs px-2.5 py-1 rounded-full border font-medium',
              axisColors[question.axis],
            )}
          >
            {question.axisLabel}
          </span>
        </div>

        <div className="mb-6 bg-navy-900/50 rounded-xl p-5">
          <MathRenderer math={question.question} displayMode className="text-lg" />
        </div>

        <div className="flex flex-col gap-3">
          {question.choices.map((choice, i) => (
            <AnswerOption
              key={i}
              label={choice}
              index={i}
              state={getState(i)}
              onClick={() => selectAnswer(i)}
              disabled={isRevealed}
            />
          ))}
        </div>

        {showFollowUp && followUp && (
          <FollowUpPanel
            followUp={followUp}
            followUpSelected={followUpSelected}
            selectFollowUp={selectFollowUp}
            nextQuestion={nextQuestion}
          />
        )}

        {isRevealed && !isCorrect && !followUp && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={nextQuestion}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
            >
              다음 문항
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
