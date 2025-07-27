import React, { useState } from "react";
import "../estilos/Acceso.css";
import logo from "../assets/LogoULEAM.png";
import { Link, useNavigate } from "react-router-dom";

function Registro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    conf_contraseña: "",
    carrera: "",
    rol: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistro = (e) => {
    e.preventDefault();

    const { nombre, correo, contraseña, conf_contraseña, carrera, rol } = formData;

    // Validación manual de campos vacíos
    if (!nombre || !correo || !contraseña || !conf_contraseña || !carrera || !rol) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Validación de contraseña mínima
    if (contraseña.length < 8 || conf_contraseña.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    // Validación de coincidencia de contraseñas
    if (contraseña !== conf_contraseña) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Validación de correo institucional
    if (!correo.endsWith("@uleam.edu.ec")) {
      alert("El correo debe ser institucional (@uleam.edu.ec).");
      return;
    }

    // Validación de correo duplicado
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const yaExiste = usuarios.some((u) => u.correo === correo);
    if (yaExiste) {
      alert("Este correo ya está registrado.");
      return;
    }

    // Guardar nuevo usuario
    const nuevoUsuario = { nombre, correo, contraseña, carrera, rol };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    navigate("/login");
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo ULEAM" className="logo-login" />
      <h1>Registrarse</h1>
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombres Completos"
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo Institucional"
          value={formData.correo}
          onChange={handleChange}
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={handleChange}
        />
        <input
          type="password"
          name="conf_contraseña"
          placeholder="Confirmar Contraseña"
          value={formData.conf_contraseña}
          onChange={handleChange}
        />

        <select name="carrera" value={formData.carrera} onChange={handleChange}>
          <option value="">Seleccione su Carrera</option>
          <option value="sw">Software</option>
          <option value="ti">Tecnología de la Información</option>
        </select>

        <select name="rol" value={formData.rol} onChange={handleChange}>
          <option value="">Seleccione su Rol</option>
          <option value="p">Profesor</option>
        </select>

        <button type="submit">Registrar</button>

        <hr />
        ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
      </form>
    </div>
  );
}

export default Registro;
