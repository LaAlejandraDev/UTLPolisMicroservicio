import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from 'sweetalert2';
import "./style.css";

const GestionMantenimiento = () => {
    // Estado para Mantenimientos
    const [mantenimientoList, setMantenimientos] = useState([]);
    const [idMantenimiento, setIdMantenimiento] = useState(0);
    const [idSala, setIdSala] = useState(0);
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [estatus, setEstatus] = useState(1); // Estatus por defecto: 1 (Disponible)
    const [editar, setEditar] = useState(false);

    // Estado para Salas
    const [salas, setSalas] = useState([]);

    // Función para obtener los mantenimientos (comentada)
    // const obtenerMantenimientos = () => {
    //     axios.get('http://localhost:3001/mantenimiento/getAllMantenimientos')
    //         .then((response) => setMantenimientos(response.data))
    //         .catch((error) => console.error('Error al obtener los mantenimientos: ', error));
    // };

    // Función para obtener las salas (comentada)
    // const obtenerSalas = () => {
    //     axios.get('http://localhost:3001/sala/getAllSalas')
    //         .then((response) => setSalas(response.data))
    //         .catch((error) => console.error('Error al obtener las salas: ', error));
    // };

    // Función para eliminar un mantenimiento (comentada)
    // const eliminarMantenimiento = (idMantenimiento) => {
    //     Swal.fire({
    //         title: "¿Confirmar eliminación?",
    //         html: `<i>¿Realmente desea eliminar el mantenimiento con ID <strong>${idMantenimiento}</strong>?</i>`,
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Sí, eliminar"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axios.post('http://localhost:3001/mantenimiento/eliminarMantenimiento', { idMantenimiento })
    //                 .then((response) => {
    //                     obtenerMantenimientos();
    //                     Swal.fire({
    //                         title: "¡Eliminado!",
    //                         text: "El mantenimiento ha sido eliminado correctamente.",
    //                         icon: "success",
    //                         showConfirmButton: false,
    //                         timer: 1500
    //                     });
    //                 })
    //                 .catch((error) => {
    //                     console.error("Error al eliminar el mantenimiento:", error);
    //                     Swal.fire({
    //                         title: "¡Oops!",
    //                         text: "No se pudo eliminar el mantenimiento.",
    //                         icon: "error",
    //                         footer: error.message === "Network Error"
    //                             ? "Problemas de conexión, intenta más tarde."
    //                             : error.message
    //                     });
    //                 });
    //         }
    //     }).catch((error) => {
    //         console.error("Error al confirmar eliminación:", error);
    //     });
    // };

    // Función para crear un nuevo mantenimiento (comentada)
    // const crearNuevoMantenimiento = () => {
    //     axios.post('http://localhost:3001/mantenimiento/crearNuevoMantenimiento', {
    //         idSala,
    //         descripcion,
    //         fechaInicio,
    //         fechaFin,
    //         estatus
    //     }).then(() => {
    //         obtenerMantenimientos();
    //         limpiarCampos();
    //         Swal.fire({
    //             title: "<strong>¡Registro exitoso!</strong>",
    //             html: `<i>El mantenimiento ha sido registrado correctamente.</i>`,
    //             icon: 'success',
    //             timer: 1500,
    //             showConfirmButton: false
    //         });
    //     }).catch(function (error) {
    //         Swal.fire({
    //             title: "Ooops!",
    //             text: "El mantenimiento no ha sido agregado.",
    //             icon: "error",
    //             footer: error.message === "Network Error" ? "Intente más tarde" : error.message
    //         });
    //     });
    // };

    // Función para actualizar el mantenimiento (comentada)
    // const actualizarMantenimiento = () => {
    //     const data = {
    //         idMantenimiento,
    //         estatus
    //     };
    //     axios.post('http://localhost:3001/mantenimiento/modificarMantenimiento', data)
    //         .then((response) => {
    //             obtenerMantenimientos();
    //             setEditar(false);
    //             Swal.fire({
    //                 title: "<strong>¡Actualización exitosa!</strong>",
    //                 html: `<i>El mantenimiento con ID <strong>${data.idMantenimiento}</strong> ha sido actualizado correctamente.</i>`,
    //                 icon: 'success',
    //                 timer: 1500,
    //                 showConfirmButton: false
    //             });
    //         })
    //         .catch((error) => {
    //             console.error('Error al actualizar el mantenimiento:', error);
    //             Swal.fire({
    //                 title: "¡Error!",
    //                 text: "No se pudo actualizar el mantenimiento.",
    //                 icon: "error",
    //                 footer: error.message === "Network Error"
    //                     ? "Problemas de conexión, intenta más tarde."
    //                     : error.message,
    //             });
    //         });
    // };

    // Función para editar un mantenimiento (comentada)
    // const editarMantenimiento = (mantenimiento) => {
    //     setIdMantenimiento(mantenimiento.idMantenimiento);
    //     setIdSala(mantenimiento.idSala);
    //     setDescripcion(mantenimiento.descripcion);
    //     setFechaInicio(mantenimiento.fechaInicio);
    //     setFechaFin(mantenimiento.fechaFin);
    //     setEstatus(mantenimiento.estatus);
    //     setEditar(true);
    // };

    // Limpiar campos (comentada)
    // const limpiarCampos = () => {
    //     setIdMantenimiento(0);
    //     setIdSala(0);
    //     setDescripcion('');
    //     setFechaInicio('');
    //     setFechaFin('');
    //     setEstatus(1);
    //     setEditar(false);
    // };

    // Efecto al cargar el componente (comentado)
    // useEffect(() => {
    //     obtenerSalas();
    //     obtenerMantenimientos();
    // }, []);

    // Estatus aceptados (comentado)
    // const estatusAceptados = {
    //     1: 'Disponible',
    //     2: 'Cancelado',
    //     3: 'En uso',
    //     4: 'Finalizado',
    //     0: 'Inactivo'
    // };

    return (
        <div className="content">
            <div className="container py-5">
                <div className="container p-3">
                    <h2>Gestión de Mantenimiento de Salas <i className="mdi mdi-theater"></i></h2>
                </div>
                <div className="row">
                    <div className="col-md-5 mb-4">
                        <div className="formulario-container shadow rounded-4">
                            <div className="header-bar d-flex justify-content-center align-items-center text-white px-3 py-2">
                                <div className="d-flex align-items-center">
                                    <i className="mdi mdi-theater mr-2 fw-bold"></i> Gestión de Mantenimiento
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="mb-3">
                                    <label htmlFor="idMantenimiento" className="form-label fw-bold">ID Mantenimiento</label>
                                    <input
                                        type="number"
                                        id="idMantenimiento"
                                        name="idMantenimiento"
                                        className="form-control"
                                        value={idMantenimiento}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="txtSala" className="form-label">Sala</label>
                                    <select value={idSala} className="form-select" onChange={(event) => setIdSala(event.target.value)}>
                                        <option value={''}>Selecciona la sala</option>
                                        {salas.map((sala) => (
                                            <option key={sala.idSala} value={sala.idSala}>{sala.idSala}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="txtDescripcion" className="form-label">Descripción</label>
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        className="form-control"
                                        rows="3"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="fechaInicio" className="form-label">Fecha y Hora de Inicio</label>
                                    <input
                                        type="datetime-local"
                                        id="fechaInicio"
                                        name="fechaInicio"
                                        className="form-control"
                                        value={fechaInicio}
                                        onChange={(e) => setFechaInicio(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="fechaFin" className="form-label">Fecha Fin</label>
                                    <input
                                        type="date"
                                        id="fechaFin"
                                        name="fechaFin"
                                        className="form-control"
                                        value={fechaFin}
                                        onChange={(e) => setFechaFin(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="estatus" className="form-label">Estatus</label>
                                    <select
                                        id="estatus"
                                        name="estatus"
                                        className="form-select"
                                        value={estatus}
                                        onChange={(e) => setEstatus(Number(e.target.value))}
                                    >
                                        <option value="1">Disponible</option>
                                        <option value="2">Cancelado</option>
                                        <option value="3">En uso</option>
                                        <option value="4">Finalizado</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </div>

                                <div className="d-flex justify-content-center">
                                    {editar ? (
                                        <div>
                                            <button className="btn btn-warning me-2">Actualizar</button>
                                            <button className="btn btn-danger">Cancelar</button>
                                        </div>
                                    ) : (
                                        <button className="btn btn-style w-50">Registrar Mantenimiento</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <div className="header-bar"><i className="mdi mdi-format-list-bulleted"></i> Lista de Mantenimientos</div>
                        <div className="table-responsive">
                            <table className="table text-center align-middle table-hover rounded-4">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Sala</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Fecha Inicio</th>
                                        <th scope="col">Fecha Fin</th>
                                        <th scope="col">Estatus</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mantenimientoList.map((mantenimiento) => (
                                        <tr key={mantenimiento.idMantenimiento}>
                                            <td>{mantenimiento.idMantenimiento}</td>
                                            <td>{mantenimiento.idSala}</td>
                                            <td>{mantenimiento.descripcion}</td>
                                            <td>{new Date(mantenimiento.fechaInicio).toLocaleString()}</td>
                                            <td>{mantenimiento.fechaFin ? new Date(mantenimiento.fechaFin).toLocaleDateString() : "N/A"}</td>
                                            <td>{mantenimiento.estatus}</td>
                                            <td>
                                                <button className="btn btn-outline-primary btn-sm">Editar</button>
                                                <button className="btn btn-outline-danger btn-sm">Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GestionMantenimiento;
