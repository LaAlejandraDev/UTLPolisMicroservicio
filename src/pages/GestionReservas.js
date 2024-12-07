import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from 'sweetalert2';
import "./style.css";

const GestionReservas = () => {
    // Estado para Proyecciones
    const [proyeccionList, setProyecciones] = useState([]);
    const [idProyeccion, setIdProyeccion] = useState(0);
    const [idSala, setIdSala] = useState(0);
    const [tipoProyector, setTipoProyector] = useState('');
    const [formatoSonido, setFormatoSonido] = useState('');
    const [editar, setEditar] = useState(false);

    // Estado para Salas
    const [salas, setSalas] = useState([]);

    // Función para obtener las proyecciones (comentada)
    // const obtenerProyecciones = () => {
    //     axios.get('http://localhost:3001/proyeccion/getAllProyecciones')
    //         .then((response) => setProyecciones(response.data))
    //         .catch((error) => console.error('Error al obtener las proyecciones: ', error));
    // };

    // Función para obtener las salas (comentada)
    // const obtenerSalas = () => {
    //     axios.get('http://localhost:3001/sala/getAllSalas')
    //         .then((response) => setSalas(response.data))
    //         .catch((error) => console.error('Error al obtener las salas: ', error));
    // };

    // Función para eliminar una proyección (comentada)
    // const eliminarProyeccion = (idProyeccion) => {
    //     Swal.fire({
    //         title: "¿Confirmar eliminación?",
    //         html: `<i>¿Realmente desea eliminar la proyección con ID <strong>${idProyeccion}</strong>?</i>`,
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Sí, eliminar"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axios.post('http://localhost:3001/proyeccion/eliminarProyeccion', { idProyeccion })
    //                 .then((response) => {
    //                     obtenerProyecciones();
    //                     Swal.fire({
    //                         title: "¡Eliminado!",
    //                         text: "La proyección ha sido eliminada correctamente.",
    //                         icon: "success",
    //                         showConfirmButton: false,
    //                         timer: 1500
    //                     });
    //                 })
    //                 .catch((error) => {
    //                     console.error("Error al eliminar la proyección:", error);
    //                     Swal.fire({
    //                         title: "¡Oops!",
    //                         text: "No se pudo eliminar la proyección.",
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

    // Función para crear una nueva proyección (comentada)
    // const crearNuevaProyeccion = () => {
    //     axios.post('http://localhost:3001/proyeccion/crearNuevaProyeccion', {
    //         idSala,
    //         tipoProyector,
    //         formatoSonido
    //     }).then(() => {
    //         obtenerProyecciones();
    //         limpiarCampos();
    //         Swal.fire({
    //             title: "<strong>¡Registro exitoso!</strong>",
    //             html: `<i>La proyección ha sido registrada correctamente.</i>`,
    //             icon: 'success',
    //             timer: 1500,
    //             showConfirmButton: false
    //         });
    //     }).catch(function (error) {
    //         Swal.fire({
    //             title: "Ooops!",
    //             text: "La proyección no ha sido agregada.",
    //             icon: "error",
    //             footer: error.message === "Network Error" ? "Intente más tarde" : error.message
    //         });
    //     });
    // };

    // Función para actualizar una proyección (comentada)
    // const actualizarProyeccion = () => {
    //     const data = {
    //         idProyeccion,
    //         tipoProyector,
    //         formatoSonido
    //     };
    //     axios.post('http://localhost:3001/proyeccion/modificarProyeccion', data)
    //         .then((response) => {
    //             obtenerProyecciones();
    //             setEditar(false);
    //             Swal.fire({
    //                 title: "<strong>¡Actualización exitosa!</strong>",
    //                 html: `<i>La proyección con ID <strong>${data.idProyeccion}</strong> ha sido actualizada correctamente.</i>`,
    //                 icon: 'success',
    //                 timer: 1500,
    //                 showConfirmButton: false
    //             });
    //         })
    //         .catch((error) => {
    //             console.error('Error al actualizar la proyección:', error);
    //             Swal.fire({
    //                 title: "¡Error!",
    //                 text: "No se pudo actualizar la proyección.",
    //                 icon: "error",
    //                 footer: error.message === "Network Error"
    //                     ? "Problemas de conexión, intenta más tarde."
    //                     : error.message,
    //             });
    //         });
    // };

    // Función para editar una proyección (comentada)
    // const editarProyeccion = (proyeccion) => {
    //     setIdProyeccion(proyeccion.idProyeccion);
    //     setIdSala(proyeccion.idSala);
    //     setTipoProyector(proyeccion.tipoProyector);
    //     setFormatoSonido(proyeccion.formatoSonido);
    //     setEditar(true);
    // };

    // Limpiar campos (comentada)
    // const limpiarCampos = () => {
    //     setIdProyeccion(0);
    //     setIdSala(0);
    //     setTipoProyector('');
    //     setFormatoSonido('');
    //     setEditar(false);
    // };

    // Efecto al cargar el componente (comentado)
    // useEffect(() => {
    //     obtenerSalas();
    //     obtenerProyecciones();
    // }, []);

    return (
        <div className="content">
            <div className="container py-5">
                <div className="container p-3">
                    <h2>Gestión de Proyecciones <i className="mdi mdi-theater"></i></h2>
                </div>
                <div className="row">
                    <div className="col-md-5 mb-4">
                        <div className="formulario-container shadow rounded-4">
                            <div className="header-bar d-flex justify-content-center align-items-center text-white px-3 py-2">
                                <div className="d-flex align-items-center">
                                    <i className="mdi mdi-theater mr-2 fw-bold"></i> Gestión de Proyecciones de Salas
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="mb-3">
                                    <label htmlFor="idProyeccion" className="form-label fw-bold">ID Proyección</label>
                                    <input
                                        type="number"
                                        id="idProyeccion"
                                        name="idProyeccion"
                                        className="form-control"
                                        value={idProyeccion}
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
                                    <label htmlFor="txtTipoProyector" className="form-label">Tipo de Proyector</label>
                                    <input
                                        type="text"
                                        id="tipoProyector"
                                        name="tipoProyector"
                                        className="form-control"
                                        value={tipoProyector}
                                        onChange={(e) => setTipoProyector(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="txtFormatoSonido" className="form-label">Formato de Sonido</label>
                                    <input
                                        type="text"
                                        id="formatoSonido"
                                        name="formatoSonido"
                                        className="form-control"
                                        value={formatoSonido}
                                        onChange={(e) => setFormatoSonido(e.target.value)}
                                    />
                                </div>

                                <div className="d-flex justify-content-center">
                                    {editar ? (
                                        <div>
                                            <button className='btn btn-warning me-2'>Actualizar</button>
                                            <button className='btn btn-danger'>Cancelar</button>
                                        </div>
                                    ) : (
                                        <button className="btn btn-style w-50">Registrar Proyección</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <div className="header-bar"><i className="mdi mdi-format-list-bulleted"></i> Lista de Proyecciones</div>
                        <div className="table-responsive">
                            <table className="table text-center align-middle table-hover rounded-4">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Sala</th>
                                        <th scope="col">Tipo Proyector</th>
                                        <th scope="col">Formato Sonido</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proyeccionList.map((proyeccion) => (
                                        <tr key={proyeccion.idProyeccion}>
                                            <td>{proyeccion.idProyeccion}</td>
                                            <td>{proyeccion.idSala}</td>
                                            <td>{proyeccion.tipoProyector}</td>
                                            <td>{proyeccion.formatoSonido}</td>
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

export default GestionReservas
