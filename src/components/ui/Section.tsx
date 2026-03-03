import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../lib/cn'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export default function Section({ children, className, id }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={cn('max-w-7xl mx-auto px-6 py-24', className)}
    >
      {children}
    </motion.section>
  )
}
