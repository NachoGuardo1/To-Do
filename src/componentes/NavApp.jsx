import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";

function NavApp() {
  const navigate = useNavigate();
  return (
    <Nav justify variant="tabs" defaultActiveKey="/" className="mb-3">
      <Nav.Item>
        <Nav.Link href="/">Todas</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" onClick={() => navigate("/completas")}>
          Completas
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" onClick={() => navigate("/pendientes")}>
          Pendientes
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavApp;
