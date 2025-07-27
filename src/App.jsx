import React from 'react';
import { Link } from 'react-router-dom';
import modo from './assets/modo.jpeg';

function App() {
  return (
    <div className="app-container">
      
      <main>
        <h2>Bienvenidos al Sistema de Horarios de la Uleam</h2>
        <hr />
        <section className="horarios-link">
          <Link to="/estudiante">📚Horarios Estudiantes📚</Link>
        </section>
        <img src={modo} alt="Foto modo" className="modo-image" />
      </main>
    </div>
  );
}

export default App;
