import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Acceso.css';
import logo from '../assets/logoULEAM.png';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    if (!usuarios || usuarios.length === 0) {
      const usuariosIniciales = [
        {
          nombre: 'Administrador',
          correo: 'admin@uleam.edu.ec',
          contraseña: 'admin1234',
          carrera: 'N/A',
          rol: 'admin'
        },
        {
          nombre: 'Profesor Juan',
          correo: 'juan@uleam.edu.ec',
          contraseña: '12345678',
          carrera: 'Software',
          rol: 'p'
        }
      ];
      localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
    }
  }, []);

  const login = (e) => {
    e.preventDefault();
    const correo = e.target.correo.value.trim();
    const contraseña = e.target.password.value.trim();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.contraseña === contraseña
    );

    if (usuario) {
      alert(`Login exitoso. Bienvenido, ${usuario.nombre}`);

      // ✅ Guarda al usuario logueado aquí
      localStorage.setItem('currentUser', JSON.stringify(usuario));

      // Redirige según rol
      if (usuario.rol === 'p') {
        navigate('/profesor-horario');
      } else if (usuario.rol === 'admin') {
        navigate('/admin-horario');
      } else {
        navigate('/');
      }
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="login-container">
      <section>
        <img src={logo} alt="Logo ULEAM" className="logo-login" />
      </section>

      <section>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={login}>
          <input
            type="email"
            name="correo"
            placeholder="Correo Institucional"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
          />
          <button type="submit">Acceder</button>
          <hr />
          ¿No tienes cuenta? <a href="/registro">Regístrate</a>
        </form>
      </section>
    </div>
  );
}

export default Login;
