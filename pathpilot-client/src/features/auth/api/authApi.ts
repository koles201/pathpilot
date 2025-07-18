import { pathpilotApi } from "@/src/shared/api/pathpilotApi"
import { LoginRequest, RegisterRequest } from "@/src/features/auth/api/authApi.types"

export const authApi = pathpilotApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterRequest>({
      query: (body) => ({
        url: "/auth/registration",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<void, LoginRequest>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation } = authApi
