import Button from "../../components/button/button";
import Modal from "../../components/modal/modal";
import { useEffect, useState } from "react";
import "./admin.css";
import UserList from "../../components/User";
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

    const handleLogout = (): void => {
        clearAccessToken()
        dispatch(logoutAction())
        navigate('/login')
    }


    return (        
        <div className="home-container">
        <h2 className="welcome-message">Bem-vindo, {userInfo?.name || "Usuário"}!</h2>
        <h1 className="home-title">Área Administrativa</h1>
        <Button variant="secondary" type="submit" onClick={handleLogout} disabled={false} label="Logout"/>
        <UserList/>
        </div>            
    );
    }
export default Admin;