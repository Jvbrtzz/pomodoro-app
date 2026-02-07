import Button from "../../components/button/button";
import Modal from "../../components/modal/modal";
import { useState } from "react";
import "./home.css";
import TaskList from "../../util/Tasks";
import getApiInstance from "../../http/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { loginAction, logoutAction } from "../../store/actions";
import { useDispatch } from "react-redux";

function Home() {
    const dispatch = useDispatch()
    const isAuth = useSelector(
        (state: RootState) => state
    )   
    console.log("User authenticated:", isAuth.payload?.email); // Debugging line
    const [open, setOpen] = useState(false);

    function openModal(open: boolean) {
        setOpen(open);
    }

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(logoutAction())
      }

    function fetchData() : void {
        const api = getApiInstance();  
        console.log("API Instance:", api);
    } 

    return (
        <div className="home-container">
        <h2 className="welcome-message">Bem-vindo, {isAuth.payload?.email || "Usuário"}!</h2>
        <h1 className="home-title">Pomodoro App</h1>
        <div className="actions">
        <Button variant="primary" type="submit" onClick={() => openModal(true)} disabled={false} label="Start Pomodoro"/>
        </div>  
        <Modal isOpen={open} onClose={() => setOpen(false)}/>
        <button onClick={fetchData}>Fetch Data</button>
        <Button variant="secondary" type="submit" onClick={handleLogout} disabled={false} label="Logout"/>

        <TaskList/>
        </div>     
    );
    }
export default Home;