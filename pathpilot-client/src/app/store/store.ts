import { configureStore } from "@reduxjs/toolkit"
import { pathpilotApi } from "@/src/shared/api/pathpilotApi"
import { setupListeners } from "@reduxjs/toolkit/query"
import { useDispatch } from "react-redux"

export const store = configureStore({
  reducer: {
    [pathpilotApi.reducerPath]: pathpilotApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pathpilotApi.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
