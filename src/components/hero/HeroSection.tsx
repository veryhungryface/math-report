import { motion } from 'framer-motion'

interface HeroSectionProps {
  onStartTest: () => void
}

export default function HeroSection({ onStartTest }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-navy-950 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #3B82F6 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6"
        >
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Math MRI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl text-navy-200 font-medium mb-3"
        >
          Precision diagnosis. Root-cause analysis. Higher scores.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          className="text-sm md:text-base text-navy-400 tracking-wide mb-10"
        >
          Precision Diagnostic Engine for Math Learning
        </motion.p>

        <motion.button
          onClick={onStartTest}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block px-8 py-3.5 rounded-full font-semibold text-white
            bg-gradient-to-r from-blue-500 to-cyan-500
            shadow-[0_0_24px_rgba(59,130,246,0.35)]
            hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]
            transition-shadow duration-300"
        >
          Start Diagnostic Test
        </motion.button>
      </div>
    </section>
  )
}
