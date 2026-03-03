import { useState, useCallback } from 'react'
import {
  type TestResult,
  type ParentSummaryData,
  diagnosticQuestions,
  generateParentSummary,
} from '../data/diagnosticQuestions'

export type TestPhase = 'idle' | 'intro' | 'testing' | 'complete'

export interface TestState {
  phase: TestPhase
  currentIndex: number
  results: TestResult[]
  showFollowUp: boolean
  selectedAnswer: number | null
  followUpSelected: number | null
  isRevealed: boolean
  summaryData: ParentSummaryData | null
}

export function useTestState() {
  const [state, setState] = useState<TestState>({
    phase: 'idle',
    currentIndex: 0,
    results: [],
    showFollowUp: false,
    selectedAnswer: null,
    followUpSelected: null,
    isRevealed: false,
    summaryData: null,
  })

  const totalQuestions = diagnosticQuestions.length

  const startTest = useCallback(() => {
    setState({
      phase: 'intro',
      currentIndex: 0,
      results: [],
      showFollowUp: false,
      selectedAnswer: null,
      followUpSelected: null,
      isRevealed: false,
      summaryData: null,
    })
  }, [])

  const beginQuestions = useCallback(() => {
    setState((s) => ({ ...s, phase: 'testing' }))
  }, [])

  const selectAnswer = useCallback((choiceIndex: number) => {
    setState((s) => {
      if (s.isRevealed) return s
      const question = diagnosticQuestions[s.currentIndex]
      const correct = choiceIndex === question.correctAnswer
      return {
        ...s,
        selectedAnswer: choiceIndex,
        isRevealed: true,
        showFollowUp: !correct && !!question.followUps[choiceIndex],
      }
    })
  }, [])

  const selectFollowUp = useCallback((choiceIndex: number) => {
    setState((s) => ({ ...s, followUpSelected: choiceIndex }))
  }, [])

  const nextQuestion = useCallback(() => {
    setState((s) => {
      const question = diagnosticQuestions[s.currentIndex]
      const correct = s.selectedAnswer === question.correctAnswer
      const followUp = !correct ? question.followUps[s.selectedAnswer!] : undefined

      const result: TestResult = {
        questionId: question.id,
        correct,
        selectedAnswer: s.selectedAnswer!,
        ...(followUp && {
          errorDiagnosis: followUp.errorDiagnosis,
          followUpCorrect: s.followUpSelected === followUp.followUpAnswer,
          followUpSelected: s.followUpSelected ?? undefined,
        }),
      }

      const newResults = [...s.results, result]
      const nextIndex = s.currentIndex + 1
      const isComplete = nextIndex >= totalQuestions

      if (isComplete) {
        return {
          ...s,
          results: newResults,
          phase: 'complete' as const,
          summaryData: generateParentSummary(newResults),
          showFollowUp: false,
          selectedAnswer: null,
          followUpSelected: null,
          isRevealed: false,
        }
      }

      return {
        ...s,
        results: newResults,
        currentIndex: nextIndex,
        showFollowUp: false,
        selectedAnswer: null,
        followUpSelected: null,
        isRevealed: false,
      }
    })
  }, [totalQuestions])

  const currentQuestion = diagnosticQuestions[state.currentIndex] ?? null

  return {
    ...state,
    totalQuestions,
    currentQuestion,
    startTest,
    beginQuestions,
    selectAnswer,
    selectFollowUp,
    nextQuestion,
  }
}
