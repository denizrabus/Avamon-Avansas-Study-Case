import { type SVGAttributes } from 'react'

import { cn } from '../../../../shared/utils/cn'

type AvamonMarkProps = SVGAttributes<SVGSVGElement>

export function AvamonMark({ className, ...props }: AvamonMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn('shrink-0', className)}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="12" cy="12" fill="currentColor" r="7.25" />
    </svg>
  )
}
