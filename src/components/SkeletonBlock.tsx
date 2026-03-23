import { cn } from '@/lib/utils'

interface SkeletonBlockProps {
  className?: string
}

export function SkeletonBlock({ className }: SkeletonBlockProps) {
  return (
    <div
      className={cn('rounded-lg animate-pulse', className)}
      style={{ backgroundColor: '#243456' }}
    />
  )
}
