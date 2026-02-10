import "./login.css";
import { loginAction } from "../../store/actions";
import { useDispatch,  } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUser } from "../../http/user.api";
import { decodeAccessToken } from "../../util/decodeAccessToken";

export function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (decodeAccessToken()) {
      navigate('/home')
    }
  }, [navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !senha.trim()) {
      setError("Preencha todos os campos.")
      return
    }

    try {
      const user = await fetchUser(email, senha)
      if (user) {
        dispatch(loginAction(user))
        navigate('/home')
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

        <form className="login-form" onSubmit={handleLogin}>
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

          {error && <p className="form-error">{error}</p>}

          <button className="login-button" type="submit">
            Entrar na conta
          </button>
        </form>
      </section>
    </div>
  )
}
