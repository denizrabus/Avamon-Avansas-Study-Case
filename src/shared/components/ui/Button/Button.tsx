import { type ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

import { cn } from '../../../utils/cn'

type ButtonVariant = 'primary' | 'danger' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md'

interface ButtonStyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyleProps {}

interface ButtonLinkProps extends LinkProps, ButtonStyleProps {}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-avamon-yellow text-ink hover:bg-avamon-yellow-hover',
  danger: 'bg-avamon-red text-white hover:bg-avamon-red-dark',
  secondary:
    'border border-white/40 bg-white/10 text-white hover:bg-white/15',
  ghost: 'bg-transparent text-avamon-red hover:bg-avamon-red/10',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-12 px-6 text-base',
}

function getButtonClasses({
  className,
  size = 'md',
  variant = 'primary',
}: ButtonStyleProps & { className?: string }) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-bold transition disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-yellow',
    variantClasses[variant],
    sizeClasses[size],
    className
  )
}

export function Button({
  className,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClasses({ className, size, variant })}
      type={type}
      {...props}
    />
  )
}

export function ButtonLink({
  className,
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={getButtonClasses({ className, size, variant })}
      {...props}
    />
  )
}
