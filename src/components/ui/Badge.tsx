import { cn } from '../../lib/cn'

type BadgeVariant = 'high' | 'medium' | 'low' | 'safe'

interface BadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  high: 'bg-red-500/20 text-red-400 border-red-500/30',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  safe: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

export default function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
