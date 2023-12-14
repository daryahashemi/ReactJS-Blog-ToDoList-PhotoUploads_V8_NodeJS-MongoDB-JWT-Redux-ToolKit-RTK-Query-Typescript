import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Auths {
  _id: string;
  username:string;
  email: string;
  password: string;
}

export interface AuthState {
  userco: Auths | null,
}

const initialState: AuthState = {
  userco: localStorage.getItem('userco')
    ? JSON.parse(localStorage.getItem('userco') || '{}')
    : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Auths>) => {
      state.userco = action.payload;
      localStorage.setItem('userco', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.userco = null;
      localStorage.removeItem('userco')
    },
  },
});

export const { login, logout } = authSlice.actions

export default authSlice.reducer
