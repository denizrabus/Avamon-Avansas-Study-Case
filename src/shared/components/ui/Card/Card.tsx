import { type HTMLAttributes, type ReactNode } from 'react'

import { cn } from '../../../utils/cn'

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  title?: string
}

export function Card({ children, className, title, ...props }: CardProps) {
  return (
    <section
      className={cn('rounded-card bg-surface p-6 shadow-card', className)}
      {...props}
    >
      {title ? (
        <h2 className="mb-4 text-xl font-black text-ink">{title}</h2>
      ) : null}
      {children}
    </section>
  )
}
