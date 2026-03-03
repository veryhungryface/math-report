import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import MathRenderer from '../ui/MathRenderer'

type AnswerState = 'default' | 'selected' | 'correct' | 'wrong'

interface AnswerOptionProps {
  label: string
  index: number
  state: AnswerState
  onClick: () => void
  disabled: boolean
}

const prefixes = ['A', 'B', 'C', 'D']

export default function AnswerOption({ label, index, state, onClick, disabled }: AnswerOptionProps) {
  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-colors border',
        state === 'default' &&
          'bg-navy-800 border-navy-700/50 hover:bg-navy-700/70 hover:border-navy-600/50',
        state === 'selected' &&
          'bg-navy-800 border-blue-400 ring-2 ring-blue-400/40',
        state === 'correct' &&
          'bg-emerald-500/20 border-emerald-400/60',
        state === 'wrong' &&
          'bg-red-500/20 border-red-400/60',
        disabled && state === 'default' && 'opacity-50 cursor-not-allowed',
      )}
    >
      <span
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold',
          state === 'correct'
            ? 'bg-emerald-500 text-white'
            : state === 'wrong'
              ? 'bg-red-500 text-white'
              : 'bg-navy-700 text-navy-300',
        )}
      >
        {state === 'correct' ? (
          <Check className="w-4 h-4" />
        ) : state === 'wrong' ? (
          <X className="w-4 h-4" />
        ) : (
          prefixes[index]
        )}
      </span>

      <span className="flex-1 text-navy-100">
        <MathRenderer math={label} />
      </span>
    </motion.button>
  )
}
