import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPenToSquare,
  faSquareCheck,
  faXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

export const List = () => {
  const [tareas, setTareas] = useState([]);

  const [total, setTotal] = useState(0);
  const limite = total;

  const [nombreTarea, setNombreTarea] = useState("");
  const [descripcionTarea, setDescripcionTarea] = useState("");
  const [tareaEdit, setTareaEdit] = useState(null);

  const token = JSON.parse(localStorage.getItem("token"));

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
        `https://testback4.onrender.com/api/tareas?limite=${limite}&desde=${0}`,
        { headers: { "x-token": token } }
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
        datos,
        { headers: { "x-token": token } }
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
    <div className="d-flex row justify-content-center">
      <div className="container row d-flex justify-content-start ">
        <form className="mt-2 mb-5">
          <div className="col-12">
            <input
              type="text"
              placeholder="Nombre de la tarea"
              className="form-control mb-3"
              value={nombreTarea}
              onChange={(e) => setNombreTarea(e.target.value)}
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              placeholder="Descripcion de la tarea"
              className="form-control mb-3"
              value={descripcionTarea}
              onChange={(e) => setDescripcionTarea(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end gap-2">
            {tareaEdit === null ? (
              <button className="btn btn-success btn-sm" onClick={crearTarea}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            ) : (
              <>
                <button
                  onClick={editarValores}
                  className="btn btn-warning btn-sm"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  onClick={cancelarEdit}
                  className="btn btn-danger btn-sm"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </>
            )}
          </div>
        </form>
      </div>
      {tareas && tareas.length > 0 ? (
        tareas.map((tarea) => (
          <div className="container row d-flex justify-content-start">
            {tarea.completada === true ? (
              <div
                className="bg-success text-dark mb-3 row justify-content-between mx-0 px-0"
                key={tarea._id}
              >
                <div className="col-8 px-1">
                  <h6>{tarea.nombre}</h6>
                  <p>{tarea.descripcion}</p>
                  <span>
                    <span>{tarea.fechaCreacion}</span>
                  </span>
                </div>
                <aside className="d-flex gap-1 col-4 my-auto justify-content-end px-1">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => borrarTarea(tarea)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => guardarValores(tarea)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => tareaPendiente(tarea._id)}
                  >
                    <FontAwesomeIcon icon={faSquareCheck} />
                  </button>
                </aside>
              </div>
            ) : (
              <div
                className="bg-primary text-dark mb-3 row justify-content-between mx-0 px-0"
                key={tarea._id}
              >
                <div className="col-8  px-1">
                  <h6>{tarea.nombre}</h6>
                  <p>{tarea.descripcion}</p>
                  <span>
                    <span>{tarea.fechaCreacion}</span>
                  </span>
                </div>
                <aside className="d-flex gap-1 col-4 my-auto justify-content-end px-1">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => borrarTarea(tarea)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => guardarValores(tarea)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => tareaCompletada(tarea._id)}
                  >
                    <FontAwesomeIcon icon={faSquareCheck} />
                  </button>
                </aside>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>cargando..</p>
      )}
    </div>
  );
};
