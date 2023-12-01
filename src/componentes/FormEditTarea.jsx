import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";

export const FormEditTarea = ({
  tareaEdit,
  setTareaEdit,
  tareas,
  setTareas,
  handleCloseFE,
}) => {
  const [nombreTarea, setNombreTarea] = useState(
    tareaEdit ? tareaEdit.nombre : null
  );
  const [descripcionTarea, setDescripcionTarea] = useState(
    tareaEdit ? tareaEdit.descripcion : null
  );
  const [error, setError] = useState("");
  const nombreRegex = /^[a-zA-Z0-9][a-zA-Z0-9' ]{4,18}$/;
  const DescripcionRegex = /^[a-zA-Z0-9][a-zA-Z0-9' ]{4,149}$/;

  const editarValores = async (e) => {
    e.preventDefault();
    const datos = {
      nombre: nombreTarea,
      descripcion: descripcionTarea,
    };

    if (!nombreRegex.test(nombreTarea)) {
      setError("El nombre debe contener entre 5 y 19 letras y/o numeros");
      return;
    }
    if (!DescripcionRegex.test(descripcionTarea)) {
      setError("La descripcion debe contener entre 5 y 150 letras y/o numeros");
      return;
    }
    setError("");
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
      handleCloseFE();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelarEdit = async () => {
    setTareaEdit(null);
    handleCloseFE();
    resetForm();
  };

  const resetForm = () => {
    setNombreTarea("");
    setDescripcionTarea("");
  };

  return (
    <div>
      <form className="my-3">
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
        <div className="my-1">
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className="d-flex justify-content-end gap-2">
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="btn "
            onClick={editarValores}
            style={{
              color: "#1f1f1f",
              fontSize: "16px",
              background: "#f5f901",
            }}
          />
          <FontAwesomeIcon
            icon={faXmark}
            onClick={cancelarEdit}
            className="btn"
            style={{
              color: "#1f1f1f",
              fontSize: "16px",
              background: "#ea0606",
            }}
          />
        </div>
      </form>
    </div>
  );
};
