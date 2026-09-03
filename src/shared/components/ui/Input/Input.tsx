import { forwardRef, type InputHTMLAttributes } from 'react'

import { cn } from '../../../utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid = false, ...props }, ref) => {
    return (
      <input
        aria-invalid={invalid ? 'true' : undefined}
        className={cn(
          'h-12 w-full rounded-lg border border-line bg-surface px-4 text-base text-ink outline-none transition placeholder:text-muted/70 focus:border-avamon-red focus:ring-2 focus:ring-avamon-red/20',
          invalid && 'border-avamon-red focus:border-avamon-red focus:ring-avamon-red/20',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
