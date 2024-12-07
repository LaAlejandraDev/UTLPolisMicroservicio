import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SideBar from "../components/SideBar";
import "./style.css";
import Swal from 'sweetalert2';

const GestionHorariosSalas = () => {
    // Estado para Horarios
    const [horariosList, setHorarios] = useState([]);
    const [idHorarioSala, setIdHorarioSala] = useState(0);
    const [idSala, setIdSala] = useState(0);
    const [idPelicula, setIdPelicula] = useState(0);
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [fecha, setFecha] = useState('');
    const [estatusHorarioSala, setEstatusHorarioSala] = useState(0);
    const [editar, setEditar] = useState(false);

    // Estado para Salas y Proyecciones
    const [salas, setSalas] = useState([]);
    const [peliculas, setPeliculas] = useState([]);



    // Función para obtener horarios
    const obtenerHorarios = () => {
        //axios.get('http://10.16.20.135:3001/horarios/getAllHorariosProyeccion')
        axios.get('http://localhost:3001/horarios/getAllHorariosSalas')
            .then((response) => setHorarios(response.data))
            .catch((error) => console.error('Error al obtener los horarios: ', error));
    };

    // Función para obtener salas
    const obtenerSalas = () => {
        axios.get('http://10.16.3.218:8080/SalaCine/api/sala/cine')
            .then((response) => setSalas(response.data))
            .catch((error) => console.error('Error al obtener las salas: ', error));
    };

    // Función para obtener peliculas
    const obtenerPeliculas = () => {
        axios.get('http://localhost:3001/horarios/getAllPeliculas')
            .then((response) => setPeliculas(response.data))
            .catch((error) => console.error('Error al obtener las proyecciones: ', error));
    };

    // Función para eliminar un horario
    const eliminarHorario = (idHorarioSala) => {
        Swal.fire({
            title: "¿Confirmar eliminación?",
            html: `<i>¿Realmente desea eliminar el horario con ID <strong>${idHorarioSala}</strong>?</i>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:3001/horarios/eliminarHorario', { idHorarioSala })
                    .then((response) => {
                        obtenerHorarios();
                        Swal.fire({
                            title: "¡Eliminado!",
                            text: "El horario ha sido eliminado correctamente.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch((error) => {
                        console.error("Error al eliminar el horario:", error);
                        Swal.fire({
                            title: "¡Oops!",
                            text: "No se pudo eliminar el horario.",
                            icon: "error",
                            footer: JSON.parse(JSON.stringify(error)).message === "Network Error"
                                ? "Problemas de conexión, intenta más tarde."
                                : JSON.parse(JSON.stringify(error)).message
                        });
                    });
            }
        }).catch((error) => {
            console.error("Error al confirmar eliminación:", error);
        });
    };


    // Función para crear un nuevo horario
    const crearNuevoHorario = () => {
        axios.post('http://localhost:3001/horarios/crearNuevoHorario', {
            idSala: idSala,
            idPelicula: idPelicula,
            horaInicio: horaInicio,
            horaFin: horaFin,
            fecha: fecha
        }).then(() => {
            obtenerHorarios();
            limpiarCampos();
            Swal.fire({
                title: "<strong>¡Registro exitosa!</strong>",
                html: `<i>El horario ha sido registrado correctamente.</i>`,
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        }).catch(function (error) {
            Swal.fire({
                title: "Ooops!",
                text: "El horario no ha sido agregado.",
                icon: "error",
                footer: JSON.parse(JSON.stringify(error)).message == "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
            });
        });
    };

    const actualizarHorario = () => {
        const data = {
            idHorarioSala: idHorarioSala,
            estatusHorarioSala: estatusHorarioSala
        };

        console.log("Datos enviados:", data);

        axios.post('http://localhost:3001/horarios/modificarHorario', data)
            .then((response) => {
                obtenerHorarios();
                setEditar(false);
                Swal.fire({
                    title: "<strong>¡Actualización exitosa!</strong>",
                    html: `<i>El horario con ID <strong>${data.idHorarioSala}</strong> ha sido actualizado correctamente.</i>`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            })
            .catch((error) => {
                console.error('Error al actualizar el horario:', error);
                Swal.fire({
                    title: "¡Error!",
                    text: "No se pudo actualizar el horario.",
                    icon: "error",
                    footer: JSON.parse(JSON.stringify(error)).message === "Network Error"
                        ? "Problemas de conexión, intenta más tarde."
                        : JSON.parse(JSON.stringify(error)).message,
                });
            });
    };


    const editarHorario = (horario) => {
        setIdHorarioSala(horario.idHorarioSala);
        setIdSala(horario.idSala);
        setIdPelicula(horario.idPelicula);
        setHoraInicio(horario.horaInicio);
        setHoraFin(horario.horaFin);
        const fechaFormateada = new Date(horario.fecha).toISOString().split('T')[0];
        setFecha(fechaFormateada);
        setEstatusHorarioSala(horario.estatusHorarioSala);
        setEditar(true);
        console.log("Editar horario:", horario);
    };

    const limpiarCampos = () => {
        setIdHorarioSala(0);
        setIdSala(0);
        setIdPelicula(0);
        setHoraInicio('');
        setHoraFin('');
        setFecha('');
        setEstatusHorarioSala(0);
        setEditar(false);
    };

    useEffect(() => {
        obtenerSalas();
        obtenerPeliculas();
        obtenerHorarios();
    }, []);

    const estatusAceptados = {
        1: 'Disponible',
        2: 'Cancelado',
        0: 'Inactivo'
    };


    return (
        <div className="content">
            <div className="container py-5">
                <div className="container p-3">
                    <h2>Gestión de Horarios de Salas <i className="mdi mdi-theater"></i></h2>
                </div>
                <div className="row">
                    <div className="col-md-5 mb-4">
                        <div className="formulario-container shadow rounded-4">
                            <div className="header-bar d-flex justify-content-center align-items-center text-white px-3 py-2">
                                <div className="d-flex align-items-center">
                                    <i className="mdi mdi-theater mr-2 fw-bold"></i> Gestión de Horarios de Salas
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label fw-bold">ID Horario de Sala</label>
                                    <input
                                        type="number"
                                        id="horarioPidHorarioSalaroyeccion_id"
                                        name="idHorarioSala"
                                        className="form-control"
                                        value={idHorarioSala}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="txtSala" className="form-label">Salas</label>
                                    <select value={idSala} className="form-select" onChange={(event) => setIdSala(event.target.value)} >
                                        <option value={''}>Selecciona la sala</option>
                                        {salas.map((sala) => (
                                            <option key={sala.idSala} value={sala.idSala}>{sala.idSala}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="txtPelicula" className="form-label">Peliculas</label>
                                    <select value={idPelicula} className="form-select" onChange={(event) => setIdPelicula(event.target.value)}>
                                        <option value={''}>Selecciona la película</option>
                                        {peliculas.map((pelicula) => (
                                            <option key={pelicula.idPelicula} value={pelicula.idPelicula}>{pelicula.idPelicula}</option>
                                        ))}
                                    </select>

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="horaInicio" className="form-label">Hora de Inicio</label>
                                    <input
                                        type="time"
                                        id="horaInicio"
                                        name="horaInicio"
                                        className="form-control"
                                        required
                                        value={horaInicio}
                                        onChange={(e) => setHoraInicio(e.target.value)} // Asegúrate de actualizar el estado correctamente
                                    />

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="horaFin" className="form-label">Hora de Fin</label>
                                    <input
                                        type="time"
                                        id="horaFin"
                                        name="horaFin"
                                        className="form-control"
                                        required
                                        value={horaFin}
                                        onChange={(e) => setHoraFin(e.target.value)} // Asegúrate de actualizar el estado correctamente
                                    />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="horaFin" className="form-label">Fecha</label>
                                    <input
                                        type="date"
                                        id="fecha"
                                        name="fecha"
                                        className="form-control"
                                        required
                                        value={fecha}
                                        onChange={(e) => setFecha(e.target.value)} // Asegúrate de actualizar el estado correctamente
                                    />

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="txtEstatusSala" className="form-label">Estatus</label>
                                    <select
                                        id="txtEstatusSala"
                                        name="estatusSala"
                                        className="form-select"
                                        value={estatusHorarioSala}
                                        onChange={(event) => setEstatusHorarioSala(Number(event.target.value))}
                                    >
                                        <option value="">Selecciona el Estatus</option>
                                        <option value="1">Disponible</option>
                                        <option value="2">Cancelado</option>
                                        <option value="0" disabled>Inactivo</option>
                                    </select>



                                </div>
                                <div className="d-flex justify-content-center">
                                    {editar ? (
                                        <div>
                                            <button className='btn btn-warning me-2' onClick={actualizarHorario}>Actualizar</button>
                                            <button className='btn btn-danger' onClick={limpiarCampos}>Cancelar</button>
                                        </div>
                                    ) : (
                                        <button className="btn btn-style w-50" onClick={crearNuevoHorario}>
                                            Registrar Sala
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <div className="header-bar"><i className="mdi mdi-format-list-bulleted"></i> Lista de Horarios</div>
                        <div className="table-responsive">
                            <table className="table text-center align-middle table-hover rounded-4">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Pelicula</th>
                                        <th scope="col">Sala</th>
                                        <th scope="col">Horario</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Estatus</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {horariosList.map((horario) => (
                                        <tr key={horario.idHorarioSala}>
                                            <td>{horario.idHorarioSala}</td>
                                            <td>{horario.nombrePelicula}</td>
                                            <td>{horario.idSala}</td>
                                            <td>{`${horario.horaInicio} - ${horario.horaFin}`}</td>
                                            <td>{horario.fecha}</td>
                                            <td>
                                                <span className={`badge-status 
                                                    ${horario.estatusHorarioSala === 1 ? 'estatusProgramado' : ''}
                                                    ${horario.estatusHorarioSala === 2 ? 'estatusCancelado' : ''}
                                                    ${horario.estatusHorarioSala === 0 ? 'estatusInactivo' : ''}`}
                                                >
                                                    {estatusAceptados[horario.estatusHorarioSala]}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="btn btn-outline-primary btn-sm" onClick={() => editarHorario(horario)}>Editar</button>
                                                <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarHorario(horario.idHorarioSala)}>Eliminar</button>
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

export default GestionHorariosSalas
