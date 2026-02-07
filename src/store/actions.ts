// src/store/auth/auth.actions.ts
import { User, UserLoginData } from "../interfaces/user"

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"


export type AuthAction =
  | { type: typeof LOGIN, payload: UserLoginData }
  | { type: typeof LOGOUT }
  

export const loginAction = (user: UserLoginData): AuthAction => ({
  type: LOGIN,
  payload: user
})

export const logoutAction = (): AuthAction => ({
  type: LOGOUT,
})
