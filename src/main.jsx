import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout.jsx";
import App from './App.jsx';
import Login from './components/Login.jsx';
import Registro from './components/Registro.jsx';
import HorarioEstudiante from "./components/HorarioEstudiante.jsx";
import AdminHorario from "./components/AdminHorario.jsx";
import ProfesorHorario from "./components/ProfesorHorario.jsx";
import CrearHorario from "./components/CrearHorario.jsx";
import './App.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Layout común para todas las rutas */}
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />                      {/* / */}
        <Route path="login" element={<Login />} />             {/* /login */}
        <Route path="registro" element={<Registro />} />       {/* /registro */}
        <Route path="estudiante" element={<HorarioEstudiante />} /> {/* /estudiante */}
      
      </Route>
      
        <Route path="admin-horario" element={<AdminHorario />} />   {/* /admin-horario */}
        <Route path="profesor-horario" element={<ProfesorHorario />} /> {/* /profesor-horario */}
        <Route path="crear-horario" element={<CrearHorario />} /> {/* /crear-horario */}
        
    </Routes>
  </BrowserRouter>
);

