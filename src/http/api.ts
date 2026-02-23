import axios from "axios"

async function getApiInstance() {
    const api = axios.create({ 
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            "Content-Type": "application/json",     
        },
    });
    return api;
}   
export default getApiInstance;