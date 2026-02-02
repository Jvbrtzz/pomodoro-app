import Button from "../../components/button/button";
import Modal from "../../components/modal/modal";
import { useState } from "react";
import "./home.css";
import TaskList from "../../Utils/Tasks";

function Home() {
    const [open, setOpen] = useState(false);

    function openModal(open: boolean) {
        setOpen(open);
    }

    return (
        <div className="home-container">
        <h1 className="home-title">Pomodoro App</h1>
        <div className="actions">
        <Button variant="primary" type="submit" onClick={() => openModal(true)} disabled={false} label="Start Pomodoro"/>
        </div>

        <Modal isOpen={open} onClose={() => setOpen(false)}/>
        <TaskList/>
        </div>     
    );
    }
export default Home;