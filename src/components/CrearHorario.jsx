import React, { useMemo, useState } from "react";
import "../estilos/ConsultarHorario.css";
import logo from "../assets/images.png";
import Header from "./Header";

function CrearHorario() {
  const [carrera, setCarrera] = useState("");
  const [semestre, setSemestre] = useState("");
  const [paralelo, setParalelo] = useState("");
  const [errores, setErrores] = useState({});
  const [materias, setMaterias] = useState({
    lunes: [],
    martes: [],
    miércoles: [],
    jueves: [],
    viernes: [],
  });

  const profesores = useMemo(() => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    return usuarios.filter((u) => u.rol === "p");
  }, []);

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!carrera) nuevosErrores.carrera = "Selecciona una carrera.";
    if (!semestre) nuevosErrores.semestre = "Selecciona un semestre.";
    if (!paralelo) nuevosErrores.paralelo = "Selecciona un paralelo.";

    const hayMaterias = Object.values(materias).some((arr) => arr.length > 0);
    if (!hayMaterias) nuevosErrores.materias = "Ingresa al menos una materia.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const agregarMateria = (dia) => {
    setMaterias((prev) => ({
      ...prev,
      [dia]: [
        ...prev[dia],
        { nombre: "", inicio: "", fin: "", profesorEmail: "" },
      ],
    }));
  };

  const editarMateria = (dia, index, campo, valor) => {
    setMaterias((prev) => {
      const copia = { ...prev };
      copia[dia][index][campo] = valor;
      return copia;
    });
  };

  const eliminarMateria = (dia, index) => {
    setMaterias((prev) => {
      const copia = { ...prev };
      copia[dia].splice(index, 1);
      return copia;
    });
  };

  const guardarHorario = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const nuevoHorario = {
      carrera,
      semestre: semestre.toString(),
      paralelo,
      materias,
    };

    const horariosGuardados = JSON.parse(localStorage.getItem("horarios")) || [];
    horariosGuardados.push(nuevoHorario);
    localStorage.setItem("horarios", JSON.stringify(horariosGuardados));

    alert("✅ Horario guardado exitosamente.");

    setCarrera("");
    setSemestre("");
    setParalelo("");
    setMaterias({ lunes: [], martes: [], miércoles: [], jueves: [], viernes: [] });
    setErrores({});
  };

  const dias = ["lunes", "martes", "miércoles", "jueves", "viernes"];

  return (
    <>
      <Header />

      <div className="container">
        <aside className="sidebar">
          <img src={logo} alt="Logo" />
          <h1>Administrador</h1>
          <button onClick={() => (window.location.href = "/admin-horario")}>
          Volver al Panel
          </button>
        </aside>

        <main className="main">
          <h2>Crear Horario</h2>

          <form onSubmit={guardarHorario} className="form-horario">
            <label>Carrera:</label>
            <select value={carrera} onChange={(e) => setCarrera(e.target.value)}>
              <option value="">Carrera</option>
              <option value="Software">Software</option>
              <option value="TI">Tecnología de la Información</option>
            </select>
            {errores.carrera && <p className="error">{errores.carrera}</p>}

            <label>Semestre:</label>
            <select value={semestre} onChange={(e) => setSemestre(e.target.value)}>
              <option value="">Seleccione</option>
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {errores.semestre && <p className="error">{errores.semestre}</p>}

            <label>Paralelo:</label>
            <select value={paralelo} onChange={(e) => setParalelo(e.target.value)}>
              <option value="">Seleccione</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
            {errores.paralelo && <p className="error">{errores.paralelo}</p>}

            <h3>Materias por día</h3>

            <div className="grid-dias">
              {dias.map((dia) => (
                <section key={dia} className="day-card">
                  <header className="day-card__header">
                    <h4>{dia.charAt(0).toUpperCase() + dia.slice(1)}</h4>
                    <button
                      type="button"
                      className="btn-agregar"
                      onClick={() => agregarMateria(dia)}
                    >
                      ➕ Agregar materia
                    </button>
                  </header>

                  <div className="day-card__body">
                    {materias[dia].length === 0 ? (
                      <p className="sin-materias">No hay materias aún.</p>
                    ) : (
                      <div className="materias-list">
                        {materias[dia].map((m, i) => (
                          <div className="materia-row" key={i}>
                            <input
                              type="text"
                              placeholder="Materia"
                              value={m.nombre}
                              onChange={(e) =>
                                editarMateria(dia, i, "nombre", e.target.value)
                              }
                            />
                            <div className="horas">
                              <input
                                type="time"
                                value={m.inicio}
                                onChange={(e) =>
                                  editarMateria(dia, i, "inicio", e.target.value)
                                }
                              />
                              <span className="sep">-</span>
                              <input
                                type="time"
                                value={m.fin}
                                onChange={(e) =>
                                  editarMateria(dia, i, "fin", e.target.value)
                                }
                              />
                            </div>

                            <select
                              value={m.profesorEmail}
                              onChange={(e) =>
                                editarMateria(dia, i, "profesorEmail", e.target.value)
                              }
                            >
                              <option value="">Seleccione profesor</option>
                              {profesores.map((p) => (
                                <option key={p.correo} value={p.correo}>
                                  {p.nombre} ({p.correo})
                                </option>
                              ))}
                            </select>

                            <button
                              type="button"
                              className="btn-delete"
                              onClick={() => eliminarMateria(dia, i)}
                            >
                              ❌
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              ))}
            </div>

            {errores.materias && <p className="error">{errores.materias}</p>}

            <button type="submit" className="btn-guardar">
              Guardar Horario
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default CrearHorario;
