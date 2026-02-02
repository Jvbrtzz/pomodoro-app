import PomodoroTimer from '../pomodoro/PomodoroTimer';
import './modal.css';

export default function Modal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Modal Pomodoro</h2>
                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className="modal-body">
                    <PomodoroTimer />
                </div>
            </div>
        </div>
    );
}