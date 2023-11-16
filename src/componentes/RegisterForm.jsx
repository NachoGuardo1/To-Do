import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const RegisterForm = () => {
  const [inputNombre, setNombre] = useState("");
  const [inputCorreo, setCorreo] = useState("");
  const [inputPassword, setPassword] = useState("");
  const [inputPassword2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);

  const v_rol = "USER";
  const nombreRegex = /^[a-zA-Z' ]{6,20}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,10}$/;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const resetForm = () => {
    setNombre(""), setCorreo(""), setPassword(""), setPassword2("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const datos = {
      nombre: inputNombre,
      correo: inputCorreo,
      password: inputPassword,
      rol: v_rol,
    };

    if (!nombreRegex.test(inputNombre)) {
      setError("El nombre debe contener entre 6 y 20 carateres");
      return;
    }
    if (!passwordRegex.test(inputPassword)) {
      setError("La contraseña no cumple con los requisitos de seguridad");
      return;
    }
    if (inputPassword !== inputPassword2) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const resp = await axios.post(
        "https://testback4.onrender.com/api/usuarios",
        datos
      );
      if (resp.status === 200) {
        Swal.fire("Registro exitoso");
        resetForm();
        navigate("/");
      }
    } catch (error) {
      Swal.fire("El correo ya se encuentra registrado");
    }
    setLoading(false);
  };

  return (
    <div className="my-3">
      <form
        className="col-11 mx-auto border rounded mt-5 p-1 bg-light miDiv"
        onSubmit={handleRegister}
      >
        <h4 className="text-center mt-3 mb-5">Registro</h4>
        <div className="text-center">
          <div className="my-3">
            <input
              className="botonInput"
              type="text"
              value={inputNombre}
              onChange={(e) => setNombre(e.target.value)}
              maxLength={20}
              placeholder="Nombre Completo"
            />
          </div>
          <div className="my-3">
            <input
              className="botonInput"
              type="email"
              value={inputCorreo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="my-3">
            <input
              className="botonInput"
              type="password"
              value={inputPassword}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*Contraseña"
            />
            <div class="form-text w-75 mx-auto">
              *8 a 10 caracteres, al menos una letra mayuscula, una minuscula y
              un número.
            </div>
          </div>
          <div className="my-3">
            <input
              className="botonInput"
              type="password"
              value={inputPassword2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Repita su contraseña"
            />
          </div>
          <div className="my-1">
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          {!loading ? (
            <div className="my-3">
              <button className="botonRegistro" type="submit">
                Registrarse
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

          <div className="my-3">
            <Link to={"/"}>Ya estoy registrado</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
