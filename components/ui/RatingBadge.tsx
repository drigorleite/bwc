import { cn, getRatingColor } from '@/lib/utils'

interface Props {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export default function RatingBadge({ rating, size = 'md', showLabel, className }: Props) {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5 font-bold',
  }[size]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md font-semibold tabular-nums',
        getRatingColor(rating),
        sizeClasses,
        className,
      )}
    >
      <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
      {rating.toFixed(1)}
      {showLabel && <span className="font-normal opacity-70">/10</span>}
    </span>
  )
}
