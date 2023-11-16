import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TareasCompletadas } from "./componentes/tareasCompletadas";
import "bootstrap/dist/css/bootstrap.min.css";
import { TareasPendientes } from "./componentes/tareasPendientes";
import { Home } from "./pages/Home";
import "./styles/app.css";
import NavApp from "./componentes/NavApp";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { PrivateRoutes } from "./Routes/PrivateRoute";
import { PrivateRoutesLogin } from "./Routes/PrivateRouteLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="*" element={<NavApp />} />
          </Routes>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoutesLogin>
                  <LoginPage />
                </PrivateRoutesLogin>
              }
            />
            <Route
              path="/register"
              element={
                <PrivateRoutesLogin>
                  <RegisterPage />
                </PrivateRoutesLogin>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoutes>
                  <Home />
                </PrivateRoutes>
              }
            />
            <Route
              path="completas"
              element={
                <PrivateRoutes>
                  <TareasCompletadas />
                </PrivateRoutes>
              }
            />
            <Route
              path="pendientes"
              element={
                <PrivateRoutes>
                  <TareasPendientes />
                </PrivateRoutes>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
