import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FormTareaApp } from "./FormTareaApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "../styles/animation.css";

export const ModalForm = ({ setTareas, tareas }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <FontAwesomeIcon
        icon={faPlusCircle}
        onClick={handleShow}
        style={{
          color: "#f6f6f6",
          fontSize: "35px",
        }}
        className="btn"
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="custom-modal">
          <Modal.Title>Nueva Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal">
          <FormTareaApp setTareas={setTareas} tareas={tareas} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
