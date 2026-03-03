import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { cn } from '../../lib/cn'

export type TabId = 'intro' | 'test' | 'results' | 'learn-more'

interface Tab {
  id: TabId
  label: string
}

const tabs: Tab[] = [
  { id: 'intro', label: '소개' },
  { id: 'test', label: '진단 테스트' },
  { id: 'results', label: '진단 결과' },
  { id: 'learn-more', label: '더 알아보기' },
]

interface TabBarProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  testCompleted: boolean
}

export default function TabBar({ activeTab, onTabChange, testCompleted }: TabBarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-950/80 backdrop-blur-lg border-b border-navy-800/60">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-1">
        <a href="#" onClick={(e) => { e.preventDefault(); onTabChange('intro') }} className="text-lg font-bold mr-6 flex-shrink-0">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Math MRI
          </span>
        </a>

        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const isLocked = tab.id === 'results' && !testCompleted
            const isDisabled = isLocked

            return (
              <button
                key={tab.id}
                onClick={() => !isDisabled && onTabChange(tab.id)}
                disabled={isDisabled}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'text-white'
                    : isDisabled
                      ? 'text-navy-600 cursor-not-allowed'
                      : 'text-navy-400 hover:text-navy-200',
                )}
              >
                <span className="flex items-center gap-1.5">
                  {tab.label}
                  {isLocked && <Lock className="w-3.5 h-3.5" />}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
