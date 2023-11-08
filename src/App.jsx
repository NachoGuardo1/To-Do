import { BrowserRouter, Routes, Route } from "react-router-dom";
import { List } from "./componentes/List";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
