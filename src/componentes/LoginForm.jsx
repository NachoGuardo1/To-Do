import {
  faClipboardCheck,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/animation.css";
import { authContext } from "../context/AuthContext";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { guardarUsuario, logIN } = useContext(authContext);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const resetForm = () => {
    setEmail(""), setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Debes completar todos los campos");
      return;
    }
    setError("");
    setLoading(true);
    const datos = { correo: email, password: password };
    try {
      const resp = await axios.post(
        "https://testback4.onrender.com/api/auth/login",
        datos
      );
      if (resp.status === 200) {
        const { token, usuario } = resp.data;
        localStorage.setItem("token", JSON.stringify(token));
        logIN();

        const { nombre, apellido, correo, rol, _id } = usuario;

        guardarUsuario({
          nombre,
          apellido,
          correo,
          rol,
          _id,
        });

        Swal.fire(`Bienvenido ${nombre}`);
        navigate("/home");
        resetForm();
      }
    } catch (error) {
      Swal.fire("Correo y/o contraseña incorrectos");
    }

    setLoading(false);
  };

  return (
    <>
      <div>
        <form
          className="col-10 col-sm-10 col-md-6  mx-auto border rounded mt-5 p-1  miDiv"
          onSubmit={handleLogin}
        >
          <div className="text-center">
            <FontAwesomeIcon
              icon={faClipboardCheck}
              color="#29a60a"
              className="custom-icon mt-3 mb-4"
            />
          </div>
          <div className="text-center">
            <div className="my-3">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              <input
                type="email"
                placeholder="Email"
                className="botonInput"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="my-3">
              <FontAwesomeIcon icon={faLock} className="me-2" />
              <input
                type="password"
                placeholder="Password"
                className="botonInput"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="my-1">
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            {!loading ? (
              <div className="my-3  text-center">
                <button className="botonIngresar" type="submit">
                  Ingresar
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="lds-roller">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}

            <div className="my-3 text-center">
              <Link to={"/register"}>
                Aun no tienes usuario?Registrate Aqui!
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
