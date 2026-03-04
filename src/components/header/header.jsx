import "./header.css";
import { useState, useRef, useEffect } from "react";
import Button from "../button/button";

export default function Header({
  title = "Pomodoro App",
  subtitle,
  rightContent,
  handleLogout
}) {

  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <header className="app-header">
      <div className="app-header__text">
        <h1 className="app-header__title">{title}</h1>
        {subtitle && (
          <p className="app-header__subtitle">{subtitle}</p>
        )}
      </div>

      {rightContent && (
        <div className="app-header__actions" onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
          
          <div 
            className="app-header__profile" 
          >
            {rightContent}
          </div>

          {isOpen && (
            <div className="app-header__dropdown">
              <Button
                variant="secondary"
                type="button"
                onClick={handleLogout}
                disabled={false}
                label="Logout"
              />
            </div>
          )}

        </div>
      )}
    </header>
  );
}