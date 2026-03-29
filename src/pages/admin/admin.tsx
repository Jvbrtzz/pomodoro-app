import { useEffect, useState } from "react";
import "./admin.css";
import UserList from "../../components/User";
import { logoutAction } from "../../store/actions";
import { useDispatch } from "react-redux";
import { decodeAccessToken, clearAccessToken } from "../../util/decodeAccessToken";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../interfaces/user";
import Header from "../../components/header/header";

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
        else if(decoded.user_type === 'user'){
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
         <>
        <Header rightContent={userInfo?.name} handleLogout={handleLogout} subtitle="Área administrativa"/>    
        <div className="home-container">
        <UserList/>
        </div>  
        </>  
         
    );
    }
export default Admin;