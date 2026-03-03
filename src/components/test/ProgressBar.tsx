import { cn } from '../../lib/cn'
import type { TestResult } from '../../data/diagnosticQuestions'

interface ProgressBarProps {
  currentIndex: number
  totalQuestions: number
  results: TestResult[]
}

export default function ProgressBar({ currentIndex, totalQuestions, results }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <p className="text-sm text-navy-300 mb-3 text-center font-medium">
        {currentIndex + 1} / {totalQuestions}
      </p>
      <div className="flex gap-1.5">
        {Array.from({ length: totalQuestions }).map((_, i) => {
          const result = results[i]
          const isCurrent = i === currentIndex

          return (
            <div
              key={i}
              className={cn(
                'h-2 flex-1 rounded-full transition-all duration-300',
                result
                  ? result.correct
                    ? 'bg-emerald-400'
                    : 'bg-red-400'
                  : isCurrent
                    ? 'bg-blue-400 animate-pulse'
                    : 'bg-navy-700',
              )}
            />
          )
        })}
      </div>
    </div>
  )
}
