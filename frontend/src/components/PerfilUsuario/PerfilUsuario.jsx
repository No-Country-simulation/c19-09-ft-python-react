import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import toast, { Toaster } from "react-hot-toast";

const PerfilUsuario = () => {
  const user = useAppSelector((state) => state.useReducer.user);

  // Estados locales inicializados con los datos del usuario logueado
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  // Cargar datos desde localStorage cuando el componente se monte
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("user"));
    if (savedData) {
      setName(savedData.name || "");
      setLastname(savedData.lastname || "");
      setEmail(savedData.email || "");
      setStreet(savedData.street || "");
      setCity(savedData.city || "");
      setState(savedData.state || "");
      setZip(savedData.zip || "");
    } else if (user) {
      setName(user.name);
      setLastname(user.lastname ? user.lastname.trim() : "");
      setEmail(user.email);
      if (user.address) {
        setStreet(user.address.street);
        setCity(user.address.city);
        setState(user.address.state);
        setZip(user.address.zip);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") setName(value);
    if (id === "lastname") setLastname(value);
    if (id === "email") setEmail(value);
    if (id === "street") setStreet(value);
    if (id === "city") setCity(value);
    if (id === "state") setState(value);
    if (id === "zip") setZip(value);
  };

  const handleSave = () => {
    // Guarda los datos en localStorage
    const profileData = {
      name,
      lastname,
      email,
      street,
      city,
      state,
      zip,
    };
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    setEditable(false);
    toast.success("Datos actualizados");
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-[-64px]">
      <div
        id="user-form"
        className="bg-white p-4 rounded shadow-xl w-96 flex flex-col relative top-[-100px] left-[-50px]"
      >
        <div className="flex justify-center items-center mb-4 cursor-pointer">
          Hola
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center font-serif mx-auto mt-4">
          Mis datos
        </h1>
        <div className="mb-4 flex items-center">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2 mr-2"
          >
            Nombre:
          </label>
          <input
            autoFocus={editable}
            className={`ml-1 transition-all duration-300 ease-in-out ${
              editable ? "transform scale-100 hover:scale-105" : ""
            } mr-10 bg-gray-50 border ${
              editable ? "border-teal-500" : "border-gray-800"
            } text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="text"
            id="name"
            value={name}
            onChange={handleChange}
            disabled={!editable}
            placeholder="Name"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            htmlFor="lastname"
            className="block text-gray-700 text-sm font-semibold mb-2 mr-2"
          >
            Apellido:
          </label>
          <input
            className={`ml-1 transition-all duration-300 ease-in-out ${
              editable ? "transform scale-100 hover:scale-105" : ""
            } mr-10 bg-gray-50 border ${
              editable ? "border-teal-500" : "border-gray-300"
            } text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="text"
            id="lastname"
            value={lastname}
            onChange={handleChange}
            disabled={!editable}
            placeholder="Lastname"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-semibold mb-2 mr-2"
          >
            Email:
          </label>
          <input
            className={`ml-1 transition-all duration-300 ease-in-out ${
              editable ? "transform scale-100 hover:scale-105" : ""
            } mr-10 bg-gray-50 border ${
              editable ? "border-teal-500" : "border-gray-300"
            } text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            disabled={!editable}
            placeholder="Email"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            htmlFor="street"
            className="block text-gray-700 text-sm font-semibold mb-2 mr-2"
          >
            Calle:
          </label>
          <input
            className={`ml-1 transition-all duration-300 ease-in-out ${
              editable ? "transform scale-100 hover:scale-105" : ""
            } mr-10 bg-gray-50 border ${
              editable ? "border-teal-500" : "border-gray-300"
            } text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="text"
            id="street"
            value={street}
            onChange={handleChange}
            disabled={!editable}
            placeholder="Calle"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            htmlFor="city"
            className="block text-gray-700 text-sm font-semibold mb-2 mr-2"
          >
            Ciudad:
          </label>
          <input
            className={`ml-1 transition-all duration-300 ease-in-out ${
              editable ? "transform scale-100 hover:scale-105" : ""
            } mr-10 bg-gray-50 border ${
              editable ? "border-teal-500" : "border-gray-300"
            } text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="text"
            id="city"
            value={city}
            onChange={handleChange}
            disabled={!editable}
            placeholder="Ciudad"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            htmlFor="state"
            className="block text-gray-700 text-sm font-semibold mb-2 mr-2"
          >
            Estado:
          </label>
          <input
            className={`ml-1 transition-all duration-300 ease-in-out ${
              editable ? "transform scale-100 hover:scale-105" : ""
            } mr-10 bg-gray-50 border ${
              editable ? "border-teal-500" : "border-gray-300"
            } text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="text"
            id="state"
            value={state}
            onChange={handleChange}
            disabled={!editable}
            placeholder="Estado"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            htmlFor="zip"
            className="block text-gray-700 text-sm font-semibold mb-2 mr-2"
          >
            Código Postal:
          </label>
          <input
            className={`ml-1 transition-all duration-300 ease-in-out ${
              editable ? "transform scale-100 hover:scale-105" : ""
            } mr-10 bg-gray-50 border ${
              editable ? "border-teal-500" : "border-gray-300"
            } text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            type="text"
            id="zip"
            value={zip}
            onChange={handleChange}
            disabled={!editable}
            placeholder="Código Postal"
          />
        </div>

        <div className="flex justify-center mt-2">
          <button
            className={`ml-2 w-auto h-auto bg-${
              editable ? "teal-500" : "blue-500"
            } hover:bg-${
              editable ? "teal-600" : "blue-600"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            onClick={() => setEditable(!editable)}
          >
            {editable ? "Cancelar" : "Editar"}
          </button>
          {editable && (
            <button
              className="ml-2 w-auto h-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSave}
            >
              Guardar
            </button>
          )}
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default PerfilUsuario;
