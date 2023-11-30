import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPenToSquare,
  faSquareCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/tareas.css";
import { ModalForm } from "./ModalForm";
import { FormEditTarea } from "./FormEditTarea";
import { Modal } from "react-bootstrap";
import { format } from "date-fns";
import Swal from "sweetalert2";

export const List = () => {
  const [tareas, setTareas] = useState([]);

  const [total, setTotal] = useState(0);
  const limite = total;

  const [tareaEdit, setTareaEdit] = useState(null);

  const [loading, setLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem("token"));

  const [showFormEdit, setShowFormEdit] = useState(false);

  const handleShowFE = (tarea) => {
    setTareaEdit(tarea);
    setShowFormEdit(true);
  };
  const handleCloseFE = () => {
    setShowFormEdit(false);
  };

  useEffect(() => {
    traerTareas();
  }, []);

  const traerTareas = async () => {
    try {
      const resp = await axios.get(
        `https://testback4.onrender.com/api/tareas?limite=${limite}&desde=${0}`,
        { headers: { "x-token": token } }
      );
      const { total, tareas } = resp.data;
      setTotal(total);
      setTareas(tareas);
      setLoading(false);
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
    <div
      className="d-flex row justify-content-center mx-0"
      style={{ marginBottom: "4.5rem" }}
    >
      <div className="container row d-flex justify-content-start"></div>
      {loading ? (
        <div className="text-center mt-3">
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
      ) : tareas.length > 0 ? (
        tareas.map((tarea) => (
          <div className="container row d-flex justify-content-center px-3">
            {tarea.completada === true ? (
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
                    style={{ color: "#ea0606", fontSize: "17px" }}
                  />
                  <FontAwesomeIcon
                    className="align-top"
                    icon={faPenToSquare}
                    style={{ color: "#f5f901", fontSize: "17px" }}
                    onClick={() => handleShowFE(tarea)}
                  />

                  <FontAwesomeIcon
                    icon={faX}
                    onClick={() => tareaPendiente(tarea._id)}
                    style={{ color: "blue", fontSize: "17px" }}
                  />
                </aside>
              </div>
            ) : (
              <div className="tarea-pend" key={tarea._id}>
                <div className="col-8  px-1">
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
                    style={{ color: "#ea0606", fontSize: "17px" }}
                  />

                  <FontAwesomeIcon
                    className="align-top"
                    icon={faPenToSquare}
                    style={{ color: "#f5f901", fontSize: "17px" }}
                    onClick={() => handleShowFE(tarea)}
                  />

                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    onClick={() => tareaCompletada(tarea._id)}
                    style={{ color: "green", fontSize: "17px" }}
                  />
                </aside>
              </div>
            )}
          </div>
        ))
      ) : null}

      <footer className="w-100 text-center fixed-bottom custom-foot">
        {showFormEdit ? (
          <Modal show={handleShowFE} onHide={handleCloseFE}>
            <Modal.Header closeButton className="custom-modal">
              <Modal.Title>Editar Tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-modal">
              <FormEditTarea
                tareas={tareas}
                setTareas={setTareas}
                setTareaEdit={setTareaEdit}
                tareaEdit={tareaEdit}
                handleCloseFE={handleCloseFE}
              />
            </Modal.Body>
          </Modal>
        ) : (
          <ModalForm setTareas={setTareas} tareas={tareas} />
        )}
      </footer>
    </div>
  );
};
