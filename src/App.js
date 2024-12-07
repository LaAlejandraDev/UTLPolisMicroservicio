import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GestionSalas from "./pages/GestionSalas";
import GestionHorarios from "./pages/GestionHorariosSalas";
import GestionProyeccion from "./pages/GestionProyeccion";
import GestionMantenimiento from "./pages/GestionMantenimiento";
import GestionReservas from "./pages/GestionReservas"
import SideBar from "./components/SideBar";

function App() {
  return (
    <Router>
      <div className="app-container">
        <SideBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<GestionSalas />} />
            <Route path="/salas" element={<GestionSalas />} />
            <Route path="/horarios" element={<GestionHorarios />} />
            <Route path="/proyeccion" element={<GestionProyeccion />} />
            <Route path="/mantenimiento" element={<GestionMantenimiento />} />
            <Route path="/reservas" element={<GestionReservas />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
