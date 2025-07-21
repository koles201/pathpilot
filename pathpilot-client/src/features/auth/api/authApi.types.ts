export type RegisterRequest = {
  name: string
  email: string
  password: string
  agreeToTerms: boolean
}

export type LoginRequest = {
  email: string
  password: string
  rememberMe?: boolean
}
