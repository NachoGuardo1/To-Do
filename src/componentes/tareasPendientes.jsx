import { faSquareCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

export const TareasPendientes = () => {
  const [tareasPendientes, setTareasPendientes] = useState([]);

  useEffect(() => {
    traerTareasPendientes();
  }, []);

  const traerTareasPendientes = async () => {
    try {
      const resp = await axios.get(
        "https://testback4.onrender.com/api/tareas/pendientes"
      );
      setTareasPendientes(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const tareaCompletada = async (tareaId) => {
    try {
      await axios.put(`https://testback4.onrender.com/api/tareas/${tareaId}`, {
        completada: true,
      });
      const tareasActualizadas = tareasPendientes.filter(
        (t) => t._id !== tareaId
      );
      setTareasPendientes(tareasActualizadas);
    } catch (error) {
      console.log(error);
    }
  };

  const borrarTarea = async (tarea) => {
    try {
      await axios.delete(
        "https://testback4.onrender.com/api/tareas/" + tarea._id
      );
      const tareasActualizadas = tareasPendientes.filter(
        (t) => t._id !== tarea._id
      );
      setTareasPendientes(tareasActualizadas);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {tareasPendientes.map((tarea) => (
        <div
          className="bg-primary text-dark mb-3 row justify-content-between mx-0 px-0"
          key={tarea._id}
        >
          <div className="col-8 px-1">
            <h6>{tarea.nombre}</h6>
            <p>{tarea.descripcion}</p>
            <span>
              {format(new Date(tarea.fechaCreacion), "dd/MM/yyyy HH:mm:ss")}
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
              className="btn btn-success btn-sm"
              onClick={() => tareaCompletada(tarea._id)}
            >
              <FontAwesomeIcon icon={faSquareCheck} />
            </button>
          </aside>
        </div>
      ))}
    </div>
  );
};
