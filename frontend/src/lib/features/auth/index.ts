import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'

// Define a type for the slice state
interface AuthState<T> {
  accessToken: T,
  refreshToken: T,
  isLoggedIn: boolean
}

// Define the initial state using that type
const initialState: AuthState<null> = {
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
    },
    logout: (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
    }
  },
})

export const { setAuth, logout } = authSlice.actions

export const getAccessToken = (state: RootState) => state.auth.accessToken
export const getRefreshToken = (state: RootState) => state.auth.refreshToken
export const getAuthStatus = (state: RootState) => state.auth.isLoggedIn

export default authSlice.reducer