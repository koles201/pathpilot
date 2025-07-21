import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const pathpilotApi = createApi({
  reducerPath: "pathpilotApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: () => ({}),
})
