import { z } from "zod"

export const EmailSchema = z.email("Email must match format example@example.com")
