// Mock student data for the diagnostic report
export const mockStudent = {
  name: '김도윤',
  grade: '초등 6학년',
  diagnosisDate: '2026.02.15',
  scope: '중등 수학 준비도 (분수·소수, 비율, 방정식 기초, 도형)',
  totalItems: 25,
  timeSpent: '38분',
}

export const readinessScore = {
  score: 67,
  maxScore: 100,
  status: 'warning' as const,
  statusLabel: '보통 - 집중 보완 필요',
  peerAverage: 71,
  percentile: 42,
}

export const riskAreas = [
  {
    rank: 1,
    severity: 'high' as const,
    title: '분수·소수 연산의 절차 오류',
    description: '이항 시 부호 변환 누락, 통분 절차 불안정',
    impact: '중1 방정식에서 반복 실패 예상',
    recurrenceRate: 78,
    errorType: 'procedure' as const,
  },
  {
    rank: 2,
    severity: 'medium' as const,
    title: '문장제 → 수식 전환 실패',
    description: '조건 해석 누락, 변수 설정 어려움',
    impact: '서술형 문항 대응력 부족',
    recurrenceRate: 56,
    errorType: 'expression' as const,
  },
  {
    rank: 3,
    severity: 'low' as const,
    title: '부호·괄호 실수 습관',
    description: '음수 계산, 분배법칙 괄호 처리 반복 실수',
    impact: '시간 압박 시 빈도 증가',
    recurrenceRate: 38,
    errorType: 'habit' as const,
  },
]

