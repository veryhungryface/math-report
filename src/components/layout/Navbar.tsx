import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'

const links = [
  { label: '진단 모델', href: '#diagnosis' },
  { label: '진단 테스트', href: '#diagnostic-test' },
  { label: '리포트', href: '#report' },
  { label: '로드맵', href: '#roadmap' },
]

interface NavbarProps {
  onStartTest?: () => void
}

export default function Navbar({ onStartTest }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-navy-950/80 backdrop-blur-lg border-b border-navy-800/60'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-lg font-bold">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Math MRI
          </span>
        </a>

        <div className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={link.href === '#diagnostic-test' && onStartTest ? (e) => { e.preventDefault(); onStartTest(); document.getElementById('diagnostic-test')?.scrollIntoView({ behavior: 'smooth' }) } : undefined}
              className="text-sm text-navy-300 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
