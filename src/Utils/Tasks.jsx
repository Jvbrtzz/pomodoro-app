import { getFromLocalStorage } from "./saveLocalStorage";
export default function TaskList() {
    const tasks = getFromLocalStorage();
    console.log("Retrieved tasks:", tasks);
    let allTasks = tasks.map((task, index) => (
        console.log(`Task ${index}:`, task)
    ));
    
    return (
        <div className="task-list-container">
            <h3>Saved Tasks</h3>
            {tasks.map((task) => (
                <ul>
                    <li>
                        <strong>Task:</strong> {task.name} <br />
                        <strong>Description:</strong> {task.description}
                        <time>Tempo: {task.timeFormatted}</time>
                    </li>
                </ul>
            ))}
        </div>
    );
}