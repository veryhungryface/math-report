import type { TestPhase } from '../../hooks/useTestState'
import type { DiagnosticQuestion, TestResult } from '../../data/diagnosticQuestions'
import Section from '../ui/Section'
import TestIntro from './TestIntro'
import ProgressBar from './ProgressBar'
import QuestionCard from './QuestionCard'
import TestComplete from './TestComplete'

interface DiagnosticTestProps {
  phase: TestPhase
  currentIndex: number
  totalQuestions: number
  currentQuestion: DiagnosticQuestion | null
  results: TestResult[]
  showFollowUp: boolean
  selectedAnswer: number | null
  followUpSelected: number | null
  isRevealed: boolean
  startTest: () => void
  beginQuestions: () => void
  selectAnswer: (i: number) => void
  selectFollowUp: (i: number) => void
  nextQuestion: () => void
}

export default function DiagnosticTest({
  phase,
  currentIndex,
  totalQuestions,
  currentQuestion,
  results,
  showFollowUp,
  selectedAnswer,
  followUpSelected,
  isRevealed,
  beginQuestions,
  selectAnswer,
  selectFollowUp,
  nextQuestion,
}: DiagnosticTestProps) {
  if (phase === 'idle') return null

  return (
    <Section id="diagnostic-test">
      {phase === 'intro' && <TestIntro beginQuestions={beginQuestions} />}

      {phase === 'testing' && currentQuestion && (
        <>
          <ProgressBar
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            results={results}
          />
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isRevealed={isRevealed}
            showFollowUp={showFollowUp}
            followUpSelected={followUpSelected}
            selectAnswer={selectAnswer}
            selectFollowUp={selectFollowUp}
            nextQuestion={nextQuestion}
          />
        </>
      )}

      {phase === 'complete' && (
        <TestComplete results={results} totalQuestions={totalQuestions} />
      )}
    </Section>
  )
}
