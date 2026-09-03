import { type ReactNode } from 'react'

interface FormFieldProps {
  children: ReactNode
  error?: string
  helperText?: string
  htmlFor: string
  label: string
  required?: boolean
}

export function FormField({
  children,
  error,
  helperText,
  htmlFor,
  label,
  required = false,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1">
        <label className="block text-sm font-bold text-muted" htmlFor={htmlFor}>
          {label}
        </label>
        {required ? (
          <span aria-hidden="true" className="text-avamon-red">
            *
          </span>
        ) : null}
      </div>
      {children}
      {helperText ? <p className="text-sm text-muted">{helperText}</p> : null}
      {error ? <p className="text-sm font-semibold text-avamon-red">{error}</p> : null}
    </div>
  )
}
