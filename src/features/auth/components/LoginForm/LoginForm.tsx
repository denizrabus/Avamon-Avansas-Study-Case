import { type ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AvamonMark } from '../../../../shared/components/brand/AvamonMark'
import { Button, Card, FormField, Input } from '../../../../shared/components/ui'
import { demoUsers } from '../../demo-users'
import { loginSchema, type LoginFormValues } from '../../login-schema'
import { DemoUserCard } from '../DemoUserCard'

interface LoginFormProps {
  error?: string
  footer?: ReactNode
  onSubmit: (values: LoginFormValues) => void
}

export function LoginForm({ error, footer, onSubmit }: LoginFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<LoginFormValues>({
    defaultValues: {
      password: '',
      username: '',
    },
    resolver: zodResolver(loginSchema),
  })

  function fillDemoUser(user: (typeof demoUsers)[number]) {
    setValue('username', user.username, { shouldValidate: true })
    setValue('password', user.password, { shouldValidate: true })
  }

  return (
    <Card className="mx-auto w-full max-w-[440px] p-10 shadow-card">
      <div className="mb-6 flex items-center justify-center gap-3">
        <AvamonMark className="size-6 text-avamon-red" />
        <h1 className="text-2xl font-bold text-ink">Login to Avamon</h1>
      </div>

      <form
        className="space-y-5"
        onSubmit={handleSubmit((values) => onSubmit(values))}
      >
        {error ? (
          <div
            className="rounded-lg border border-avamon-red/30 bg-avamon-red/10 px-4 py-3 text-sm font-semibold text-avamon-red"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        <FormField
          error={errors.username?.message}
          htmlFor="username"
          label="Username"
          required
        >
          <Input
            id="username"
            invalid={Boolean(errors.username)}
            {...register('username')}
          />
        </FormField>

        <FormField
          error={errors.password?.message}
          htmlFor="password"
          label="Password"
          required
        >
          <Input
            id="password"
            invalid={Boolean(errors.password)}
            type="password"
            {...register('password')}
          />
        </FormField>

        <Button className="w-full" type="submit" variant="danger">
          Login
        </Button>
      </form>

      <div className="my-7 h-px bg-line" />

      <section aria-labelledby="demo-users-title" className="space-y-4">
        <h2
          className="text-center text-sm font-black uppercase tracking-wide text-muted"
          id="demo-users-title"
        >
          Demo Users
        </h2>

        <div className="grid grid-cols-1 gap-3 phone-lg:grid-cols-2">
          {demoUsers.map((user) => (
            <DemoUserCard
              key={user.username}
              onSelect={fillDemoUser}
              user={user}
            />
          ))}
        </div>
      </section>

      {footer ? <div className="mt-6 text-center">{footer}</div> : null}
    </Card>
  )
}
