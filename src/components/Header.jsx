// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoUleam from '../assets/logo_ULEAM.png';
import '../App.css'; // donde tienes .contr, .imageLogo, etc.

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpia TODAS las claves relacionadas a sesión si las usaste
    localStorage.removeItem('currentUser');
    localStorage.removeItem('profesorLogueado'); // si aún la usas
    // localStorage.removeItem('token'); // si tuvieses uno
    navigate('/login', { replace: true });
  };

  return (
    <header className="contr">
      <img src={logoUleam} alt="Logo Uleam" className="imageLogo" />
      <nav>
        <button className="button-cs" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}

export default Header;
