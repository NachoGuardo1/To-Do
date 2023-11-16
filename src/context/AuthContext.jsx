import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loginOk, setLoginOk] = useState(false);
  const [usuarioIn, setUsuarioIn] = useState(null);

  const logIN = () => {
    setLoginOk(true);
  };

  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");
    if (tokenGuardado) {
      setLoginOk(true);
    }
  }, []);

  const logOUT = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setLoginOk(false);
  };

  const guardarUsuario = (datos) => {
    setUsuarioIn(datos);
    localStorage.setItem("usuario", JSON.stringify(datos));
  };

  return (
    <authContext.Provider
      value={{ logIN, logOUT, guardarUsuario, loginOk, setLoginOk, usuarioIn }}
    >
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
