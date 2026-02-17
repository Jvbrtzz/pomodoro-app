import "./register.css";
import { loginAction } from "../../store/actions";
import { useDispatch,  } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUser } from "../../http/user.api";
import { decodeAccessToken, clearAccessToken } from "../../util/decodeAccessToken";
import { getURLParams } from "../../util/urlParams";

export function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [userType, setUser] = useState("user")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if(getURLParams('motivo') == 'Acesso_negado'){
      clearAccessToken()
      alert('acesso negado vacilao');
    }
    if (decodeAccessToken()) {
      navigate('/home')
    }
  }, [navigate])
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      setError("Preencha todos os campos.")
      return
    }

    if (senha !== confirmarSenha) {
      setError("As senhas nao coincidem.")
      return
    }
    
    try {
      const user = await fetchUser(email, senha)
      if (user) {
        dispatch(loginAction(user))
        console.log(user)
        if(userType == "user") navigate('/home') 
        else if (userType == "admin") navigate('/admin') 
      } 
    } catch {
      setError("E-mail ou senha inválidos.")
    }
  }

  return (
    <div className="login-page">
      <section className="login-card">
        <header className="login-card__header">
          <span className="eyebrow">Bem-vindo de volta</span>
          <h1>Entrar</h1>
          <p>Use seu e-mail para continuar sua rotina.</p>          
        </header>
   <label>Tipo de Login</label>

    <div className="user-type">
      <label>
        Usuário
        <input
          type="radio"
          name="userType"
          value="user"
          defaultChecked
          onChange={(e) => setUser(e.target.value)}
        />
      </label>

      <label>
        Admin
        <input
          type="radio"
          name="userType"
          value="admin"
          onChange={(e) => setUser(e.target.value)}
        />
      </label>
    </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label className="field">
            <span>Nome</span>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>

          <label className="field">
            <span>E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="field">
            <span>Senha</span>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>

          <label className="field">
            <span>Confirmar senha</span>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="login-button" type="submit">
            Entrar na conta
          </button>
        </form>
      </section>
    </div>
  )
}
