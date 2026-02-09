import getApiInstance from "./api";
import Task  from "../interfaces/pomodoro";

async function fetchTasks() : Promise<Task[]> {    
    const api = await getApiInstance();
    const resultapi = await api.get("/tasks/getTasks")
    if (resultapi.status === 200) {
        return resultapi.data as Task[];

    } else {
        throw new Error("Failed to fetch tasks");
    }
}

export { 
    fetchTasks
    };