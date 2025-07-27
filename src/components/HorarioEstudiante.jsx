import React, { useState } from "react";
import "../estilos/ConsultarHorario.css";

function HorarioEstudiante() {
  const [carrera, setCarrera] = useState("");
  const [semestre, setSemestre] = useState("");
  const [paralelo, setParalelo] = useState("");
  const [horario, setHorario] = useState(null);

  const verHorario = (e) => {
    e.preventDefault();

    if (!carrera || !semestre || !paralelo) {
      alert("Por favor complete todos los campos.");
      return;
    }

    const horarios = JSON.parse(localStorage.getItem("horarios")) || [];
    const h = horarios.find(
      (x) =>
        x.carrera === carrera &&
        x.semestre.toString() === semestre.toString() &&
        x.paralelo === paralelo
    );

    if (!h) {
      alert("No hay un horario para esos datos.");
      setHorario(null);
      return;
    }

    setHorario(h);
  };

  return (
    <div className="horario-container main" style={{ padding: "2rem" }}>
      <h1>Consulta de Horario</h1>
      <form onSubmit={verHorario}>
        <label>Carrera:</label>
        <select value={carrera} onChange={(e) => setCarrera(e.target.value)}>
          <option value="">Carrera</option>
          <option value="Software">Software</option>
          <option value="TI">Tecnología de la Información</option>
        </select>

        <label>Semestre:</label>
        <select value={semestre} onChange={(e) => setSemestre(e.target.value)}>
          <option value="">Semestre</option>
          {[...Array(8)].map((_, i) => (
            <option key={i} value={i + 1}>
              Nivel {i + 1}
            </option>
          ))}
        </select>

        <label>Paralelo:</label>
        <select value={paralelo} onChange={(e) => setParalelo(e.target.value)}>
          <option value="">Paralelo</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        <button type="submit">Ver Horario</button>
      </form>

      <hr />

      {horario ? (
        <div style={{ marginTop: "1rem" }}>
          <h2>
            {horario.carrera} - Semestre {horario.semestre} - {horario.paralelo}
          </h2>

          {Object.entries(horario.materias).map(([dia, arr]) => (
          <div key={dia} style={{ marginTop: "1rem" }}>
              <h3>{dia.charAt(0).toUpperCase() + dia.slice(1)}</h3>
              {arr.length === 0 ? (
                <p>No hay materias.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Materia</th>
                      <th>Inicio</th>
                      <th>Fin</th>
                      <th>Profesor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arr.map((m, i) => (
                      <tr key={i}>
                        <td>{m.nombre}</td>
                        <td>{m.inicio}</td>
                        <td>{m.fin}</td>
                        <td>{m.profesorEmail || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: "1rem" }}>No hay datos para mostrar.</p>
      )}
    </div>
  );
}

export default HorarioEstudiante;
