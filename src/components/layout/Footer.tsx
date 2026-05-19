import { motion } from 'framer-motion'

interface FooterProps {
  onStartTest?: () => void
}

export default function Footer({ onStartTest }: FooterProps) {
  return (
    <footer className="bg-navy-900 border-t border-navy-800/60">
      {/* CTA section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          A new start to learning, powered by Math MRI
        </h2>
        <motion.button
          onClick={onStartTest}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block px-10 py-4 rounded-full font-semibold text-white text-lg
            bg-gradient-to-r from-blue-500 to-cyan-500
            shadow-[0_0_24px_rgba(59,130,246,0.35)]
            hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]
            transition-shadow duration-300"
        >
          Start Now
        </motion.button>
      </div>

      {/* Copyright */}
      <div className="border-t border-navy-800/40 py-6 text-center">
        <p className="text-navy-500 text-sm">
          &copy; 2026 Math MRI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
