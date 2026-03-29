import getApiInstance from "./api";
import { UserLoginData, UsersList } from "../interfaces/user";
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
        const errorText = "Erro inesperado, tente novamente mais tarde"
        let err = JSON.stringify(error.response?.data.error);
        if (err !== undefined) {
          let errSemAspas = err.replaceAll('"', '');
          console.error(errSemAspas || errorText);
          throw new Error(errSemAspas || errorText);
        }
        console.error(err || errorText);
        throw new Error(err || "Erro inesperado, tente novamente mais tarde");
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

async function fetchAllUsers( accessToken: string ): Promise<UsersList[] | void> {
  try {
    const api = await getApiInstance();
    const resultapi = await api.get(
      "auth/getusers",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return resultapi.data.users as UsersList[];

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Não autorizado");
      } else {
        console.error(error.response?.data); 
      }
    } else {
      console.error(error);
      throw new Error("Erro inesperado");
    }
  }
}

async function fetchSearchResults(searchTerm: string, accessToken: string): Promise<UsersList[] | void> {
  try {
    const api = await getApiInstance();
    const resultapi = await api.post(
      "auth/searchusers",
      { term: searchTerm },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (resultapi.status === 200) {
      return (resultapi.data?.users ?? []) as UsersList[];
    } else {
      console.error("Error fetching search results:", resultapi.statusText);
      return [];
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching search results:", errorMessage);
    return [];
  }
};

export { fetchUser, createUser, fetchAllUsers, fetchSearchResults };
