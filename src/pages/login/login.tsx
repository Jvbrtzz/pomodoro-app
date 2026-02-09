import "./login.css";
import { loginAction } from "../../store/actions";
import { useDispatch,  } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUser } from "../../http/user.api";
import { decodeAccessToken } from "../../util/decodeAccessToken";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

    useEffect(() => {
      const decoded = decodeAccessToken()
  
          if (decoded) {
          navigate('/home')
          return
          }

    }, [navigate])  

  const validateLogin = (email: string, senha: string) => {
    if (email.trim() === "" || senha.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return false;
    }
    return true;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateLogin(email, senha)) {
     try {
        fetchUser(email, senha).then(user => {
          if (user) {
            navigate('/home')
            dispatch(loginAction(user))
          } 
        })
        } catch (error) {
          console.error("Erro durante o login:", error);
          alert("Ocorreu um erro durante o processo de login. Por favor, tente novamente mais tarde.");
        }    
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

          <form className="login-form">
            <label className="field" htmlFor="email">
              <span>E-mail</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="voce@empresa.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="field" htmlFor="password">
              <span>Senha</span>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Sua senha"
                autoComplete="current-password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}                
              />
            </label>

            <div className="form-row">
              <label className="checkbox">
                <input type="checkbox" name="remember" />
                <span>Lembrar de mim</span>
              </label>
              <a className="link" href="#">
                Esqueceu a senha?
              </a>
            </div>

            <button className="login-button" type="submit" onClick={handleLogin}>
              Entrar na conta
            </button>

            <div className="login-divider">
              <span>ou</span>
            </div>

            <button className="ghost-button" type="button">
              Continuar com Google
            </button>
          </form>

          <footer className="login-footer">
            Novo por aqui? <a href="#">Criar conta</a>
          </footer>
        </section>
      </div>
  );
}
