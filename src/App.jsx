import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TareasCompletadas } from "./componentes/tareasCompletadas";
import "bootstrap/dist/css/bootstrap.min.css";
import { TareasPendientes } from "./componentes/tareasPendientes";
import { Home } from "./pages/Home";
import "./styles/app.css";
import NavApp from "./componentes/NavApp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NavApp />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/completas" element={<TareasCompletadas />} />
          <Route path="/pendientes" element={<TareasPendientes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
