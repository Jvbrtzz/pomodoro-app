import "./header.css";

export default function Header({
  title = "Pomodoro App",
  subtitle = "",
  rightContent = null,
}) {
  return (
    <header className="app-header">
      <div className="app-header__text">
        <h1 className="app-header__title">{title}</h1>
        {subtitle ? <p className="app-header__subtitle">{subtitle}</p> : null}
      </div>

      {rightContent ? <div className="app-header__actions">{rightContent}</div> : null}
    </header>
  );
}
