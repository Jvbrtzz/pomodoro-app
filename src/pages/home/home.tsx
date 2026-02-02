import Button from "../../components/button/button";
import Modal from "../../components/modal/modal";
import { useState } from "react";
import "./home.css";
import TaskList from "../../util/Tasks";
import getApiInstance from "../../http/api";

function Home() {
    const [open, setOpen] = useState(false);

    function openModal(open: boolean) {
        setOpen(open);
    }

    function fetchData() : void {
        const api = getApiInstance();  
        console.log("API Instance:", api);
    } 

    return (
        <div className="home-container">
        <h1 className="home-title">Pomodoro App</h1>
        <div className="actions">
        <Button variant="primary" type="submit" onClick={() => openModal(true)} disabled={false} label="Start Pomodoro"/>
        </div>  
        <Modal isOpen={open} onClose={() => setOpen(false)}/>
        <button onClick={fetchData}>Fetch Data</button>
        <TaskList/>
        </div>     
    );
    }
export default Home;