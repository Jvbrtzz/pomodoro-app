import "./register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../../http/user.api";

export function Register() {
  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [userType, setUser] = useState("user")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  const handleRegister =  async (e: React.FormEvent) :Promise<void>  => {
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
      const user = await createUser(nome, email, senha, userType)
      if (user) {
        navigate('/login')         
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro desconhecido");
      }
    }
  }

  const handleLogin =  () :void => {
    navigate('/login')
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

        <form className="login-form" onSubmit={handleRegister}>
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
          <button className="register-button" onClick={handleLogin}>Voltar pra tela de login</button>

      </section>
    </div>
  )
}
