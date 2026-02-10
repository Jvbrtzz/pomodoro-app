import getApiInstance from "./api";
import Task  from "../interfaces/pomodoro";

async function fetchTasks(user_id: number | undefined) : Promise<Task[]> {    
    const api = await getApiInstance();
    const resultapi = await api.post("/tasks/getTasks", {
        user_id: user_id
    })
    if (resultapi.status === 200) {
        return resultapi.data as Task[];
    } else {
        throw new Error("Failed to fetch tasks");
    }
}

export { 
    fetchTasks
    };