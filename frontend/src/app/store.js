import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import saleReducer from '../features/sale/saleSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    sale:saleReducer,
  },
})
