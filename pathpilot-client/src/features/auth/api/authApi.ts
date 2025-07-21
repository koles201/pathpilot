import { pathpilotApi } from "@/src/shared/api/pathpilotApi"
import { LoginRequest, RegisterRequest } from "@/src/features/auth/api/authApi.types"
import { PATH } from "@/src/shared/config/routes"

export const authApi = pathpilotApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterRequest>({
      query: (body) => ({
        url: PATH.AUTH.REGISTRATION,
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<void, LoginRequest>({
      query: (body) => ({
        url: PATH.AUTH.LOGIN,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true
})

export const { useRegisterMutation, useLoginMutation } = authApi
