import { faSquareCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/tareas.css";

export const TareasPendientes = () => {
  const [tareasPendientes, setTareasPendientes] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    traerTareasPendientes();
  }, []);

  const traerTareasPendientes = async () => {
    try {
      const resp = await axios.get(
        "https://testback4.onrender.com/api/tareas/pendientes",
        { headers: { "x-token": token } }
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
    <div className="d-flex row justify-content-center">
      <div className="container row d-flex justify-content-center px-3">
        {tareasPendientes.map((tarea) => (
          <div className="tarea-pend" key={tarea._id}>
            <div className="col-8 px-1">
              <h6>{tarea.nombre}</h6>
              <p>{tarea.descripcion}</p>
              <span>{tarea.fechaCreacion}</span>
            </div>
            <aside className="d-flex gap-3 col-4 my-auto justify-content-end px-1">
              <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={() => borrarTarea(tarea)}
                style={{ color: "#ea0606", fontSize: "20px" }}
              />

              <FontAwesomeIcon
                icon={faSquareCheck}
                onClick={() => tareaCompletada(tarea._id)}
                style={{ color: "green", fontSize: "20px" }}
              />
            </aside>
          </div>
        ))}
      </div>
    </div>
  );
};
