'use client'

interface Props {
  id: string
  label?: string
  format?: 'horizontal' | 'rectangle' | 'sidebar'
}

const formatStyles = {
  horizontal: 'h-24 w-full',
  rectangle:  'h-64 w-full max-w-sm mx-auto',
  sidebar:    'h-[600px] w-[160px]',
}

export default function AdSlot({ id, label = 'Advertisement', format = 'horizontal' }: Props) {
  return (
    <div className="my-6 flex flex-col items-center gap-1" data-ad-slot={id}>
      <span className="text-[10px] uppercase tracking-widest text-gray-400">{label}</span>
      <div
        className={`flex items-center justify-center rounded border border-dashed border-gray-200 bg-gray-50 text-xs text-gray-400 ${formatStyles[format]}`}
      >
        Ad Slot — {id}
      </div>
    </div>
  )
}
