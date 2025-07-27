// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Aquí se renderizan las rutas hijas
import logoUleam from './assets/logo_ULEAM.png';
import { Link } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header className="contr">
        <img src={logoUleam} alt="Logo Uleam" className="imageLogo" />
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/registro">Registrarse</Link>
        </nav>
      </header>

      <main>
        {/* Aquí React Router renderiza la página actual */}
        <Outlet />
      </main>

      <footer className="piepag">
        <p>
          ULEAM © Copyright 2020, Todos los derechos reservados -<br />
          Universidad Laica Eloy Alfaro de Manabí<br />
          Dirección: Av. Circunvalación - Vía a San Mateo Manta - Manabí - Ecuador
        </p>
      </footer>
    </>
  );
}

export default Layout;
