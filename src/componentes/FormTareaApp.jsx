import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export const FormTareaApp = ({ setTareas, tareas }) => {
  const [nombreTarea, setNombreTarea] = useState("");
  const [descripcionTarea, setDescripcionTarea] = useState("");
  const [error, setError] = useState("");

  const nombreRegex = /^[a-zA-Z0-9][a-zA-Z0-9' ]{4,18}$/;
  const DescripcionRegex = /^[a-zA-Z0-9][a-zA-Z0-9' ]{4,99}$/;

  const token = JSON.parse(localStorage.getItem("token"));

  const resetForm = () => {
    setNombreTarea("");
    setDescripcionTarea("");
  };

  const crearTarea = async (e) => {
    e.preventDefault();
    if (!nombreRegex.test(nombreTarea)) {
      setError("El nombre debe contener entre 5 y 19 letras y/o numeros ");
      return;
    }
    if (!DescripcionRegex.test(descripcionTarea)) {
      setError("La descripcion debe contener entre 5 y 100 letras y/o numeros");
      return;
    }
    const datos = {
      nombre: nombreTarea,
      descripcion: descripcionTarea,
    };
    setError("");
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
            icon={faPlus}
            className="btn "
            onClick={crearTarea}
            style={{
              color: "#f6f6f6",
              fontSize: "17px",
              background: "linear-gradient(to bottom, #648d23, #4d6c1f)",
            }}
          />
        </div>
      </form>
    </div>
  );
};
