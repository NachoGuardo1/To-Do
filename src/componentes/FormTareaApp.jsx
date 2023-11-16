import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export const FormTareaApp = ({ tareaEdit, setTareaEdit, setTareas }) => {
  const [nombreTarea, setNombreTarea] = useState("");
  const [descripcionTarea, setDescripcionTarea] = useState("");

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

  const resetForm = () => {
    setNombreTarea("");
    setDescripcionTarea("");
  };

  return (
    <div>
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
              <button onClick={cancelarEdit} className="btn btn-danger btn-sm">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
