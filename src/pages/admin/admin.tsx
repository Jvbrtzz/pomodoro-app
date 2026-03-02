import Button from "../../components/button/button";
import Modal from "../../components/modal/modal";
import { useEffect, useState } from "react";
import "./admin.css";
import TaskList from "../../components/Tasks";
import { logoutAction } from "../../store/actions";
import { useDispatch } from "react-redux";
import { decodeAccessToken, clearAccessToken, getAccessToken } from "../../util/decodeAccessToken";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../interfaces/user";
import { fetchAllUsers } from "../../http/user.api";

function Admin() {
    const navigate = useNavigate();
    const dispatch = useDispatch()     

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [open, setOpen] = useState(false);

    async function dataFetch() {
        const users = await fetchAllUsers(getAccessToken() || "")
        return users
    }

    useEffect(() => {
        const decoded = decodeAccessToken()
        
        if (!decoded) {
            navigate('/login')
            return
        }
        else if(decoded.user_type == 'user'){
            navigate('/login?motivo=Acesso_negado')
            return
        }
        setUserInfo(decoded)
    }, [navigate])   

            useEffect(() => {
        async function load() {
            const users = await dataFetch();
            console.log(users);
        }

        load();
        }, []);

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
export default Admin;