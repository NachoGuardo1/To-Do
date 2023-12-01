import { faTrashAlt, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/tareas.css";
import { format } from "date-fns";
import Swal from "sweetalert2";

export const TareasCompletadas = () => {
  const [loading, setLoading] = useState(true);

  const [tareasCompletadas, setTareasCompletadas] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    traerTareasCompletadas();
  }, []);

  const traerTareasCompletadas = async () => {
    try {
      const resp = await axios.get(
        "https://testback4.onrender.com/api/tareas/completadas",
        { headers: { "x-token": token } }
      );
      setTareasCompletadas(resp.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const tareaPendiente = async (tareaId) => {
    try {
      await axios.put(`https://testback4.onrender.com/api/tareas/${tareaId}`, {
        completada: false,
      });
      const tareasActualizadas = tareasCompletadas.filter(
        (t) => t._id !== tareaId
      );
      setTareasCompletadas(tareasActualizadas);
    } catch (error) {
      console.log(error);
    }
  };

  const borrarTarea = async (tarea) => {
    try {
      await axios.delete(
        "https://testback4.onrender.com/api/tareas/" + tarea._id
      );
      const tareasActualizadas = tareasCompletadas.filter(
        (t) => t._id !== tarea._id
      );
      setTareasCompletadas(tareasActualizadas);
    } catch (error) {
      console.log(error);
    }
  };

  const verificacionBorrado = (tarea) => {
    Swal.fire({
      title: "¿Estas seguro que quieres borrar esta tarea?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#29a60a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar tarea",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        borrarTarea(tarea);
      }
    });
  };

  return (
    <div className="d-flex row justify-content-center mx-0">
      <div className="d-flex row justify-content-center px-3">
        {loading ? (
          <div className="text-center mt-3 ">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          tareasCompletadas.map((tarea) => (
            <div className="tarea-comp" key={tarea._id}>
              <div className="col-8 px-1">
                <h2 className="mb-3 subtitulo">{tarea.nombre}:</h2>
                <p className="descripcion mb-3">{tarea.descripcion}</p>
                <p className="fecha-creacion mb-1">
                  Fecha de creación:{" "}
                  {format(new Date(tarea.fechaCreacion), "dd/MM/yyyy")}
                </p>
              </div>
              <aside className="d-flex gap-3 col-4 my-auto justify-content-end px-1">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => verificacionBorrado(tarea)}
                  style={{ color: "#ea0606", fontSize: "20px" }}
                  className="btn btn-sm"
                />

                <FontAwesomeIcon
                  icon={faX}
                  onClick={() => tareaPendiente(tarea._id)}
                  style={{ color: "blue", fontSize: "20px" }}
                  className="btn btn-sm"
                />
              </aside>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
