import React from 'react';
import { PomodoroScript } from '../../util/pomodoro/pomodoroScript';
import './pomodoro.css';
import Button from '../button/button';
import { saveToLocalStorage } from '../../util/saveLocalStorage';
import TaskList from '../../util/Tasks';

export default function PomodoroTimer() {
    const [nome, setName] = React.useState('');
    const [descricao, setDescription] = React.useState('');   
    
    const {
        isActive,
        sessionsCompleted,
        isWorkSession,
        toggleTimer,
        resetTimer,
        timeFormatted,
    } = PomodoroScript();

    const handleAddTask = (e) => {
        e.preventDefault();
        if (nome.trim() && descricao.trim()) {
            saveToLocalStorage({ nome, descricao, tempo: timeFormatted });
            setName('');
            setDescription('');
        }
    };

    return (
        <div className="pomodoro-timer">
            <h1>{isWorkSession ? 'Work Session' : 'Break Time'}</h1>
            <div className="timer-display">
                <span className="time">{timeFormatted}</span>
            </div>
            <div className="controls">
                <button onClick={toggleTimer}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button onClick={resetTimer}>Reset</button>
            </div>
            <div className="sessions">
                <p>Sessions Completed: {sessionsCompleted}</p>
            </div>
            <form className="task-inputs" onSubmit={handleAddTask}>
                <label htmlFor="task-input">Task:</label>
                <input 
                    type="text" 
                    name="Tarefa" 
                    id="task-input" 
                    value={nome}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="description-input">Description:</label>
                <input 
                    type="text" 
                    name="Descrição" 
                    id="description-input" 
                    value={descricao}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button label="Add Task" variant="secondary" type="submit" />
            </form>

        </div>
    );
}