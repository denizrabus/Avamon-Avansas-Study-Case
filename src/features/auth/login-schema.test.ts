import { describe, expect, it } from 'vitest'

import { loginSchema } from './login-schema'

describe('loginSchema', () => {
  it('accepts username and password values', () => {
    const result = loginSchema.safeParse({
      username: 'guven',
      password: 'altuntas',
    })

    expect(result.success).toBe(true)
  })

  it('requires username and password', () => {
    const result = loginSchema.safeParse({
      username: '',
      password: '',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.username).toContain(
        'Username is required'
      )
      expect(result.error.flatten().fieldErrors.password).toContain(
        'Password is required'
      )
    }
  })
})
