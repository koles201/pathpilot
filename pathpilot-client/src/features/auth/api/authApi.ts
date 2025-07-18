import { pathpilotApi } from "@/src/shared/api/pathpilotApi"
import { RegisterRequest } from "@/src/features/auth/api/authApi.types"

export const authApi = pathpilotApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterRequest>({
      query: (body) => ({
        url: "/auth/registration",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useRegisterMutation } = authApi
