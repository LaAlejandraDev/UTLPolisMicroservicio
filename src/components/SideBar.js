import React from "react";
import { Link, useLocation } from "react-router-dom";
import { mdiTheater, mdiClock, mdiFilmstrip, mdiWrench, mdiBookmarkCheck } from '@mdi/js';
import Icon from '@mdi/react'; // Importa el componente Icon
import "./SideBar.css";

const SideBar = () => {
    const location = useLocation();
    const activePath = location.pathname;

    return (
        <div id="sidebar" className="sidebar expanded">
            <h4>UTLPolis</h4>
            <Link to="/salas" className={activePath === "/salas" ? "active" : ""}>
                <Icon path={mdiTheater} size={1} /> {}
                <span>Gestión de Salas</span>
            </Link>
            <Link
                to="/horarios"
                className={activePath === "/horarios" ? "active" : ""}
            >
                <Icon path={mdiClock} size={1} />
                <span>Gestión de Horarios</span>
            </Link>
            <Link
                to="/proyeccion"
                className={activePath === "/proyeccion" ? "active" : ""}
            >
                <Icon path={mdiFilmstrip} size={1} />
                <span>Gestión de Proyección</span>
            </Link>
            <Link
                to="/mantenimiento"
                className={activePath === "/mantenimiento" ? "active" : ""}
            >
                <Icon path={mdiWrench} size={1} />
                <span>Gestión de Mantenimiento</span>
            </Link>
            <Link
                to="/reservas"
                className={activePath === "/reservas" ? "active" : ""}
            >
                <Icon path={mdiBookmarkCheck} size={1} />
                <span>Gestión de Reservas</span>
            </Link>
        </div>
    );
};

export default SideBar;
