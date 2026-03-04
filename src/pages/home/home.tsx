import Button from "../../components/button/button";
import Modal from "../../components/modal/modal";
import { useEffect, useState } from "react";
import "./home.css";
import TaskList from "../../components/Tasks";
import { logoutAction } from "../../store/actions";
import { useDispatch } from "react-redux";
import { decodeAccessToken, clearAccessToken, getAccessToken } from "../../util/decodeAccessToken";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../interfaces/user";
import Header from "../../components/header/header";

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
        <>     
        <Header rightContent={userInfo?.name || "Usuário" } handleLogout={handleLogout} subtitle="Organize seu tempo de forma eficiente"/>
            <div className="home-container">
            <div className="actions">
            <Button variant="primary" type="submit" onClick={() => setOpen(true)} disabled={false} label="Start Pomodoro"/>
            </div>  
            <Modal isOpen={open} onClose={() => setOpen(false)}/>
        <TaskList/>
        </div>   
        </>          
    );
    }
export default Home;