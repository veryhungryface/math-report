import { useMemo } from 'react'
import katex from 'katex'

interface MathRendererProps {
  math: string
  displayMode?: boolean
  className?: string
}

export default function MathRenderer({ math, displayMode = false, className = '' }: MathRendererProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        throwOnError: false,
        displayMode,
        strict: false,
      })
    } catch {
      return math
    }
  }, [math, displayMode])

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
