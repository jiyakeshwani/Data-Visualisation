import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice";
import modulesReducer from "./modulesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modules: modulesReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
