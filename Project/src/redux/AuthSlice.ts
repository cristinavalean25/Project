import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  loggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
    logout: state => {
      state.user = null;
      state.loggedIn = false;
    },
  },
});
export type AuthSliceType = typeof authSlice;

export const {authenticate, logout} = authSlice.actions;

export default authSlice.reducer;
