// ─── Types ───────────────────────────────────────────────
export type AxisType = 'concept' | 'procedure' | 'expression' | 'strategy' | 'habit' | 'transfer'

export interface FollowUp {
  errorDiagnosis: string
  followUpQuestion: string        // KaTeX math string
  followUpChoices: string[]
  followUpAnswer: number          // 0-based index
}

export interface DiagnosticQuestion {
  id: number
  axis: AxisType
  axisLabel: string
  topic: string
  question: string                // KaTeX math string
  choices: string[]
  correctAnswer: number           // 0-based index
  followUps: Record<number, FollowUp>  // keyed by wrong-choice index
}

export interface TestResult {
  questionId: number
  correct: boolean
  selectedAnswer: number
  followUpCorrect?: boolean
  followUpSelected?: number
  errorDiagnosis?: string
}

export interface ParentSummaryData {
  score: number
  total: number
  percentage: number
  level: 'red' | 'yellow' | 'green'
  headline: string
  riskCount: number
  estimatedWeeks: number
  strengths: { axis: string; detail: string }[]
  weaknesses: { axis: string; detail: string; priority: number }[]
  parentTips: string[]
}

// ─── 10 Questions ────────────────────────────────────────
export const diagnosticQuestions: DiagnosticQuestion[] = [
  // Q1 - Adding fractions (common denominators) - procedure
  {
    id: 1,
    axis: 'procedure',
    axisLabel: 'Procedure',
    topic: 'Adding Fractions (Common Denominators)',
    question: '\\dfrac{2}{3} + \\dfrac{1}{4} = ?',
    choices: [
      '\\dfrac{11}{12}',
      '\\dfrac{3}{7}',
      '\\dfrac{3}{12}',
      '\\dfrac{8}{12}',
    ],
    correctAnswer: 0,
    followUps: {
      1: {
        errorDiagnosis: 'Likely error: adding denominators instead of finding a common denominator',
        followUpQuestion: 'To compute \\dfrac{1}{2} + \\dfrac{1}{3}, what is the common denominator?',
        followUpChoices: ['5', '6', '2', '3'],
        followUpAnswer: 1,
      },
      2: {
        errorDiagnosis: 'Added numerators without first finding a common denominator',
        followUpQuestion: 'Rewrite \\dfrac{1}{4} with denominator 12. The new numerator is?',
        followUpChoices: ['1', '2', '3', '4'],
        followUpAnswer: 2,
      },
      3: {
        errorDiagnosis: 'Found a common denominator but made an error adding numerators',
        followUpQuestion: 'The numerator of \\dfrac{8}{12} + \\dfrac{3}{12} is?',
        followUpChoices: ['8', '11', '12', '24'],
        followUpAnswer: 1,
      },
    },
  },
  // Q2 - Decimal division - concept
  {
    id: 2,
    axis: 'concept',
    axisLabel: 'Concept',
    topic: 'Decimal Division',
    question: '3.6 \\div 0.4 = ?',
    choices: ['0.9', '9', '36', '90'],
    correctAnswer: 1,
    followUps: {
      0: {
        errorDiagnosis: 'Weak understanding of shifting the decimal point',
        followUpQuestion: '0.4 \\times 10 = ?',
        followUpChoices: ['0.04', '0.4', '4', '40'],
        followUpAnswer: 2,
      },
      2: {
        errorDiagnosis: 'Removed the decimal but then divided incorrectly',
        followUpQuestion: '36 \\div 4 = ?',
        followUpChoices: ['4', '8', '9', '12'],
        followUpAnswer: 2,
      },
      3: {
        errorDiagnosis: 'Shifted the decimal too far (over-applied)',
        followUpQuestion: '3.6 \\times 10 = ?',
        followUpChoices: ['0.36', '3.6', '36', '360'],
        followUpAnswer: 2,
      },
    },
  },
  // Q3 - Multiplication with negatives (sign rules) - concept
  {
    id: 3,
    axis: 'concept',
    axisLabel: 'Concept',
    topic: 'Multiplying Negative Numbers',
    question: '(-3) \\times (-5) = ?',
    choices: ['-15', '-8', '8', '15'],
    correctAnswer: 3,
    followUps: {
      0: {
        errorDiagnosis: 'Sign rule misunderstanding: negative × negative = positive',
        followUpQuestion: 'The sign of (negative) \\times (negative) is?',
        followUpChoices: ['Always negative', 'Always positive', 'Zero', 'Cannot tell'],
        followUpAnswer: 1,
      },
      1: {
        errorDiagnosis: 'Confused multiplication with addition',
        followUpQuestion: '(-3) + (-5) = ?',
        followUpChoices: ['-8', '-2', '2', '8'],
        followUpAnswer: 0,
      },
      2: {
        errorDiagnosis: 'Mixed up multiplication with absolute-value addition',
        followUpQuestion: '3 \\times 5 = ?',
        followUpChoices: ['8', '10', '15', '35'],
        followUpAnswer: 2,
      },
    },
  },
  // Q4 - Proportions (word problem) - expression
  {
    id: 4,
    axis: 'expression',
    axisLabel: 'Representation',
    topic: 'Proportions (Word Problem)',
    question: 'If 5 apples cost \\$2.00, how much do 12 apples cost?',
    choices: ['\\$4.00', '\\$4.40', '\\$4.80', '\\$6.00'],
    correctAnswer: 2,
    followUps: {
      0: {
        errorDiagnosis: 'Set up the proportion wrong (doubled instead of scaling)',
        followUpQuestion: 'What is the price of one apple? (5 apples cost \\$2.00)',
        followUpChoices: ['\\$0.20', '\\$0.30', '\\$0.40', '\\$0.50'],
        followUpAnswer: 2,
      },
      1: {
        errorDiagnosis: 'Multiplication error',
        followUpQuestion: '0.40 \\times 12 = ?',
        followUpChoices: ['4.40', '4.60', '4.80', '5.20'],
        followUpAnswer: 2,
      },
      3: {
        errorDiagnosis: 'Rounded the proportion to an approximate value',
        followUpQuestion: 'The exact value of 2.00 \\div 5 is?',
        followUpChoices: ['0.30', '0.40', '0.45', '0.50'],
        followUpAnswer: 1,
      },
    },
  },
  // Q5 - Linear equations - procedure
  {
    id: 5,
    axis: 'procedure',
    axisLabel: 'Procedure',
    topic: 'Linear Equations',
    question: 'If 2x + 5 = 13, then x = ?',
    choices: ['3', '4', '9', '6'],
    correctAnswer: 1,
    followUps: {
      0: {
        errorDiagnosis: 'Wrong order: divided before subtracting from both sides',
        followUpQuestion: '13 - 5 = ?',
        followUpChoices: ['6', '7', '8', '9'],
        followUpAnswer: 2,
      },
      2: {
        errorDiagnosis: 'Divided without first moving the constant term',
        followUpQuestion: 'If 2x = 8, then x = ?',
        followUpChoices: ['2', '4', '6', '8'],
        followUpAnswer: 1,
      },
      3: {
        errorDiagnosis: 'Sign error when moving the constant term (used 13+5)',
        followUpQuestion: 'When +5 is moved to the other side, the sign becomes?',
        followUpChoices: ['+5', '-5', '×5', '÷5'],
        followUpAnswer: 1,
      },
    },
  },
  // Q6 - Translating words to equations - expression
  {
    id: 6,
    axis: 'expression',
    axisLabel: 'Representation',
    topic: 'Translating Words to Equations',
    question: '"Seven less than three times a number equals 20." Which equation matches?',
    choices: [
      '3x - 7 = 20',
      '3(x - 7) = 20',
      'x \\times 3 + 7 = 20',
      '3x + 7 = 20',
    ],
    correctAnswer: 0,
    followUps: {
      1: {
        errorDiagnosis: 'Order-of-operations error (misplaced parentheses)',
        followUpQuestion: 'In "three times a number, minus 7", which operation comes first?',
        followUpChoices: ['Subtraction', 'Multiplying by 3', 'Addition', 'Division'],
        followUpAnswer: 1,
      },
      2: {
        errorDiagnosis: 'Confused "minus" with "plus"',
        followUpQuestion: '"A minus B" written as an expression is?',
        followUpChoices: ['A + B', 'A - B', 'B - A', 'A × B'],
        followUpAnswer: 1,
      },
      3: {
        errorDiagnosis: 'Replaced subtraction with addition',
        followUpQuestion: 'Between 3x - 7 and 3x + 7, which matches "minus 7"?',
        followUpChoices: ['3x - 7', '3x + 7', 'Both', 'Neither'],
        followUpAnswer: 0,
      },
    },
  },
  // Q7 - Distributive property - habit
  {
    id: 7,
    axis: 'habit',
    axisLabel: 'Habit',
    topic: 'Distributive Property',
    question: '3(2x + 4) = ?',
    choices: [
      '6x + 12',
      '6x + 4',
      '5x + 7',
      '2x + 12',
    ],
    correctAnswer: 0,
    followUps: {
      1: {
        errorDiagnosis: 'Forgot to distribute to the constant term (skipped 3×4)',
        followUpQuestion: '3 \\times 4 = ?',
        followUpChoices: ['7', '10', '12', '34'],
        followUpAnswer: 2,
      },
      2: {
        errorDiagnosis: 'Added terms instead of distributing',
        followUpQuestion: 'Distributive property: a(b+c) = ?',
        followUpChoices: ['a+b+c', 'ab+c', 'ab+ac', 'a+bc'],
        followUpAnswer: 2,
      },
      3: {
        errorDiagnosis: 'Forgot to distribute to the x-term',
        followUpQuestion: '3 \\times 2x = ?',
        followUpChoices: ['2x', '3x', '5x', '6x'],
        followUpAnswer: 3,
      },
    },
  },
  // Q8 - Triangle angle sum - concept
  {
    id: 8,
    axis: 'concept',
    axisLabel: 'Concept',
    topic: 'Triangle Angle Sum',
    question: 'The three angles of a triangle are 50°,\\, 70°,\\, x°. Find x.',
    choices: ['40', '50', '60', '80'],
    correctAnswer: 2,
    followUps: {
      0: {
        errorDiagnosis: 'Mis-remembered the angle sum as 360°',
        followUpQuestion: 'The sum of the interior angles of a triangle is?',
        followUpChoices: ['90°', '180°', '270°', '360°'],
        followUpAnswer: 1,
      },
      1: {
        errorDiagnosis: 'Subtraction error',
        followUpQuestion: '180 - 50 - 70 = ?',
        followUpChoices: ['40', '50', '60', '70'],
        followUpAnswer: 2,
      },
      3: {
        errorDiagnosis: 'Addition error: 50+70 computed as 100',
        followUpQuestion: '50 + 70 = ?',
        followUpChoices: ['100', '110', '120', '130'],
        followUpAnswer: 2,
      },
    },
  },
  // Q9 - Ratios and percentages - transfer
  {
    id: 9,
    axis: 'transfer',
    axisLabel: 'Transfer',
    topic: 'Ratios and Percentages',
    question: 'If 14 of 40 students wear glasses, what percentage is that?',
    choices: ['14%', '28%', '35%', '40%'],
    correctAnswer: 2,
    followUps: {
      0: {
        errorDiagnosis: 'Used the raw count without converting to a ratio',
        followUpQuestion: 'A percentage is calculated relative to which number?',
        followUpChoices: ['14', '40', '54', '100'],
        followUpAnswer: 1,
      },
      1: {
        errorDiagnosis: 'Divided by 50 instead of 40',
        followUpQuestion: '14 \\div 40 = ?',
        followUpChoices: ['0.28', '0.35', '0.40', '0.54'],
        followUpAnswer: 1,
      },
      3: {
        errorDiagnosis: 'Swapped numerator and denominator',
        followUpQuestion: 'Write "14 out of 40" as a fraction.',
        followUpChoices: [
          '\\dfrac{40}{14}',
          '\\dfrac{14}{40}',
          '\\dfrac{14}{54}',
          '\\dfrac{40}{54}',
        ],
        followUpAnswer: 1,
      },
    },
  },
  // Q10 - Equations with fractions - strategy
  {
    id: 10,
    axis: 'strategy',
    axisLabel: 'Strategy',
    topic: 'Equations with Fractions',
    question: 'If \\dfrac{x}{3} + 4 = 10, then x = ?',
    choices: ['2', '6', '14', '18'],
    correctAnswer: 3,
    followUps: {
      0: {
        errorDiagnosis: 'Reversed the order: divided by 3 after subtracting',
        followUpQuestion: 'If \\dfrac{x}{3} = 6, then x = ?',
        followUpChoices: ['2', '3', '9', '18'],
        followUpAnswer: 3,
      },
      1: {
        errorDiagnosis: 'Forgot to multiply by 3',
        followUpQuestion: 'To solve \\dfrac{x}{3} = 6, do what to both sides?',
        followUpChoices: ['÷3', '×3', '+3', '-3'],
        followUpAnswer: 1,
      },
      2: {
        errorDiagnosis: 'Sign error when moving the constant (+4 moved as +4)',
        followUpQuestion: 'When +4 is moved to the other side, the sign becomes?',
        followUpChoices: ['+4', '-4', '×4', '÷4'],
        followUpAnswer: 1,
      },
    },
  },
]

