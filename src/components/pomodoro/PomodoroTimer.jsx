import React from 'react';
import { PomodoroScript } from '../../Utils/pomodoro/pomodoroScript';
import './pomodoro.css';
import Button from '../button/button';
import { saveToLocalStorage } from '../../Utils/saveLocalStorage';
import TaskList from '../../Utils/Tasks';

export default function PomodoroTimer() {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');   
    
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
        if (name.trim() && description.trim()) {
            saveToLocalStorage({ name, description, timeFormatted });
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="description-input">Description:</label>
                <input 
                    type="text" 
                    name="Descrição" 
                    id="description-input" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button label="Add Task" variant="secondary" type="submit" />
            </form>

        </div>
    );
}