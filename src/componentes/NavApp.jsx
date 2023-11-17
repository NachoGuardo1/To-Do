import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
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
                color="green"
                className="custom-icon"
              />
            </div>
            <div className="user-head">
              <button
                className="btn btn-danger border rounded-circle border-danger "
                onClick={cerrarSesion}
              >
                {usuario.nombre.slice(0, 2)}
              </button>
            </div>
          </header>
          <Nav
            justify
            variant="tabs"
            defaultActiveKey="/home"
            className="barra-nav"
          >
            <Nav.Item>
              <Nav.Link
                eventKey="/home"
                onClick={() => navigate("/home")}
                className="custom-nav-link"
              >
                Todas
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-1"
                onClick={() => navigate("/completas")}
                className="custom-nav-link"
              >
                Completas
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-2"
                onClick={() => navigate("/pendientes")}
                className="custom-nav-link"
              >
                Pendientes
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </>
      ) : null}
    </>
  );
}

export default NavApp;