export const sixAxes = [
  {
    id: 'concept' as const,
    nameKo: '개념',
    nameEn: 'Concepts',
    description: '오개념이 있는가, 개념 관계를 잘못 연결하는가',
    examples: ['분수 나눗셈의 역수 개념 혼동', '음수와 절대값 혼합'],
    color: '#3B82F6',
    icon: 'Brain',
  },
  {
    id: 'procedure' as const,
    nameKo: '절차',
    nameEn: 'Procedures',
    description: '식 세우기, 변형, 대수 조작이 어디서 끊기는가',
    examples: ['이항 시 부호 변환 누락', '분배법칙 적용 오류'],
    color: '#8B5CF6',
    icon: 'GitBranch',
  },
  {
    id: 'expression' as const,
    nameKo: '표현',
    nameEn: 'Representation',
    description: '문장을 식으로, 그림을 식으로 바꾸는 데 실패하는가',
    examples: ['문장제 조건 해석 누락', '변수 설정 어려움'],
    color: '#EC4899',
    icon: 'MessageSquare',
  },
  {
    id: 'strategy' as const,
    nameKo: '전략',
    nameEn: 'Strategy',
    description: '어떤 풀이 접근을 선택해야 하는지 모르는가',
    examples: ['비례식 vs 방정식 선택 실패', '역추적 전략 부재'],
    color: '#F59E0B',
    icon: 'Compass',
  },
  {
    id: 'habit' as const,
    nameKo: '습관',
    nameEn: 'Habits',
    description: '부호, 괄호, 단위, 조건 누락 같은 반복 실수가 있는가',
    examples: ['부호 오류', '괄호 실수', '단위 누락'],
    color: '#10B981',
    icon: 'RotateCcw',
  },
  {
    id: 'transfer' as const,
    nameKo: '전이',
    nameEn: 'Transfer',
    description: '예제는 풀지만 변형 문제나 시험형 문제에서 무너지는가',
    examples: ['유사 문제는 풀지만 혼합형에서 실패', '새 맥락 적용 불가'],
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
  { category: '오개념', nameEn: 'Misconception', count: 4, percentage: 16, color: '#3B82F6' },
  { category: '절차 오류', nameEn: 'Procedural', count: 8, percentage: 32, color: '#8B5CF6' },
  { category: '표현 전환', nameEn: 'Representation', count: 5, percentage: 20, color: '#EC4899' },
  { category: '전략 부재', nameEn: 'Strategy', count: 3, percentage: 12, color: '#F59E0B' },
  { category: '습관 실수', nameEn: 'Habit', count: 3, percentage: 12, color: '#10B981' },
  { category: '전이 실패', nameEn: 'Transfer', count: 2, percentage: 8, color: '#06B6D4' },
]

export const prescriptionPlan = [
  {
    week: 1,
    focus: '절차 교정',
    topic: '분수/소수 연산 절차 재구축',
    scaffold: '예제 → 유사',
    dailyMinutes: 15,
    dailyItems: 12,
    priority: 'high' as const,
    color: '#EF4444',
  },
  {
    week: 2,
    focus: '절차 심화',
    topic: '이항·통분 변형 문항 훈련',
    scaffold: '유사 → 변형',
    dailyMinutes: 20,
    dailyItems: 15,
    priority: 'high' as const,
    color: '#F59E0B',
  },
  {
    week: 3,
    focus: '표현 전환',
    topic: '문장제 → 식 조건 해석 훈련',
    scaffold: '변형 → 혼합',
    dailyMinutes: 20,
    dailyItems: 12,
    priority: 'medium' as const,
    color: '#3B82F6',
  },
  {
    week: 4,
    focus: '종합 평가',
    topic: '혼합 시험형 + 재진단',
    scaffold: '종합 + 재평가',
    dailyMinutes: 15,
    dailyItems: 20,
    priority: 'low' as const,
    color: '#10B981',
  },
]

export const skillBreakdown = [
  { skill: '분수 통분/약분', score: 42, status: 'high' as const, errorCause: '절차 오류', priority: 1 },
  { skill: '소수 ↔ 분수 변환', score: 55, status: 'medium' as const, errorCause: '개념 혼동', priority: 2 },
  { skill: '비례식 세우기', score: 38, status: 'high' as const, errorCause: '표현 전환 실패', priority: 3 },
  { skill: '정수의 사칙연산', score: 71, status: 'low' as const, errorCause: '습관 실수', priority: 4 },
  { skill: '식 세우기(문장제)', score: 48, status: 'medium' as const, errorCause: '전략 부재', priority: 5 },
  { skill: '기본 도형 성질', score: 85, status: 'safe' as const, errorCause: '-', priority: null },
  { skill: '각도와 평행', score: 78, status: 'safe' as const, errorCause: '-', priority: null },
  { skill: '비율과 백분율', score: 62, status: 'low' as const, errorCause: '전이 실패', priority: 6 },
]

export const competitorGenerations = [
  {
    gen: 1,
    label: '1세대',
    title: '정오답/숙련도 추정',
    examples: '클래스팅 AI 등',
    input: '정오답 반응',
    output: '정답 확률 예측, 추천',
    limitation: '"맞힐까?"만 봄',
  },
  {
    gen: 2,
    label: '2세대',
    title: '취약유형/오답관리',
    examples: '매쓰플랫 등',
    input: '정답률 + 유형',
    output: '취약 유형, 오답 학습지',
    limitation: '"어디?"만 봄',
  },
  {
    gen: 3,
    label: '3세대',
    title: '풀이 첨삭/피드백',
    examples: '수학대왕, 콴다',
    input: '풀이 과정',
    output: '첨삭, 단계별 피드백',
    limitation: '"고쳐줌"만 함',
  },
  {
    gen: 4,
    label: '4세대',
    title: '오류 원인/상태 진단',
    examples: 'Math MRI',
    input: '풀이 + 행동 + 과정',
    output: '상태 원인 분해, 처방, 예측',
    limitation: null,
    highlight: true,
  },
]

export const phaseRoadmap = [
  {
    phase: 1,
    label: 'Phase 1',
    period: '현재',
    title: '정밀진단 MVP',
    goal: '"취약점이 정확하다"를 증명',
    kpi: '재평가 향상률, 예측 정확도',
    active: true,
  },
  {
    phase: 2,
    label: 'Phase 2',
    period: '6개월',
    title: '처방형 자동 구성',
    goal: '"학습시간 대비 향상"을 증명',
    kpi: '학습효율 KPI',
    active: false,
  },
  {
    phase: 3,
    label: 'Phase 3',
    period: '12개월',
    title: '중등 성적상승 프로그램',
    goal: '"시험 점수 개선"을 증명',
    kpi: '내신/서술형 점수 개선',
    active: false,
  },
  {
    phase: 4,
    label: 'Phase 4',
    period: '18개월',
    title: 'B2B 플랫폼화',
    goal: '콘텐츠/평가 인프라로 확장',
    kpi: '학원/학교 도입 수',
    active: false,
  },
  {
    phase: 5,
    label: 'Phase 5',
    period: '24개월+',
    title: 'AI 데이터 기업',
    goal: '데이터 네트워크 효과',
    kpi: '추천 정확도, 콘텐츠 자동화',
    active: false,
  },
]
