import Button from "../../components/button/button";
import "./404.css";

export function PageError() {
  return (
    <div className="page-error">
      <h1>OPS...</h1>
      <p>Página não encontrada</p>
      <Button label="Voltar para o início" onClick={() => window.location.href = "/home"} />
    </div>
  );
}
