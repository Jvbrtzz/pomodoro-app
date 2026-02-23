import getApiInstance from "./api";
import { UserLoginData } from "../interfaces/user";
import { setAccessToken } from "../util/decodeAccessToken";
import axios from "axios";

async function fetchUser(email: string, senha: string): Promise<UserLoginData | void> {
  try {
    const api = await getApiInstance();

    const resultapi = await api.post("auth/login", {
      email,
      senha,
    });

    setAccessToken(resultapi.data.user);
    return resultapi.data.user as UserLoginData;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Failed to fetch User");
      } else {
        console.error(error.response?.data.error);
        throw new Error("Erro inesperado, tente novamente mais tarde");
      }
    } else {
      console.error(error);
    }
  }
}

async function createUser(nome: string, email: string,  senha: string, user_type: string): Promise<Number | void> {
    
    try {
        const api = await getApiInstance();
        const resultapi = await api.post("auth/register", {
        nome,
        email,
        senha,
        user_type
        });   

      return resultapi.status;

    } catch (error) {

        if (!axios.isAxiosError(error)) {
            throw error;
        }

        const data = error.response?.data;

        // erros de validação estruturados
        if (data?.error) {

            const validationErrors = Object.values(data.error)
            .flatMap((v: any) => v?._errors ?? []);

            if (validationErrors.length) {
            throw new Error(validationErrors.join("\n, "));
            }
        }

        // fallback geral
        throw new Error(data?.message || "Erro inesperado, tente novamente mais tarde");
    }

}

export { fetchUser, createUser };
