import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../estilos/ConsultarHorario.css";

function HorarioProfesor() {
  const [materias, setMaterias] = useState([]);
  const [cargando, setCargando] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!currentUser || currentUser.rol !== "p") {
      setCargando(false);
      return;
    }

    const horarios = JSON.parse(localStorage.getItem("horarios")) || [];
    const misMaterias = [];

    horarios.forEach((h) => {
      Object.entries(h.materias || {}).forEach(([dia, arr]) => {
        arr.forEach((m) => {
          if (m.profesorEmail === currentUser.correo) {
            misMaterias.push({
              dia,
              nombre: m.nombre,
              inicio: m.inicio,
              fin: m.fin,
              carrera: h.carrera,
              semestre: h.semestre,
              paralelo: h.paralelo,
            });
          }
        });
      });
    });

    setMaterias(misMaterias);
    setCargando(false);
  }, [currentUser]);

  if (cargando) return <p>Cargando...</p>;

  if (!currentUser || currentUser.rol !== "p") {
    return (
      <>
        <Header />
        <div className="main" style={{ padding: "2rem" }}>
          <h2>No tienes permisos para ver esta página.</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="main" style={{ padding: "2rem" }}>
        <h2>Mi Horario</h2>
        {materias.length === 0 ? (
          <p>No tienes materias asignadas.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Día</th>
                <th>Materia</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Carrera</th>
                <th>Semestre</th>
                <th>Paralelo</th>
              </tr>
            </thead>
            <tbody>
              {materias.map((m, i) => (
                <tr key={i}>
                  <td>{m.dia}</td>
                  <td>{m.nombre}</td>
                  <td>{m.inicio}</td>
                  <td>{m.fin}</td>
                  <td>{m.carrera}</td>
                  <td>{m.semestre}</td>
                  <td>{m.paralelo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default HorarioProfesor;
