export type User = {
  name?: string
  email: string
  senha?: string
  user_type: string
}

export type UserLoginData ={
  accessToken: string
}

export type UserInfo = {
  user_id: number
  email: string
  name: string
  user_type: string
  iat: number
  exp: number
}