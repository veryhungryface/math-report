import { motion } from 'framer-motion'
import type { ParentSummaryData } from '../../data/diagnosticQuestions'

interface ParentGuideProps {
  strengths: ParentSummaryData['strengths']
  weaknesses: ParentSummaryData['weaknesses']
  parentTips: string[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

function priorityLabel(n: number): string {
  return `${n}\uC21C\uC704`
}

export default function ParentGuide({ strengths, weaknesses, parentTips }: ParentGuideProps) {
  const sortedWeaknesses = [...weaknesses].sort((a, b) => a.priority - b.priority)

  return (
    <motion.div
      className="space-y-8"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* Strengths */}
      <motion.div variants={item} className="bg-navy-800/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">
          <span className="mr-2">{'\u2705'}</span>
          {'\uAC15\uC810'}
        </h3>
        {strengths.length > 0 ? (
          <ul className="space-y-3">
            {strengths.map((s, i) => (
              <motion.li
                key={i}
                variants={item}
                className="flex items-start gap-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4"
              >
                <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-400 font-bold">
                  {'\u2713'}
                </span>
                <div>
                  <p className="text-sm font-semibold text-emerald-300">{s.axis}</p>
                  <p className="text-sm text-navy-200 mt-0.5">{s.detail}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-navy-400 italic">
            {'\uBAA8\uB4E0 \uC601\uC5ED\uC5D0\uC11C \uBCF4\uAC15\uC774 \uD544\uC694\uD569\uB2C8\uB2E4'}
          </p>
        )}
      </motion.div>

      {/* Weaknesses */}
      <motion.div variants={item} className="bg-navy-800/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">
          <span className="mr-2">{'\uD83D\uDD34'}</span>
          {'\uAC1C\uC120 \uD544\uC694'}
        </h3>
        <ul className="space-y-3">
          {sortedWeaknesses.map((w, i) => {
            const isTop = w.priority === 1
            const borderColor = isTop
              ? 'border-red-500/30 bg-red-500/10'
              : 'border-amber-500/20 bg-amber-500/10'
            const badgeColor = isTop
              ? 'bg-red-500/20 text-red-400'
              : 'bg-amber-500/20 text-amber-400'
            const axisColor = isTop ? 'text-red-300' : 'text-amber-300'

            return (
              <motion.li
                key={i}
                variants={item}
                className={`flex items-start gap-3 rounded-lg border p-4 ${borderColor}`}
              >
                <span
                  className={`mt-0.5 flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-bold ${badgeColor}`}
                >
                  {priorityLabel(w.priority)}
                </span>
                <div>
                  <p className={`text-sm font-semibold ${axisColor}`}>{w.axis}</p>
                  <p className="text-sm text-navy-200 mt-0.5">{w.detail}</p>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </motion.div>

      {/* Parent Tips */}
      <motion.div variants={item} className="bg-navy-800/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">
          <span className="mr-2">{'\uD83D\uDCA1'}</span>
          {'\uD559\uBD80\uBAA8 \uAC00\uC774\uB4DC'}
        </h3>
        <ol className="space-y-3">
          {parentTips.map((tip, i) => (
            <motion.li
              key={i}
              variants={item}
              className="flex items-start gap-3 rounded-lg bg-blue-500/10 border border-blue-500/20 p-4"
            >
              <span className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-sm text-amber-300 font-bold">
                {i + 1}
              </span>
              <p className="text-sm text-navy-100 leading-relaxed">{tip}</p>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </motion.div>
  )
}
