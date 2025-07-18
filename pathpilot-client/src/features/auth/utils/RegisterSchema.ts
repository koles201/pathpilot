import { z } from "zod"
import { EmailSchema } from "@/src/features/auth/utils/EmailSchema"
import { PasswordSchema } from "@/src/features/auth/utils/PasswordSchema"

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(6, "Minimum number of characters 6")
    .max(30, "Maximum number of characters 30")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿĀ-žа-яА-ЯёЁ\s'-]+$/, { message: "Invalid characters entered" }),

  email: EmailSchema,
  password: PasswordSchema,
  agreeToTerms: z.literal(true).or(
    z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms & Conditions",
    }),
  ),
})
export type SignupSchemaType = z.infer<typeof RegisterSchema>
