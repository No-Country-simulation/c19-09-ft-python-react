"use client";
import React, { useState } from "react";
// componentes
import {
  WelcomeMessage,
  WelcomeMessageLogin,
} from "../../Components/WelcomeMessage/WelcomeMessage";

import { data } from "../../../public/data";

import { validateRegisterForm, validateLoginForm } from "./formValidation";

// redux
import { useCreateUserMutation } from "@/redux/services/usersApi";
import { useLoginUserMutation } from "@/redux/services/usersApi";
import { loginUser } from "@/redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "next-auth/react";

// iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGoogle } from "react-icons/fa";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const envelopeIcon = <FontAwesomeIcon icon={faEnvelope} />;
const userIcon = <FontAwesomeIcon icon={faUser} />;
const lockIcon = <FontAwesomeIcon icon={faLock} />;

const Register = () => {
  const router = useRouter();

  const dataUser = data.users;

  // redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.useReducer.user);
  console.log("user", user);

  // estado para la creacion de usuarios
  const [newUser] = useCreateUserMutation();
  // estado para el login
  const [login] = useLoginUserMutation();
  // estado para las validaciones
  const [formErrors, setFormErrors] = useState({});

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  // estado para mensaje de bienvenida Registro
  const [welcomeMessage, setWelcomeMessage] = useState("");
  // estado para mensaje de bienvenida Login
  const [welcomeMessageLogin, setWelcomeMessageLogin] = useState("");

  // estado para el form de registro
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  // estado para el form de login
  const [loginFormData, setLoginFormData] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  // funcion para ocultar la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // funcion para la vista del login
  const showLoginFormView = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };
  // funcion para la vista del registro
  const showRegisterFormView = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (showRegisterForm) {
      setRegisterFormData({
        ...registerFormData,
        [name]: value,
      });
    } else {
      setLoginFormData({
        ...loginFormData,
        [name]: value,
      });
    }
  };

  // funcion para validaciones de los formularios
  const validateForm = () => {
    const formData = showRegisterForm ? registerFormData : loginFormData;
    const errors = showRegisterForm
      ? validateRegisterForm(formData)
      : validateLoginForm(formData);

    // Manejo de errores y lógica de formulario inválido

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await newUser(registerFormData);
        console.log("esto es response ", response);

        if (
          response.error &&
          response.error.data &&
          response.error.data.error
        ) {
          toast.error("Este correo electronico ya existe");
        } else {
          const { name, email, password } = registerFormData;
          setWelcomeMessage(`Hola ${name}!`);

          try {
            const loginResponse = await login({
              loginEmail: email,
              loginPassword: password,
            });

            if (loginResponse?.data?.token) {
              const { user } = loginResponse.data;
              const userName = user.name;
              setWelcomeMessageLogin(`¡Hola de nuevo ${userName}!`);
              dispatch(loginUser(loginResponse.data));
            } else {
              console.error(
                "Error en el inicio de sesión:",
                loginResponse?.data?.error
              );
            }

            setLoginFormData({
              loginEmail: "",
              loginPassword: "",
            });
          } catch (error) {
            console.error("Error al iniciar sesión automáticamente:", error);
          }
        }
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
      }
    } else {
      console.log("Formulario de registro inválido");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    console.log("LoginFormData", loginFormData);

    if (validateForm()) {
      try {
        const user = dataUser.find(
          (user) =>
            user.email === loginFormData.loginEmail &&
            user.password === loginFormData.loginPassword
        );

        console.log("user", user);

        if (
          user.role === "vendedor" ||
          user.role === "admin" ||
          user.role === "Customer"
        ) {
          // La autenticación y verificación de roles fueron exitosas
          setWelcomeMessageLogin(`¡Hola de nuevo ${user.name}!`);
          dispatch(loginUser({ user }));
          // Redirigir al usuario al Dashboard
          router.push("/My-account");
        } else {
          // El usuario no tiene el rol necesario
          toast.error(
            "Permiso denegado. Solo vendedores y administradores pueden acceder."
          );
        }

        // Limpia el formulario de inicio de sesión
        setLoginFormData({
          loginEmail: "",
          loginPassword: "",
        });
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        toast.error("Error al iniciar sesión");
      }
    } else {
      console.log("Formulario de inicio de sesión inválido");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-white p-4 rounded shadow-xl w-96 flex flex-col">
        {showRegisterForm ? (
          <>
            <h1 className="text-2xl font-bold text-center font-serif text-secondary mx-auto mt-4 mb-4">
              Registrarse
            </h1>
            <form onSubmit={handleRegisterSubmit}>
              {/* Nombre */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-secondary text-sm font-semibold mb-2"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nombre"
                  value={registerFormData.name}
                  onChange={handleChange}
                  className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              {/* Apellido */}
              <div className="mb-4">
                <label
                  htmlFor="lastname"
                  className="block text-secondary text-sm font-semibold mb-2"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Apellido"
                  value={registerFormData.lastname}
                  onChange={handleChange}
                  className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2`}
                />
                {formErrors.lastname && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.lastname}
                  </p>
                )}
              </div>
              {/* Correo Electrónico */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-secondary text-sm font-semibold mb-2"
                >
                  {envelopeIcon} Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={registerFormData.email}
                  onChange={handleChange}
                  className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              {/* Contraseña */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-secondary text-sm font-semibold mb-2"
                >
                  {lockIcon} Contraseña
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  value={registerFormData.password}
                  onChange={handleChange}
                  className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-secondary mt-1 text-sm underline"
                >
                  {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                </button>
                {formErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>
              {/* Botón de Enviar */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out"
                >
                  Registrarse
                </button>
                <button
                  type="button"
                  onClick={showLoginFormView}
                  className="text-secondary font-semibold py-2 px-4 rounded transition-all duration-300 ease-in-out"
                >
                  Ya tengo cuenta
                </button>
              </div>
            </form>
            <Toaster />
          </>
        ) : showLoginForm ? (
          <>
            <h1 className="text-2xl font-bold text-center font-serif text-secondary mx-auto mt-4 mb-4">
              Iniciar sesión
            </h1>
            <form onSubmit={handleLoginSubmit}>
              {/* Correo Electrónico */}
              <div className="mb-4">
                <label
                  htmlFor="loginEmail"
                  className="block text-secondary text-sm font-semibold mb-2"
                >
                  {envelopeIcon} Correo Electrónico
                </label>
                <input
                  type="email"
                  id="loginEmail"
                  name="loginEmail"
                  placeholder="Email"
                  value={loginFormData.loginEmail}
                  onChange={handleChange}
                  className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2`}
                />
                {formErrors.loginEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.loginEmail}
                  </p>
                )}
              </div>
              {/* Contraseña */}
              <div className="mb-4">
                <label
                  htmlFor="loginPassword"
                  className="block text-secondary text-sm font-semibold mb-2"
                >
                  {lockIcon} Contraseña
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="loginPassword"
                  name="loginPassword"
                  placeholder="Contraseña"
                  value={loginFormData.loginPassword}
                  onChange={handleChange}
                  className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-secondary mt-1 text-sm underline"
                >
                  {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                </button>
                {formErrors.loginPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.loginPassword}
                  </p>
                )}
              </div>
              {/* Botón de Enviar */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out"
                >
                  Iniciar sesión
                </button>
                <button
                  type="button"
                  onClick={showRegisterFormView}
                  className="text-secondary font-semibold py-2 px-4 rounded transition-all duration-300 ease-in-out"
                >
                  Crear cuenta
                </button>
              </div>
            </form>
            <Toaster />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Register;
