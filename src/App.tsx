import Navbar from './components/layout/Navbar'
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

export default function App() {
  const test = useTestState()

  return (
    <div className="min-h-screen bg-navy-950 text-navy-100">
      <Navbar onStartTest={test.startTest} />
      <HeroSection />
      <ProblemStatement />
      <DiagnosticModel />
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
      {test.phase === 'complete' && test.summaryData && (
        <ParentSummary data={test.summaryData} />
      )}
      <ReportPage />
      <LearningFlywheel />
      <PhaseRoadmap />
      <GenerationComparison />
      <Footer />
    </div>
  )
}
