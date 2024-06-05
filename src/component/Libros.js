import React, { useEffect, useState } from "react";
import axios from "axios";
import { show_alerta } from '../functions'
const Libros = () => {
    var url = 'https://localhost:44391/api/Libros';
    const [listaLibros, setListaLibros] = useState([]);
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [urls, setUrls] = useState('');
    const [count, setCount] = useState(0);
    const [activo, setActivo] = useState(true);
    const [operacion, setOperacion] = useState(1);
    const [id, setId] = useState(1);
    const [tituloLibro, setTituloLibro] = useState('');

    useEffect(() => {
        getListaLibros();
    }, []);


    const getListaLibros = async () => {

        const response = axios.get(url).then(function (response) {

            setListaLibros(response.data);
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
            setListaLibros([]);
        });
        setListaLibros(response.data);

        console.log(response.data);
    }

    const openModal = (op, id, nombre, title, descripcion, urls, count) => {
        setId('');
        setName('');
        setUrls('');
        setActivo('');
        setDescription('');
        setOperacion(op);
        setTituloLibro('');
        setCount(0);

        if (op == 1) {
            setTitle('Registrar un libro ');
        } else if (op == 2) {
            setTitle('Editar un libro ');
            setId(id);
            setName(nombre);
            setUrls(urls);
            setActivo(true);
            setDescription(descripcion);
            setTituloLibro(title);
            setCount(count);
        }

        window.setTimeout(function () {
            document.getElementById('nombre').focus();
        }, 500);

    }

    const validarCampos = () => {

        var params;
        var metodo;
        if (name.trim() == '') {
            show_alerta('Escribe el nombre de  un libro.', 'warning');
        } else if (tituloLibro.trim() == '') {
            show_alerta('Escribe el titulo del libro', 'warning');
        } else if (description.trim() == '') {
            show_alerta('Escribe una descripcion del libro', 'warning');
        } else if (count == 0) {
            show_alerta('Agrega una cantidad de libro', 'warning');
        } else {
            if (operacion === 1) {
                params = { id: 0, name: name.trim(), description: description.trim(), title: tituloLibro.trim(), url: urls.trim(), count: count, isDeleted: true };
                metodo = 'POST';
            } else {
                params = { id: id, name: name.trim(), description: description.trim(), title: tituloLibro.trim(), url: urls.trim(), count: count, isDeleted: true };
                metodo = 'PUT';

                url = url + '/' + id
            }
            enviarSolicitud(metodo, params);
        }
    }

    const enviarSolicitud = async (met, para) => {
        await axios({ method: met, url: url, data: para }).then(function (respuesta) {
            console.log(respuesta);
            if (respuesta.status == 201) {
                if (met == 'POST') {
                    show_alerta('Se agrego correctamente el libro ', 'success');
                    document.getElementById('btnCerrar').click();
                    getListaLibros();
                }
                if(met =='PUT'){

                }

            }
        }).catch(function (error) {
            show_alerta('Error en la solicitud', 'error');
            console.log(error);
        });
    }

    return (
        <>
            <div className="App">
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-md-4 offset-4">
                            <div className="d-grid mx-auto">
                                <button onClick={() => { openModal(1) }} className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalLibros">
                                    <i className="fa-solid fa-circle-plus"></i> Añadir
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="row mt-3">
                        <div className="col-12 col-lg-8 offset-0 offset-lg-12">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Titulo</th>
                                            <th>Descripcion</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {
                                            listaLibros && listaLibros.map((listaLibro, i) => (
                                                <tr key={listaLibro.id}>
                                                    <td>{(i + 1)}</td>
                                                    <td>{(listaLibro.name)}</td>
                                                    <td>{(listaLibro.title)}</td>
                                                    <td>{(listaLibro.description)}</td>
                                                    <th>
                                                        <button onClick={() => { openModal(2, listaLibro.id, listaLibro.name, listaLibro.title, listaLibro.description, listaLibro.url, listaLibro.count) }} className="btn btn-warning"
                                                            data-bs-toggle='modal' data-bs-target='#modalLibros'>
                                                            <i className="fa-solid fa-edit"></i>
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button className="btn btn-danger">
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </th>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="modalLibros" className="modal fade" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <label className="h5">{title}</label>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                            </div>
                            <div className="modal-body">
                                <input type="hidden" id="id"></input>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                                    <input type="text" id="nombre" className="form-control" placeholder="nombre" value={name}
                                        onChange={(e) => setName(e.target.value)}></input>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-comment"></i></span>
                                    <input type="text" id="titulo" className="form-control" placeholder="titulo" value={tituloLibro}
                                        onChange={(e) => setTituloLibro(e.target.value)}></input>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-comment"></i></span>
                                    <input type="text" id="description" className="form-control" placeholder="description" value={description}
                                        onChange={(e) => setDescription(e.target.value)}></input>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-web-awesome"></i></span>
                                    <input type="text" id="urls" className="form-control" placeholder="urls" value={urls}
                                        onChange={(e) => setUrls(e.target.value)}></input>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-hashtag"></i></span>
                                    <input type="text" id="count" className="form-control" placeholder="count" value={count}
                                        onChange={(e) => setCount(e.target.value)}></input>
                                </div>
                                <div className="d-grid col-6 mx-auto">
                                    <button onClick={() => { validarCampos() }} className="btn btn-success">
                                        <i className="fa-solid fa-floppy-disk"></i>Guardar
                                    </button>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="btnCerrar" type="button" className="btn btn-secundary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Libros;