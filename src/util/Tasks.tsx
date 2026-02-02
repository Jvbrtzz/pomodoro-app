import { useEffect, useState } from "react";
import { fetchTasks } from "../http/tasks.api";
import  Task from "../interfaces/pomodoro";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data || []);
      } catch (error) {
        console.error("Erro ao buscar tasks", error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="task-list-container">
      <h3>Saved Tasks</h3>

      {tasks.length === 0 && <p>No tasks saved.</p>}

      <ul>
        {tasks.map((task) => (
          <li>
            <strong>Task:</strong> {task.nome} <br />
            <strong>Description:</strong> {task.descricao} <br />
            <time>Tempo: {task.tempo}</time>
          </li>
        ))}
      </ul>
    </div>
  );
}
