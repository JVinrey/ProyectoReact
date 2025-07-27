import React, { useMemo, useState } from "react";
import "../estilos/ConsultarHorario.css";
import logo from "../assets/images.png";
import Header from "./Header";

function AdminHorario() {
  const [carrera, setCarrera] = useState("");
  const [semestre, setSemestre] = useState("");
  const [paralelo, setParalelo] = useState("");
  const [errores, setErrores] = useState({});
  const [horario, setHorario] = useState(null);

  const profesores = useMemo(() => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    return usuarios.filter((u) => u.rol === "p");
  }, []);

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!carrera) nuevosErrores.carrera = "Selecciona una carrera.";
    if (!semestre) nuevosErrores.semestre = "Selecciona un semestre.";
    if (!paralelo) nuevosErrores.paralelo = "Selecciona un paralelo.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const consultarHorarioAdmin = (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const horariosGuardados = JSON.parse(localStorage.getItem("horarios")) || [];
    const encontrado = horariosGuardados.find(
      (h) =>
        h.carrera === carrera &&
        h.semestre.toString() === semestre.toString() &&
        h.paralelo === paralelo
    );

    if (encontrado) {
      const materias = {
        lunes: encontrado.materias?.lunes || [],
        martes: encontrado.materias?.martes || [],
        miércoles: encontrado.materias?.miércoles || [],
        jueves: encontrado.materias?.jueves || [],
        viernes: encontrado.materias?.viernes || [],
      };
      setHorario({ ...encontrado, materias });
    } else {
      alert("No se encontró un horario con esos datos.");
      setHorario(null);
    }
  };

  const editarMateria = (dia, i, campo, valor) => {
    const nuevasMaterias = { ...horario.materias };
    nuevasMaterias[dia][i][campo] = valor;
    setHorario({ ...horario, materias: nuevasMaterias });
  };

  const agregarMateria = (dia) => {
    const nuevasMaterias = { ...horario.materias };
    nuevasMaterias[dia].push({ nombre: "", inicio: "", fin: "", profesorEmail: "" });
    setHorario({ ...horario, materias: nuevasMaterias });
  };

  const eliminarMateria = (dia, i) => {
    const nuevasMaterias = { ...horario.materias };
    nuevasMaterias[dia].splice(i, 1);
    setHorario({ ...horario, materias: nuevasMaterias });
  };

  const guardarCambios = () => {
    const horariosGuardados = JSON.parse(localStorage.getItem("horarios")) || [];
    const index = horariosGuardados.findIndex(
      (h) =>
        h.carrera === horario.carrera &&
        h.semestre.toString() === horario.semestre.toString() &&
        h.paralelo === horario.paralelo
    );
    if (index !== -1) {
      horariosGuardados[index] = horario;
    } else {
      horariosGuardados.push(horario);
    }
    localStorage.setItem("horarios", JSON.stringify(horariosGuardados));
    alert("Horario actualizado correctamente.");
    window.location.reload();  // Recarga toda la página
  };

  const eliminarHorarioCompleto = () => {
    if (!window.confirm("¿Seguro que quieres eliminar este horario?")) return;

    const horariosGuardados = JSON.parse(localStorage.getItem("horarios")) || [];
    const nuevosHorarios = horariosGuardados.filter(
      (h) =>
        !(
          h.carrera === horario.carrera &&
          h.semestre.toString() === horario.semestre.toString() &&
          h.paralelo === horario.paralelo
        )
    );
    localStorage.setItem("horarios", JSON.stringify(nuevosHorarios));
    setHorario(null);
    alert("Horario eliminado.");
  };

  return (
    <>
      <Header />

      <div className="container">
        <aside className="sidebar">
          <img src={logo} alt="Logo" />
          <h1>Administrador</h1>
          <button onClick={() => (window.location.href = "/crear-horario")}>
            Crear Horario
          </button>
        </aside>

        <main className="main">
          <h2>Administración de Horarios</h2>

          <form onSubmit={consultarHorarioAdmin}>
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

            <button type="submit">Consultar Horario</button>
          </form>

          {horario && (
            <div className="horario" style={{ marginTop: "1.5rem" }}>
              <h3>
                Horario para {horario.carrera} - Semestre {horario.semestre} -
                Paralelo {horario.paralelo}
              </h3>

              {Object.keys(horario.materias).map((dia) => (
                <div key={dia}>
                  <h4>{dia.charAt(0).toUpperCase() + dia.slice(1)}</h4>

                  <button type="button" onClick={() => agregarMateria(dia)}>
                    ➕ Agregar materia
                  </button>

                  {horario.materias[dia].length === 0 ? (
                    <p>No hay materias.</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Materia</th>
                          <th>Inicio</th>
                          <th>Fin</th>
                          <th>Profesor</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {horario.materias[dia].map((m, i) => (
                          <tr key={i}>
                            <td>
                              <input
                                type="text"
                                value={m.nombre}
                                onChange={(e) =>
                                  editarMateria(dia, i, "nombre", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="time"
                                value={m.inicio}
                                onChange={(e) =>
                                  editarMateria(dia, i, "inicio", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="time"
                                value={m.fin}
                                onChange={(e) =>
                                  editarMateria(dia, i, "fin", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <select
                                value={m.profesorEmail || ""}
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
                            </td>
                            <td>
                              <button onClick={() => eliminarMateria(dia, i)}>❌</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}

              <button onClick={guardarCambios}>Guardar Cambios</button>
              <button
                onClick={eliminarHorarioCompleto}
                style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
              >
                Eliminar Horario Completo
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default AdminHorario;
