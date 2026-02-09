import { UserLoginData } from "../interfaces/user"
import { LOGIN, LOGOUT } from "./actions"

type Action =
  | { type: typeof LOGIN, payload: UserLoginData }
  | { type: typeof LOGOUT }

export type State = {
  payload?: UserLoginData
  isAuthenticated: boolean
}

const initialState: State = {
  isAuthenticated: false,
  payload: undefined
}

export function reducer(
  state = initialState,
  action: Action
): State {
  switch (action.type) {
    case "LOGIN":
      console.log("Login action dispatched", action)
      return { 
        isAuthenticated: true,
        payload: action.payload
       }

    case "LOGOUT":
      return { isAuthenticated: false } 

    default:
      return state
  }
}
