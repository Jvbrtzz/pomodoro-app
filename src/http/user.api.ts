import getApiInstance from "./api";
import { User } from "../interfaces/user";
import { setAccessToken } from "../util/decodeAccessToken";

async function fetchUser(email: string, senha: string) : Promise<User[]> {    
    const api = await getApiInstance();
    const resultapi = await api.post(`/getUser/`, 
    {
        email,
        senha
    })

    if (resultapi.status === 200) {
        setAccessToken(resultapi.data.accessToken);
        return resultapi.data as User[];
    } else {
        throw new Error("Failed to fetch User");
    }
}

export { 
    fetchUser
    };