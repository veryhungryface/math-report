import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TabBar, { type TabId } from './components/layout/TabBar'
import HeroSection from './components/hero/HeroSection'
import ProblemStatement from './components/problem/ProblemStatement'
import DiagnosticModel from './components/diagnosis/DiagnosticModel'
import DiagnosticTest from './components/test/DiagnosticTest'
import ParentSummary from './components/summary/ParentSummary'
import ReportPage from './components/report/ReportPage'
import LearningFlywheel from './components/flywheel/LearningFlywheel'
import PhaseRoadmap from './components/roadmap/PhaseRoadmap'
import GenerationComparison from './components/competition/GenerationComparison'
import Footer from './components/layout/Footer'
import { useTestState } from './hooks/useTestState'

const tabMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeOut' as const },
}

export default function App() {
  const test = useTestState()
  const [activeTab, setActiveTab] = useState<TabId>('intro')
  const [testCompleted, setTestCompleted] = useState(false)

  const handleStartTest = useCallback(() => {
    test.startTest()
    setActiveTab('test')
  }, [test])

  // Auto-switch to results tab 2s after test completes
  useEffect(() => {
    if (test.phase === 'complete') {
      setTestCompleted(true)
      const timer = setTimeout(() => setActiveTab('results'), 2000)
      return () => clearTimeout(timer)
    }
  }, [test.phase])

  return (
    <div className="min-h-screen bg-navy-950 text-navy-100">
      <TabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        testCompleted={testCompleted}
      />

      {/* Spacer for fixed tab bar */}
      <div className="h-14" />

      <AnimatePresence mode="wait">
        {activeTab === 'intro' && (
          <motion.div key="intro" {...tabMotion}>
            <HeroSection onStartTest={handleStartTest} />
            <ProblemStatement />
            <DiagnosticModel />
          </motion.div>
        )}

        {activeTab === 'test' && (
          <motion.div key="test" {...tabMotion}>
            <DiagnosticTest
              phase={test.phase}
              currentIndex={test.currentIndex}
              totalQuestions={test.totalQuestions}
              currentQuestion={test.currentQuestion}
              results={test.results}
              showFollowUp={test.showFollowUp}
              selectedAnswer={test.selectedAnswer}
              followUpSelected={test.followUpSelected}
              isRevealed={test.isRevealed}
              startTest={test.startTest}
              beginQuestions={test.beginQuestions}
              selectAnswer={test.selectAnswer}
              selectFollowUp={test.selectFollowUp}
              nextQuestion={test.nextQuestion}
            />
          </motion.div>
        )}

        {activeTab === 'results' && (
          <motion.div key="results" {...tabMotion}>
            {test.phase === 'complete' && test.summaryData && (
              <ParentSummary data={test.summaryData} />
            )}
            <ReportPage />
          </motion.div>
        )}

        {activeTab === 'learn-more' && (
          <motion.div key="learn-more" {...tabMotion}>
            <LearningFlywheel />
            <PhaseRoadmap />
            <GenerationComparison />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onStartTest={handleStartTest} />
    </div>
  )
}
