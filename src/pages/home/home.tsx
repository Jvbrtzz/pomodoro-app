import Button from "../../components/button/button";
import Modal from "../../components/modal/modal";
import { useEffect, useState } from "react";
import "./home.css";
import TaskList from "../../util/Tasks";
import getApiInstance from "../../http/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { logoutAction } from "../../store/actions";
import { useDispatch } from "react-redux";
import { decodeAccessToken, clearAccessToken } from "../../util/decodeAccessToken";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    let userInfo = decodeAccessToken()


    const isAuth = useSelector(
        (state: RootState) => state
    )   
    const dispatch = useDispatch()     

    console.log("User authenticated:", isAuth.isAuthenticated); // Debugging line
    const [open, setOpen] = useState(false);

    function openModal(open: boolean) {
        setOpen(open);
    }

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault()
        clearAccessToken();
        dispatch(logoutAction())
      }

    function fetchData() : void {
        const api = getApiInstance();  
        console.log("API Instance:", api);
    } 

    return (
        <div className="home-container">
        <h2 className="welcome-message">Bem-vindo, {(isAuth.isAuthenticated && userInfo?.username) || "Usuário"}!</h2>
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