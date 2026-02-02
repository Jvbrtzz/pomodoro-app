import Task from '../interfaces/pomodoro';

export const saveToLocalStorage = (data: Task): void => {
    try {
        const existing = localStorage.getItem('pomodoroData');
        let parsed: Array<any> = [];
        try {
            parsed = existing ? JSON.parse(existing) : [];
        } catch {
            parsed = [];
        }

        const tasks: Task[] = Array.isArray(parsed) ? (parsed as Task[]) : (parsed ? [parsed as Task] : []);
        tasks.push(data);
        localStorage.setItem('pomodoroData', JSON.stringify(tasks));
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
    }
};

export const getFromLocalStorage = (): Task[] | null => {
    try {
        const data = localStorage.getItem('pomodoroData');
        if (!data) return [];
        return JSON.parse(data) as Task[];
    } catch (error) {
        console.error('Erro ao recuperar do localStorage:', error);
        return null;
    }
};