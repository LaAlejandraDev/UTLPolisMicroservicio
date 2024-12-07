import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from 'sweetalert2';
import "./style.css";

const GestionSalas = () => {
    // Estado para almacenar las salas
    const [salas, setSalas] = useState([]);

    // Función para obtener las salas desde la API
    const fetchSalas = async () => {
        try {
            const response = await fetch('http://10.16.3.218:8080/SalaCine/api/sala/cine');
            const data = await response.json();
            setSalas(data); // Actualizar el estado con las salas obtenidas
            console.log(response);
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al obtener las salas. Intenta de nuevo más tarde.",
                icon: "error",
            });
        }
    };

    // Ejecutar fetchSalas al cargar el componente
    useEffect(() => {
        fetchSalas();       
    }, []);

    return (
        <div className="content">
            <div className="container py-5">
                <div className="container p-3">
                    <h2>Gestión de Salas <i className="mdi mdi-theater"></i></h2>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="header-bar"><i className="mdi mdi-format-list-bulleted"></i> Lista de Salas</div>
                        <div className="table-responsive">
                            <table className="table text-center align-middle table-hover rounded-4">
                                <thead className="">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nombre de la Sala</th>
                                        <th scope="col">Capacidad</th>
                                        <th scope="col">Caracteristicas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salas.length > 0 ? (
                                        salas.map((sala) => (
                                            <tr key={sala.idSala}>
                                                <td>{sala.idSala}</td>
                                                <td>{sala.nombreSala}</td>
                                                <td>{sala.capacidadSala}</td>
                                                <td>{sala.caracteristicas}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No hay salas disponibles</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GestionSalas;
