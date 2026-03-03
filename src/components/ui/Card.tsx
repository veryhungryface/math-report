import { cn } from '../../lib/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-navy-800/80 backdrop-blur-md border border-navy-600/50 rounded-2xl p-6',
        'transition-all duration-300 hover:border-navy-500/70 hover:bg-navy-800/90',
        className
      )}
    >
      {children}
    </div>
  )
}
