import Button from "../../components/button/button";
import Modal from "../../components/modal/modal";
import { useEffect, useState } from "react";
import "./home.css";
import TaskList from "../../util/Tasks";
import { logoutAction } from "../../store/actions";
import { useDispatch } from "react-redux";
import { decodeAccessToken, clearAccessToken, getAccessToken } from "../../util/decodeAccessToken";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../interfaces/user";

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch()     

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const decoded = decodeAccessToken()

        if (!decoded) {
        navigate('/login')
        return
        }

        setUserInfo(decoded)
    }, [navigate])   

    const handleLogout = (): void => {
        clearAccessToken()
        dispatch(logoutAction())
        navigate('/login')
    }

    return (        
        <div className="home-container">
        <h2 className="welcome-message">Bem-vindo, {userInfo?.name || "Usuário"}!</h2>
        <h1 className="home-title">Pomodoro App</h1>
        <div className="actions">
        <Button variant="primary" type="submit" onClick={() => setOpen(true)} disabled={false} label="Start Pomodoro"/>
        </div>  
        <Modal isOpen={open} onClose={() => setOpen(false)}/>
        <Button variant="secondary" type="submit" onClick={handleLogout} disabled={false} label="Logout"/>

        <TaskList/>
        </div>            
    );
    }
export default Home;