// Mock student data for the diagnostic report
export const mockStudent = {
  name: 'Doyun Kim',
  grade: 'Grade 6',
  diagnosisDate: '2026.02.15',
  scope: 'Middle School Readiness (Fractions/Decimals, Ratios, Basic Equations, Geometry)',
  totalItems: 25,
  timeSpent: '38 min',
}

export const readinessScore = {
  score: 67,
  maxScore: 100,
  status: 'warning' as const,
  statusLabel: 'Fair — Focused Remediation Needed',
  peerAverage: 71,
  percentile: 42,
}

export const riskAreas = [
  {
    rank: 1,
    severity: 'high' as const,
    title: 'Procedural Errors in Fraction/Decimal Operations',
    description: 'Missing sign-flip on transposition; unstable common-denominator steps',
    impact: 'Likely repeated failure in Grade 7 equations',
    recurrenceRate: 78,
    errorType: 'procedure' as const,
  },
  {
    rank: 2,
    severity: 'medium' as const,
    title: 'Word Problem → Equation Translation Failure',
    description: 'Missed conditions, difficulty assigning variables',
    impact: 'Weak response to short-answer items',
    recurrenceRate: 56,
    errorType: 'expression' as const,
  },
  {
    rank: 3,
    severity: 'low' as const,
    title: 'Sign / Parenthesis Habit Errors',
    description: 'Repeated mistakes with negatives and distributive law',
    impact: 'Frequency rises under time pressure',
    recurrenceRate: 38,
    errorType: 'habit' as const,
  },
]

export const sixAxes = [
  {
    id: 'concept' as const,
    nameKo: 'Concepts',
    nameEn: 'Concepts',
    description: 'Are there misconceptions or wrongly connected concept relations?',
    examples: ['Confusion about reciprocal in fraction division', 'Mixing negatives and absolute value'],
    color: '#3B82F6',
    icon: 'Brain',
  },
  {
    id: 'procedure' as const,
    nameKo: 'Procedures',
    nameEn: 'Procedures',
    description: 'Where do expression setup, transformation, and algebraic manipulation break?',
    examples: ['Missing sign-flip on transposition', 'Distributive law errors'],
    color: '#8B5CF6',
    icon: 'GitBranch',
  },
  {
    id: 'expression' as const,
    nameKo: 'Representation',
    nameEn: 'Representation',
    description: 'Failure translating sentences or diagrams into expressions?',
    examples: ['Missing word-problem conditions', 'Difficulty assigning variables'],
    color: '#EC4899',
    icon: 'MessageSquare',
  },
  {
    id: 'strategy' as const,
    nameKo: 'Strategy',
    nameEn: 'Strategy',
    description: 'Unsure which solution approach to pick?',
    examples: ['Proportion vs. equation choice', 'No backward-reasoning strategy'],
    color: '#F59E0B',
    icon: 'Compass',
  },
  {
    id: 'habit' as const,
    nameKo: 'Habits',
    nameEn: 'Habits',
    description: 'Recurring slips with signs, parentheses, units, or omitted conditions?',
    examples: ['Sign errors', 'Parenthesis mistakes', 'Missing units'],
    color: '#10B981',
    icon: 'RotateCcw',
  },
  {
    id: 'transfer' as const,
    nameKo: 'Transfer',
    nameEn: 'Transfer',
    description: 'Solves examples but collapses on variants or test-style items?',
    examples: ['Solves similar items but fails on mixed', 'Cannot apply to new contexts'],
    color: '#06B6D4',
    icon: 'Shuffle',
  },
]

export type AxisId = (typeof sixAxes)[number]['id']

export const sixAxisScores: Record<'before' | 'after', Record<AxisId, number>> = {
  before: {
    concept: 72,
    procedure: 45,
    expression: 48,
    strategy: 62,
    habit: 58,
    transfer: 32,
  },
  after: {
    concept: 85,
    procedure: 78,
    expression: 72,
    strategy: 75,
    habit: 80,
    transfer: 68,
  },
}

export const errorPatterns = [
  { category: 'Misconception', nameEn: 'Misconception', count: 4, percentage: 16, color: '#3B82F6' },
  { category: 'Procedural', nameEn: 'Procedural', count: 8, percentage: 32, color: '#8B5CF6' },
  { category: 'Representation', nameEn: 'Representation', count: 5, percentage: 20, color: '#EC4899' },
  { category: 'Strategy', nameEn: 'Strategy', count: 3, percentage: 12, color: '#F59E0B' },
  { category: 'Habit', nameEn: 'Habit', count: 3, percentage: 12, color: '#10B981' },
  { category: 'Transfer', nameEn: 'Transfer', count: 2, percentage: 8, color: '#06B6D4' },
]

