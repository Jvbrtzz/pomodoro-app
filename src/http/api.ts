import axios from "axios"

async function getApiInstance() {
    const api = axios.create({ 
        baseURL: "http://localhost:3000/api/",
        headers: {
            "Content-Type": "application/json",     
        },
    });
        
    return api;
}   
export default getApiInstance