// ─── Parent Summary Generator ────────────────────────────
const axisNames: Record<AxisType, string> = {
  concept: 'Concepts',
  procedure: 'Procedures',
  expression: 'Representation',
  strategy: 'Strategy',
  habit: 'Habits',
  transfer: 'Transfer',
}

export function generateParentSummary(results: TestResult[]): ParentSummaryData {
  const correctCount = results.filter((r) => r.correct).length
  const percentage = Math.round((correctCount / results.length) * 100)

  // Determine traffic-light level
  let level: 'red' | 'yellow' | 'green'
  let headline: string
  if (percentage >= 80) {
    level = 'green'
    headline = 'Well prepared for middle-school math!'
  } else if (percentage >= 50) {
    level = 'yellow'
    headline = 'A solid foundation, but a few areas need shoring up'
  } else {
    level = 'red'
    headline = 'Core fundamentals need to be revisited'
  }

  // Group by axis
  const axisSummary: Record<AxisType, { correct: number; total: number }> = {
    concept: { correct: 0, total: 0 },
    procedure: { correct: 0, total: 0 },
    expression: { correct: 0, total: 0 },
    strategy: { correct: 0, total: 0 },
    habit: { correct: 0, total: 0 },
    transfer: { correct: 0, total: 0 },
  }

  results.forEach((r) => {
    const q = diagnosticQuestions.find((q) => q.id === r.questionId)!
    axisSummary[q.axis].total++
    if (r.correct) axisSummary[q.axis].correct++
  })

  // Strengths: axes with 100% correct
  const strengths = (Object.entries(axisSummary) as [AxisType, { correct: number; total: number }][])
    .filter(([, v]) => v.total > 0 && v.correct === v.total)
    .map(([axis]) => {
      const q = diagnosticQuestions.find((q) => q.axis === axis)!
      return { axis: axisNames[axis], detail: q.topic }
    })

  // Weaknesses: axes with any wrong, sorted by most wrong
  const weaknesses = (Object.entries(axisSummary) as [AxisType, { correct: number; total: number }][])
    .filter(([, v]) => v.total > 0 && v.correct < v.total)
    .sort(([, a], [, b]) => (a.correct / a.total) - (b.correct / b.total))
    .map(([axis], i) => {
      const q = diagnosticQuestions.find((q) => q.axis === axis)!
      return { axis: axisNames[axis], detail: q.topic, priority: i + 1 }
    })

  const riskCount = weaknesses.length
  const estimatedWeeks = riskCount <= 1 ? 2 : riskCount <= 3 ? 4 : 6

  // Parent tips based on weaknesses
  const tipMap: Record<AxisType, string> = {
    concept: 'Read textbook explanations together and ask "why?" as you go.',
    procedure: 'Have your child say each step aloud while practicing calculations.',
    expression: 'Read word problems together and talk through how to set up the equation.',
    strategy: 'Encourage comparing multiple solution approaches for the same problem.',
    habit: 'Build a routine of 10 minutes of consistent daily practice.',
    transfer: 'Look for everyday math together — grocery shopping, cooking, and more.',
  }

  const parentTips = weaknesses.slice(0, 3).map(
    (w) => {
      const axis = (Object.entries(axisNames) as [AxisType, string][]).find(([, v]) => v === w.axis)?.[0] as AxisType
      return tipMap[axis]
    }
  )

  // Fill to 3 tips if not enough
  if (parentTips.length < 3) {
    parentTips.push('Carve out 10 minutes a day to talk about math together.')
  }
  if (parentTips.length < 3) {
    parentTips.push('Treat mistakes as learning opportunities, not something to punish.')
  }

  return {
    score: correctCount,
    total: results.length,
    percentage,
    level,
    headline,
    riskCount,
    estimatedWeeks,
    strengths,
    weaknesses,
    parentTips,
  }
}
