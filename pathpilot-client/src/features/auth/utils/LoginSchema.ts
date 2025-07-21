import { z } from "zod"
import { EmailSchema } from "@/src/features/auth/utils/EmailSchema"

export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(6, "Password must be at least 6 characters long."),
  rememberMe: z.boolean().optional(),
})
