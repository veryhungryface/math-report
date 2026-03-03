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
  // Q1 - 분수 덧셈 (통분) - 절차
  {
    id: 1,
    axis: 'procedure',
    axisLabel: '절차',
    topic: '분수 덧셈 (통분)',
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
        errorDiagnosis: '분모끼리 더하는 통분 절차 오류 의심',
        followUpQuestion: '\\dfrac{1}{2} + \\dfrac{1}{3} 을 계산하려면 공통 분모는?',
        followUpChoices: ['5', '6', '2', '3'],
        followUpAnswer: 1,
      },
      2: {
        errorDiagnosis: '분자를 통분 없이 그대로 더한 오류',
        followUpQuestion: '\\dfrac{1}{4} 를 분모 12로 바꾸면 분자는?',
        followUpChoices: ['1', '2', '3', '4'],
        followUpAnswer: 2,
      },
      3: {
        errorDiagnosis: '통분은 했으나 분자 계산 오류',
        followUpQuestion: '\\dfrac{8}{12} + \\dfrac{3}{12} 의 분자는?',
        followUpChoices: ['8', '11', '12', '24'],
        followUpAnswer: 1,
      },
    },
  },
  // Q2 - 소수 나눗셈 - 개념
  {
    id: 2,
    axis: 'concept',
    axisLabel: '개념',
    topic: '소수 나눗셈',
    question: '3.6 \\div 0.4 = ?',
    choices: ['0.9', '9', '36', '90'],
    correctAnswer: 1,
    followUps: {
      0: {
        errorDiagnosis: '소수점 위치 이동 개념 부족',
        followUpQuestion: '0.4 \\times 10 = ?',
        followUpChoices: ['0.04', '0.4', '4', '40'],
        followUpAnswer: 2,
      },
      2: {
        errorDiagnosis: '소수점 제거 후 나눗셈 실수',
        followUpQuestion: '36 \\div 4 = ?',
        followUpChoices: ['4', '8', '9', '12'],
        followUpAnswer: 2,
      },
      3: {
        errorDiagnosis: '자릿수 이동 과잉 적용',
        followUpQuestion: '3.6 \\times 10 = ?',
        followUpChoices: ['0.36', '3.6', '36', '360'],
        followUpAnswer: 2,
      },
    },
  },
  // Q3 - 음수의 곱셈 (부호 규칙) - 개념
  {
    id: 3,
    axis: 'concept',
    axisLabel: '개념',
    topic: '음수의 곱셈',
    question: '(-3) \\times (-5) = ?',
    choices: ['-15', '-8', '8', '15'],
    correctAnswer: 3,
    followUps: {
      0: {
        errorDiagnosis: '음수×음수=양수 부호 규칙 미이해',
        followUpQuestion: '음수 \\times 음수의 결과 부호는?',
        followUpChoices: ['항상 음수', '항상 양수', '0', '알 수 없다'],
        followUpAnswer: 1,
      },
      1: {
        errorDiagnosis: '곱셈을 덧셈으로 혼동',
        followUpQuestion: '(-3) + (-5) = ?',
        followUpChoices: ['-8', '-2', '2', '8'],
        followUpAnswer: 0,
      },
      2: {
        errorDiagnosis: '곱셈을 덧셈 절댓값으로 혼동',
        followUpQuestion: '3 \\times 5 = ?',
        followUpChoices: ['8', '10', '15', '35'],
        followUpAnswer: 2,
      },
    },
  },
  // Q4 - 비례식 (문장제) - 표현
  {
    id: 4,
    axis: 'expression',
    axisLabel: '표현',
    topic: '비례식 (문장제)',
    question: '사과 5개에 2000원일 때, 사과 12개의 가격은?',
    choices: ['4000원', '4400원', '4800원', '6000원'],
    correctAnswer: 2,
    followUps: {
      0: {
        errorDiagnosis: '비례 관계 설정 오류 (2배로 잘못 계산)',
        followUpQuestion: '사과 1개의 가격은?\\ (5개에 2000원)',
        followUpChoices: ['200원', '300원', '400원', '500원'],
        followUpAnswer: 2,
      },
      1: {
        errorDiagnosis: '곱셈 계산 오류',
        followUpQuestion: '400 \\times 12 = ?',
        followUpChoices: ['4400', '4600', '4800', '5200'],
        followUpAnswer: 2,
      },
      3: {
        errorDiagnosis: '비례식을 반올림하여 근사 처리',
        followUpQuestion: '2000 \\div 5 의 정확한 값은?',
        followUpChoices: ['300', '400', '450', '500'],
        followUpAnswer: 1,
      },
    },
  },
  // Q5 - 일차방정식 - 절차
  {
    id: 5,
    axis: 'procedure',
    axisLabel: '절차',
    topic: '일차방정식',
    question: '2x + 5 = 13 일 때, x = ?',
    choices: ['3', '4', '9', '6'],
    correctAnswer: 1,
    followUps: {
      0: {
        errorDiagnosis: '양변 빼기 후 나눗셈 순서 오류',
        followUpQuestion: '13 - 5 = ?',
        followUpChoices: ['6', '7', '8', '9'],
        followUpAnswer: 2,
      },
      2: {
        errorDiagnosis: '이항 없이 바로 나누기 시도',
        followUpQuestion: '2x = 8 이면 x = ?',
        followUpChoices: ['2', '4', '6', '8'],
        followUpAnswer: 1,
      },
      3: {
        errorDiagnosis: '상수항 이항 오류 (13+5)',
        followUpQuestion: '방정식에서 +5를 이항하면 부호는?',
        followUpChoices: ['+5', '-5', '×5', '÷5'],
        followUpAnswer: 1,
      },
    },
  },
  // Q6 - 문장→식 전환 - 표현
  {
    id: 6,
    axis: 'expression',
    axisLabel: '표현',
    topic: '문장→식 전환',
    question: '"어떤 수의 3배에서 7을 빼면 20이다." 를 식으로 쓰면?',
    choices: [
      '3x - 7 = 20',
      '3(x - 7) = 20',
      'x \\times 3 + 7 = 20',
      '3x + 7 = 20',
    ],
    correctAnswer: 0,
    followUps: {
      1: {
        errorDiagnosis: '연산 순서(괄호) 적용 오류',
        followUpQuestion: '"3배에서 7을 빼면"에서 먼저 하는 연산은?',
        followUpChoices: ['빼기', '3배', '더하기', '나누기'],
        followUpAnswer: 1,
      },
      2: {
        errorDiagnosis: '"빼면"을 "더하면"으로 잘못 전환',
        followUpQuestion: '"A에서 B를 빼면"을 식으로 쓰면?',
        followUpChoices: ['A + B', 'A - B', 'B - A', 'A × B'],
        followUpAnswer: 1,
      },
      3: {
        errorDiagnosis: '빼기를 더하기로 전환 오류',
        followUpQuestion: '3x - 7 과 3x + 7 중 "빼면"에 맞는 것은?',
        followUpChoices: ['3x - 7', '3x + 7', '둘 다', '없다'],
        followUpAnswer: 0,
      },
    },
  },
  // Q7 - 분배법칙 전개 - 습관
  {
    id: 7,
    axis: 'habit',
    axisLabel: '습관',
    topic: '분배법칙 전개',
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
        errorDiagnosis: '분배법칙에서 상수항 누락 (3×4 생략)',
        followUpQuestion: '3 \\times 4 = ?',
        followUpChoices: ['7', '10', '12', '34'],
        followUpAnswer: 2,
      },
      2: {
        errorDiagnosis: '분배 대신 각 항에 더하기 적용',
        followUpQuestion: '분배법칙: a(b+c) = ?',
        followUpChoices: ['a+b+c', 'ab+c', 'ab+ac', 'a+bc'],
        followUpAnswer: 2,
      },
      3: {
        errorDiagnosis: 'x 항에 분배 누락',
        followUpQuestion: '3 \\times 2x = ?',
        followUpChoices: ['2x', '3x', '5x', '6x'],
        followUpAnswer: 3,
      },
    },
  },
  // Q8 - 삼각형 내각의 합 - 개념
  {
    id: 8,
    axis: 'concept',
    axisLabel: '개념',
    topic: '삼각형 내각의 합',
    question: '삼각형의 세 각이 50°,\\, 70°,\\, x° 일 때, x = ?',
    choices: ['40', '50', '60', '80'],
    correctAnswer: 2,
    followUps: {
      0: {
        errorDiagnosis: '내각의 합을 360°로 기억하는 오류',
        followUpQuestion: '삼각형의 세 내각의 합은?',
        followUpChoices: ['90°', '180°', '270°', '360°'],
        followUpAnswer: 1,
      },
      1: {
        errorDiagnosis: '뺄셈 계산 오류',
        followUpQuestion: '180 - 50 - 70 = ?',
        followUpChoices: ['40', '50', '60', '70'],
        followUpAnswer: 2,
      },
      3: {
        errorDiagnosis: '50+70 계산 오류 (100으로 잘못 계산)',
        followUpQuestion: '50 + 70 = ?',
        followUpChoices: ['100', '110', '120', '130'],
        followUpAnswer: 2,
      },
    },
  },
  // Q9 - 비율/백분율 - 전이
  {
    id: 9,
    axis: 'transfer',
    axisLabel: '전이',
    topic: '비율과 백분율',
    question: '학생 40명 중 14명이 안경을 쓴다면, 백분율은?',
    choices: ['14%', '28%', '35%', '40%'],
    correctAnswer: 2,
    followUps: {
      0: {
        errorDiagnosis: '비율 계산 없이 숫자 그대로 사용',
        followUpQuestion: '백분율은 어떤 수를 기준으로 나누나요?',
        followUpChoices: ['14', '40', '54', '100'],
        followUpAnswer: 1,
      },
      1: {
        errorDiagnosis: '14÷40 대신 14÷50으로 계산',
        followUpQuestion: '14 \\div 40 = ?',
        followUpChoices: ['0.28', '0.35', '0.40', '0.54'],
        followUpAnswer: 1,
      },
      3: {
        errorDiagnosis: '분모와 분자를 뒤바꿔 계산',
        followUpQuestion: '"40명 중 14명"을 분수로 쓰면?',
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
  // Q10 - 분수 포함 방정식 - 전략
  {
    id: 10,
    axis: 'strategy',
    axisLabel: '전략',
    topic: '분수 포함 방정식',
    question: '\\dfrac{x}{3} + 4 = 10 일 때, x = ?',
    choices: ['2', '6', '14', '18'],
    correctAnswer: 3,
    followUps: {
      0: {
        errorDiagnosis: '10-4 후 3으로 나누기 (역순 적용)',
        followUpQuestion: '\\dfrac{x}{3} = 6 이면 x = ?',
        followUpChoices: ['2', '3', '9', '18'],
        followUpAnswer: 3,
      },
      1: {
        errorDiagnosis: '×3 단계 누락',
        followUpQuestion: '\\dfrac{x}{3} = 6 을 풀려면 양변에?',
        followUpChoices: ['÷3', '×3', '+3', '-3'],
        followUpAnswer: 1,
      },
      2: {
        errorDiagnosis: '이항 부호 오류 (+4를 +4로 이항)',
        followUpQuestion: '+4를 이항하면 부호는?',
        followUpChoices: ['+4', '-4', '×4', '÷4'],
        followUpAnswer: 1,
      },
    },
  },
]

// ─── Parent Summary Generator ────────────────────────────
const axisNames: Record<AxisType, string> = {
  concept: '개념 이해',
  procedure: '절차 수행',
  expression: '표현 전환',
  strategy: '전략 선택',
  habit: '학습 습관',
  transfer: '전이 적용',
}

export function generateParentSummary(results: TestResult[]): ParentSummaryData {
  const correctCount = results.filter((r) => r.correct).length
  const percentage = Math.round((correctCount / results.length) * 100)

  // Determine traffic-light level
  let level: 'red' | 'yellow' | 'green'
  let headline: string
  if (percentage >= 80) {
    level = 'green'
    headline = '중학교 수학 준비가 잘 되어 있어요!'
  } else if (percentage >= 50) {
    level = 'yellow'
    headline = '기초는 있지만 몇 가지 보강이 필요해요'
  } else {
    level = 'red'
    headline = '핵심 기초부터 다시 짚어야 해요'
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
    concept: '교과서 개념 설명을 함께 읽고 "왜?"라고 질문해 주세요.',
    procedure: '계산 연습 시 풀이 과정을 소리 내어 말하게 해 주세요.',
    expression: '문장제 문제를 함께 읽고 "식으로 어떻게 쓸까?" 대화해 주세요.',
    strategy: '여러 풀이 방법을 비교해 보는 연습을 격려해 주세요.',
    habit: '매일 10분씩 꾸준히 연습하는 루틴을 만들어 주세요.',
    transfer: '일상생활 속 수학(장보기, 요리 등)을 함께 찾아보세요.',
  }

  const parentTips = weaknesses.slice(0, 3).map(
    (w) => {
      const axis = (Object.entries(axisNames) as [AxisType, string][]).find(([, v]) => v === w.axis)?.[0] as AxisType
      return tipMap[axis]
    }
  )

  // Fill to 3 tips if not enough
  if (parentTips.length < 3) {
    parentTips.push('하루 10분 수학 대화 시간을 만들어 보세요.')
  }
  if (parentTips.length < 3) {
    parentTips.push('틀린 문제를 벌이 아닌 배움의 기회로 격려해 주세요.')
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
