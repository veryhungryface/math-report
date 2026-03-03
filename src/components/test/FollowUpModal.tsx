import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import FollowUpPanel from './FollowUpPanel'
import type { FollowUp } from '../../data/diagnosticQuestions'

interface FollowUpModalProps {
  open: boolean
  followUp: FollowUp | null
  followUpSelected: number | null
  selectFollowUp: (i: number) => void
  nextQuestion: () => void
}

export default function FollowUpModal({
  open,
  followUp,
  followUpSelected,
  selectFollowUp,
  nextQuestion,
}: FollowUpModalProps) {
  return createPortal(
    <AnimatePresence>
      {open && followUp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full max-w-md bg-navy-800 border border-navy-700/50 rounded-2xl p-6 shadow-2xl"
          >
            <FollowUpPanel
              followUp={followUp}
              followUpSelected={followUpSelected}
              selectFollowUp={selectFollowUp}
              nextQuestion={nextQuestion}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
