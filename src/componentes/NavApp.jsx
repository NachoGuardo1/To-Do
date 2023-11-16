import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import Swal from "sweetalert2";

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
          <header className="container-fluid mx-0 py-2 px-0 row justify-content-end">
            <div className="d-flex justify-content-center col-4">
              <img
                src="https://w7.pngwing.com/pngs/1013/469/png-transparent-computer-icons-check-mark-symbol-ok-miscellaneous-angle-logo-thumbnail.png"
                alt=""
                style={{
                  width: "40px",
                }}
              />
            </div>
            <div className=" d-flex justify-content-end col-4 px-1">
              <button
                className="btn border rounded-circle"
                onClick={cerrarSesion}
              >
                {usuario.nombre.slice(0, 2)}
              </button>
            </div>
          </header>
          <Nav justify variant="tabs" defaultActiveKey="/home" className="mb-3">
            <Nav.Item>
              <Nav.Link href="/home">Todas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-1"
                onClick={() => navigate("/completas")}
              >
                Completas
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-2"
                onClick={() => navigate("/pendientes")}
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
