import { Pomodoro } from '../interfaces/pomodoro';

export const saveToLocalStorage = (data: Pomodoro): void => {
    try {
        const existing = localStorage.getItem('pomodoroData');
        let parsed: Array<any> = [];
        try {
            parsed = existing ? JSON.parse(existing) : [];
        } catch {
            parsed = [];
        }

        const tasks: Pomodoro[] = Array.isArray(parsed) ? (parsed as Pomodoro[]) : (parsed ? [parsed as Pomodoro] : []);
        tasks.push(data);
        localStorage.setItem('pomodoroData', JSON.stringify(tasks));
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
    }
};

export const getFromLocalStorage = (): Pomodoro[] | null => {
    try {
        const data = localStorage.getItem('pomodoroData');
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Erro ao recuperar do localStorage:', error);
        return null;
    }
};