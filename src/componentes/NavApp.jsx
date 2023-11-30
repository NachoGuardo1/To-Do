import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import "../styles/nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";

function NavApp() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { logOUT } = useContext(authContext);

  const cerrarSesion = () => {
    Swal.fire({
      title: "Quieres cerrar sesion? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#29a60a",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, estoy seguro",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Hasta luego ${usuario.nombre}`,
          icon: "success",
        });
        logOUT();
      }
    });
  };

  return (
    <>
      {usuario !== null ? (
        <>
          <header className="head-nav">
            <div>
              <FontAwesomeIcon
                icon={faClipboardCheck}
                color="#29a60a"
                className="custom-icon"
                onClick={() => navigate("/home")}
              />
            </div>
            <div className="user-head">
              <button
                className="btn rounded-circle "
                style={{
                  background: "#ea0606",
                  color: "#f6f6f6",
                }}
                onClick={cerrarSesion}
              >
                {usuario.nombre.slice(0, 1)}
                {usuario.apellido.slice(0, 1)}
              </button>
            </div>
          </header>
          <div className="w-100 mx-0 d-flex justify-content-around mb-4">
            <NavLink
              to="/home"
              className="custom-nav-link"
              activeClassName="active"
            >
              Mis Tareas
            </NavLink>
            <NavLink
              to="/pendientes"
              className="custom-nav-link"
              activeClassName="active"
            >
              Tareas Pendientes
            </NavLink>
            <NavLink
              to="/completas"
              className="custom-nav-link"
              activeClassName="active"
            >
              Tareas Completas
            </NavLink>
          </div>
        </>
      ) : null}
    </>
  );
}

export default NavApp;
