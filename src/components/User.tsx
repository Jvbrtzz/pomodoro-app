import { useEffect, useState } from "react";
import { fetchAllUsers } from "../http/user.api";
import  { UsersList } from "../interfaces/user";
import { getAccessToken } from "../util/decodeAccessToken";
import "./User.css";

export default function UserList() {
  let token = getAccessToken() || "";
  const [users, setUsers] = useState<UsersList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        const data = await fetchAllUsers(token || "");
        console.log(data);
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar users", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  if (loading) {
    return <p className="user-list-loading">Carregando usuarios...</p>;
  }

  return (
    <section className="user-list">
      <header className="user-list__header">
        <p className="user-list__eyebrow">Painel admin</p>
        <h3>Usuarios cadastrados</h3>
      </header>

      {users.length === 0 && <p className="user-list__empty">Nenhum usuario cadastrado.</p>}

      <ul className="user-list__grid">
        {users.map((user) => (
          <li className="user-list__item" key={`${user.email}-${user.nome}`}>
            <p><strong>Usuario:</strong> {user.nome}</p>
            <p><strong>E-mail:</strong> {user.email}</p>
            <p className="user-list__role">
              <span>Tipo</span>
              <time>{user.user_type}</time>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
