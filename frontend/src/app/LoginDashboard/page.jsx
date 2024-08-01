"use client";
import React, { useState } from "react";
import { data } from "../../../public/data";
import { validateRegisterForm, validateLoginForm } from "./formValidation";

//iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGoogle } from "react-icons/fa";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { toast, Toaster } from "react-hot-toast";
import { WelcomeMessageLogin } from "../../components/WelcomeMessage/WelcomeMessage";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/features/userSlice";
const envelopeIcon = <FontAwesomeIcon icon={faEnvelope} />;
const userIcon = <FontAwesomeIcon icon={faUser} />;
const lockIcon = <FontAwesomeIcon icon={faLock} />;

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const dataUser = data.users;
  console.log("usuarios", dataUser);

  const [formErrors, setFormErrors] = useState({});
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [welcomeMessageLogin, setWelcomeMessageLogin] = useState("");
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showLoginFormView = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

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

  const validateForm = () => {
    const formData = showRegisterForm ? registerFormData : loginFormData;
    const errors = showRegisterForm
      ? validateRegisterForm(formData)
      : validateLoginForm(formData);

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

        if (user.role === "Vendedor" || user.role === "Admin") {
          setWelcomeMessageLogin(`¡Hola de nuevo ${user.name}!`);
          dispatch(loginUser({ user }));
          router.push("/Dashboard");
        } else {
          toast.error(
            "Permiso denegado. Solo vendedores y administradores pueden acceder."
          );
        }

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded shadow-xl w-96 flex flex-col">
        {showRegisterForm ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center font-serif  mx-auto mt-4 ">
              Registrarse
            </h1>
            <form onSubmit={handleRegisterSubmit}>
              {/* Nombre */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-semibold mb-2"
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
                  className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              {/* Apellido */}
              <div className="mb-4">
                <label
                  htmlFor="lastname"
                  className="block text-gray-700 text-sm font-semibold mb-2"
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
                  className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
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
                  className="block text-gray-700 text-sm font-semibold mb-2"
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
                  className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
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
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  {lockIcon} Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={registerFormData.password}
                    onChange={handleChange}
                    className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
              >
                Registrarse
              </button>
              <p className="text-center mt-4">
                ¿Ya tienes una cuenta?{" "}
                <button
                  type="button"
                  className="text-teal-500 hover:underline"
                  onClick={showLoginFormView}
                >
                  Iniciar sesión
                </button>
              </p>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center font-serif  mx-auto mt-4 ">
              Iniciar Sesión
            </h1>
            <form onSubmit={handleLoginSubmit}>
              {/* Correo Electrónico */}
              <div className="mb-4">
                <label
                  htmlFor="loginEmail"
                  className="block text-gray-700 text-sm font-semibold mb-2"
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
                  className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
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
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  {lockIcon} Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="loginPassword"
                    name="loginPassword"
                    placeholder="Password"
                    value={loginFormData.loginPassword}
                    onChange={handleChange}
                    className={`transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                {formErrors.loginPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.loginPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
              >
                Iniciar Sesión
              </button>
              <p className="text-center mt-4">
                ¿No tienes una cuenta?{" "}
                <button
                  type="button"
                  className="text-teal-500 hover:underline"
                  onClick={showRegisterFormView}
                >
                  Registrarse
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
