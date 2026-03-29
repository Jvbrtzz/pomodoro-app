import { useEffect, useState } from "react";
import  { UsersList } from "../interfaces/user";
import { getAccessToken } from "../util/decodeAccessToken";
import "./User.css";
import getSearch from "../util/getSearch";

export default function UserList() {
  let token = getAccessToken() || "";
  const [users, setUsers] = useState<UsersList[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function doSearch() {
      try {
        const results = await getSearch(searchTerm, token);
        setUsers(Array.isArray(results) ? results : []);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    doSearch();
  }, [searchTerm, token]);

  if (loading) {
    return <p className="user-list-loading">Carregando usuarios...</p>;
  }

  return (
    <section className="user-list">
      <header className="user-list__header">
        <p className="user-list__eyebrow">Painel admin</p>
        <h3>Usuarios cadastrados</h3>
      </header>
      <input type="search" placeholder="Buscar usuarios..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