export const prescriptionPlan = [
  {
    week: 1,
    focus: 'Procedural Correction',
    topic: 'Rebuild fraction/decimal procedures',
    scaffold: 'Example → Similar',
    dailyMinutes: 15,
    dailyItems: 12,
    priority: 'high' as const,
    color: '#EF4444',
  },
  {
    week: 2,
    focus: 'Procedural Depth',
    topic: 'Transposition & common-denominator variants',
    scaffold: 'Similar → Variant',
    dailyMinutes: 20,
    dailyItems: 15,
    priority: 'high' as const,
    color: '#F59E0B',
  },
  {
    week: 3,
    focus: 'Representation',
    topic: 'Word problem → equation translation',
    scaffold: 'Variant → Mixed',
    dailyMinutes: 20,
    dailyItems: 12,
    priority: 'medium' as const,
    color: '#3B82F6',
  },
  {
    week: 4,
    focus: 'Comprehensive Review',
    topic: 'Mixed test-style + re-diagnosis',
    scaffold: 'Comprehensive + Re-eval',
    dailyMinutes: 15,
    dailyItems: 20,
    priority: 'low' as const,
    color: '#10B981',
  },
]

export const skillBreakdown = [
  { skill: 'Fraction LCD / Reduction', score: 42, status: 'high' as const, errorCause: 'Procedural', priority: 1 },
  { skill: 'Decimal ↔ Fraction Conversion', score: 55, status: 'medium' as const, errorCause: 'Misconception', priority: 2 },
  { skill: 'Setting Up Proportions', score: 38, status: 'high' as const, errorCause: 'Representation', priority: 3 },
  { skill: 'Integer Arithmetic', score: 71, status: 'low' as const, errorCause: 'Habit', priority: 4 },
  { skill: 'Word-Problem Equation Setup', score: 48, status: 'medium' as const, errorCause: 'Strategy', priority: 5 },
  { skill: 'Basic Geometry Properties', score: 85, status: 'safe' as const, errorCause: '-', priority: null },
  { skill: 'Angles & Parallel Lines', score: 78, status: 'safe' as const, errorCause: '-', priority: null },
  { skill: 'Ratios & Percentages', score: 62, status: 'low' as const, errorCause: 'Transfer', priority: 6 },
]

export const competitorGenerations = [
  {
    gen: 1,
    label: 'Gen 1',
    title: 'Correct/Incorrect & Proficiency Estimation',
    examples: 'Classting AI, etc.',
    input: 'Correct/incorrect responses',
    output: 'Probability prediction, recommendations',
    limitation: 'Only asks "will they get it right?"',
  },
  {
    gen: 2,
    label: 'Gen 2',
    title: 'Weak-Type / Wrong-Answer Management',
    examples: 'MathFlat, etc.',
    input: 'Accuracy + item type',
    output: 'Weak types, wrong-answer worksheets',
    limitation: 'Only asks "where?"',
  },
  {
    gen: 3,
    label: 'Gen 3',
    title: 'Solution Review / Feedback',
    examples: 'Mathking, Qanda',
    input: 'Solution process',
    output: 'Review, step-by-step feedback',
    limitation: 'Only "corrects"',
  },
  {
    gen: 4,
    label: 'Gen 4',
    title: 'Error Cause / State Diagnosis',
    examples: 'Math MRI',
    input: 'Solution + behavior + process',
    output: 'Root cause decomposition, prescription, prediction',
    limitation: null,
    highlight: true,
  },
]

export const phaseRoadmap = [
  {
    phase: 1,
    label: 'Phase 1',
    period: 'Now',
    title: 'Precision Diagnostic MVP',
    goal: 'Prove "weak points are accurate"',
    kpi: 'Re-eval improvement rate, prediction accuracy',
    active: true,
  },
  {
    phase: 2,
    label: 'Phase 2',
    period: '6 months',
    title: 'Auto-Generated Prescriptions',
    goal: 'Prove "gain per study hour"',
    kpi: 'Study efficiency KPI',
    active: false,
  },
  {
    phase: 3,
    label: 'Phase 3',
    period: '12 months',
    title: 'Middle School Score Boost Program',
    goal: 'Prove "test score improvement"',
    kpi: 'Internal / short-answer score gains',
    active: false,
  },
  {
    phase: 4,
    label: 'Phase 4',
    period: '18 months',
    title: 'B2B Platform',
    goal: 'Expand into content/assessment infrastructure',
    kpi: 'Academy / school adoption count',
    active: false,
  },
  {
    phase: 5,
    label: 'Phase 5',
    period: '24+ months',
    title: 'AI Data Company',
    goal: 'Data network effects',
    kpi: 'Recommendation accuracy, content automation',
    active: false,
  },
]
