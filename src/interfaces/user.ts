// src/store/auth/auth.types.ts
export type User = {
  name?: string
  email: string
  senha: string
}

export type UserLoginData = Omit<User, "name" & "senha">
