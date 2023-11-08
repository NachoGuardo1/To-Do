import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPenToSquare,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

export const List = () => {
  const [tareas, setTareas] = useState([]);
  const [total, setTotal] = useState(0);
  const limite = total;

  const [nombreTarea, setNombreTarea] = useState("");
  const [descripcionTarea, setDescripcionTarea] = useState("");
  const [tareaEdit, setTareaEdit] = useState(null);

  useEffect(() => {
    traerTareas();
  }, []);

  const resetForm = () => {
    setNombreTarea("");
    setDescripcionTarea("");
  };

  const traerTareas = async () => {
    try {
      const resp = await axios.get(
        "https://testback4.onrender.com/api/tareas" +
          "?limite=" +
          limite +
          "&desde=" +
          0
      );
      const { total, tareas } = resp.data;
      setTotal(total);
      setTareas(tareas);
    } catch (error) {
      console.log(error);
    }
  };

  const crearTarea = async (e) => {
    e.preventDefault();
    const datos = {
      nombre: nombreTarea,
      descripcion: descripcionTarea,
    };
    try {
      const resp = await axios.post(
        "https://testback4.onrender.com/api/tareas",
        datos
      );
      resetForm();
      setTareas([...tareas, resp.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const borrarTarea = async (tarea) => {
    try {
      await axios.delete(
        "https://testback4.onrender.com/api/tareas/" + tarea._id
      );
      const tareasActualizadas = tareas.filter((t) => t._id !== tarea._id);
      setTareas(tareasActualizadas);
    } catch (error) {
      console.log(error);
    }
  };

  const guardarValores = (tarea) => {
    setNombreTarea(tarea.nombre);
    setDescripcionTarea(tarea.descripcion);
    setTareaEdit(tarea);
  };

  const editarValores = async (e) => {
    e.preventDefault();
    const datos = {
      nombre: nombreTarea,
      descripcion: descripcionTarea,
    };
    try {
      await axios.put(
        "https://testback4.onrender.com/api/tareas/" + tareaEdit._id,
        datos
      );
      resetForm();
      const tareasActualizadas = tareas.map((tarea) =>
        tarea._id === tareaEdit._id ? { ...tarea, ...datos } : tarea
      );
      setTareas(tareasActualizadas);
      setTareaEdit(null);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelarEdit = async () => {
    setTareaEdit(null);
    resetForm();
  };

  const tareaCompletada = async (tareaId) => {
    try {
      await axios.put(`https://testback4.onrender.com/api/tareas/${tareaId}`, {
        completada: true,
      });
      const nuevasTareas = tareas.map((tarea) =>
        tarea._id === tareaId ? { ...tarea, completada: true } : tarea
      );
      setTareas(nuevasTareas);
    } catch (error) {
      console.log(error);
    }
  };

  const tareaPendiente = async (tareaId) => {
    try {
      await axios.put(`https://testback4.onrender.com/api/tareas/${tareaId}`, {
        completada: false,
      });
      const nuevasTareas = tareas.map((tarea) =>
        tarea._id === tareaId ? { ...tarea, completada: false } : tarea
      );
      setTareas(nuevasTareas);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Crear Tarea</h3>
      <form className="mt-2 mb-5">
        <div>
          <input
            type="text"
            placeholder="Nombre de la tarea"
            className="form-control mb-3"
            value={nombreTarea}
            onChange={(e) => setNombreTarea(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Descripcion de la tarea"
            className="form-control mb-3"
            value={descripcionTarea}
            onChange={(e) => setDescripcionTarea(e.target.value)}
          />
        </div>
        <div>
          {tareaEdit === null ? (
            <button className="btn btn-success" onClick={crearTarea}>
              Crear
            </button>
          ) : (
            <>
              <button onClick={editarValores} className="btn btn-warning mx-2">
                Editar
              </button>
              <button onClick={cancelarEdit} className="btn btn-danger mx-2">
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
      <>
        <h3>Todas las tareas</h3>
        {tareas.map((tarea) => (
          <div
            key={tarea._id}
            className="container-fluid bg-dark text-light my-3 row"
          >
            <div className="col-6">
              <p>Tarea : {tarea.nombre}</p>
              <p>Descripcion: {tarea.descripcion}</p>
              <p>
                Fecha:{" "}
                {format(new Date(tarea.fechaCreacion), "dd/MM/yyyy HH:mm:ss")}
              </p>
            </div>
            <div className="col-4 my-auto">
              <button
                className="btn btn-danger ms-5 me-3"
                onClick={() => borrarTarea(tarea)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button
                className="btn btn-warning"
                onClick={() => guardarValores(tarea)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              {tarea.completada === true ? (
                <button
                  className="btn btn-primary ms-3"
                  onClick={() => tareaPendiente(tarea._id)}
                >
                  <FontAwesomeIcon icon={faSquareCheck} />
                </button>
              ) : (
                <button
                  className="btn btn-success ms-3"
                  onClick={() => tareaCompletada(tarea._id)}
                >
                  <FontAwesomeIcon icon={faSquareCheck} />
                </button>
              )}
            </div>
          </div>
        ))}
      </>
      <>
        {tareas.map((tarea) =>
          tarea.completada === true ? (
            <>
              <h3>Tareas Completadas</h3>
              <div
                key={tarea._id}
                className="container-fluid bg-dark text-light my-3 row"
              >
                <div className="col-6">
                  <p>Tarea : {tarea.nombre}</p>
                  <p>Descripcion: {tarea.descripcion}</p>
                  <p>
                    Fecha:{" "}
                    {format(
                      new Date(tarea.fechaCreacion),
                      "dd/MM/yyyy HH:mm:ss"
                    )}
                  </p>
                </div>
                <div className="col-4 my-auto">
                  <button
                    className="btn btn-danger ms-5 me-3"
                    onClick={() => borrarTarea(tarea)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => guardarValores(tarea)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  {tarea.completada === true ? (
                    <button
                      className="btn btn-primary ms-3"
                      onClick={() => tareaPendiente(tarea._id)}
                    >
                      <FontAwesomeIcon icon={faSquareCheck} />
                    </button>
                  ) : (
                    <button
                      className="btn btn-success ms-3"
                      onClick={() => tareaCompletada(tarea._id)}
                    >
                      <FontAwesomeIcon icon={faSquareCheck} />
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <h3>Tareas Pendientes</h3>
              <div
                key={tarea._id}
                className="container-fluid bg-dark text-light my-3 row"
              >
                <div className="col-6">
                  <p>Tarea : {tarea.nombre}</p>
                  <p>Descripcion: {tarea.descripcion}</p>
                  <p>
                    Fecha:{" "}
                    {format(
                      new Date(tarea.fechaCreacion),
                      "dd/MM/yyyy HH:mm:ss"
                    )}
                  </p>
                </div>
                <div className="col-4 my-auto">
                  <button
                    className="btn btn-danger ms-5 me-3"
                    onClick={() => borrarTarea(tarea)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => guardarValores(tarea)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  {tarea.completada === true ? (
                    <button
                      className="btn btn-primary ms-3"
                      onClick={() => tareaPendiente(tarea._id)}
                    >
                      <FontAwesomeIcon icon={faSquareCheck} />
                    </button>
                  ) : (
                    <button
                      className="btn btn-success ms-3"
                      onClick={() => tareaCompletada(tarea._id)}
                    >
                      <FontAwesomeIcon icon={faSquareCheck} />
                    </button>
                  )}
                </div>
              </div>
            </>
          )
        )}
      </>
    </div>
  );
};
