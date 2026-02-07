import "./login.css";
import { loginAction, logoutAction } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Login() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(loginAction({ email, senha }))
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
