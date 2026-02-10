import getApiInstance from "./api";
import { User, UserLoginData } from "../interfaces/user";
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
        throw new Error("Failed to fetch tasks");
      } else {
        console.error(error.response);
      }
    } else {
      console.error(error);
    }
  }
}

export { fetchUser };
