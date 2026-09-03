import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Kullanıcı adı zorunludur'),
  password: z.string().trim().min(1, 'Şifre zorunludur'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
