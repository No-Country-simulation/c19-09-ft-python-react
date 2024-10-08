"use client";
import React, { useEffect, useState } from "react";
import PerfilUsuario from "../../components/PerfilUsuario/PerfilUsuario";
import HistorialCompras from "../../components/HistorialCompras/HistorialCompras";

import MisFavoritos from "../../components/MisFavoritos/MisFavoritos";
import InfoPerfil from "../../components/InfoPerfil/InfoPerfil";
import AuthGuard from "../../components/authGuard";
import { useDispatch } from "react-redux";
import { getlogindata } from "../../redux/features/userSlice";
import { getCartData } from "../../redux/features/cart";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

function Perfil() {

  const user = useAppSelector((state) => state.useReducer.user);

  const userRol = user.role

  console.log(`el rol del usuario ${userRol}`)

  const dispatch = useDispatch();

  const [componenteActual, setComponenteActual] = useState("info");

  const handleClickEnlace = (componente) => {
    setComponenteActual(componente);
  };

  useEffect(() => {
    dispatch(getCartData());
    dispatch(getlogindata());
  }, [dispatch]);

  const renderComponenteActual = () => {
    switch (componenteActual) {
      case "informacionPersonal":
        return <PerfilUsuario />;
      case "historialCompras":
        return <HistorialCompras />;
      case "favoritos":
        return <MisFavoritos />;
      case "info":
        return <InfoPerfil />;
      default:
        return null;
    }
  };

  const saveSettings = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Solicitud enviada');
      }, 2000); 
    });
  };

  const handlerConsulta = () => {
    toast.promise(
      saveSettings(),
      {
        loading: 'Enviando solicitud...',
        success: 'Solicitud enviada',
        error: 'No se pudo enviar la solicitud',
      }
    );
  };

  return (
    <div className="mt-24 text-center">
      <div className="flex">
        <div className="shadow-xl border-solid border border-secondary w-1/4 h-2/3 mt-20 ml-12 mb-64 p-6 rounded-md bg-primary">
          <h1 className="mb-10 text-2xl text-secondary">MI CUENTA</h1>
          <ul>
            <li className="m-2">
              <button
                className={`cursor-pointer text-xl hover:bg-secondary hover:text-primary text-tertiary font-serif py-2 px-4 rounded-lg w-64 shadow-xl ${
                  componenteActual === "informacionPersonal"
                    ? "bg-secondary text-primary"
                    : "bg-primary text-tertiary"
                }`}
                onClick={() => handleClickEnlace("informacionPersonal")}
              >
                Información Personal
              </button>
            </li>
            <li className="m-2">
              <button
                className={`cursor-pointer text-xl hover:bg-secondary hover:text-primary text-tertiary font-serif py-2 px-4 rounded-lg w-64 shadow-xl ${
                  componenteActual === "historialCompras"
                    ? "bg-secondary text-primary"
                    : "bg-primary text-tertiary"
                }`}
                onClick={() => handleClickEnlace("historialCompras")}
              >
                Historial de Compras
              </button>
            </li>

            <li className="m-2">
              <button
                className={`cursor-pointer text-xl hover:bg-secondary hover:text-primary text-tertiary font-serif py-2 px-4 rounded-lg w-64 shadow-xl ${
                  componenteActual === "favoritos"
                    ? "bg-secondary text-primary"
                    : "bg-primary text-tertiary"
                }`}
                onClick={() => handleClickEnlace("favoritos")}
              >
                Favoritos
              </button>
            </li>
            {userRol === 'Customer' ? (
            <li className="m-2">
              <button className="cursor-pointer text-xl hover:bg-secondary hover:text-primary text-tertiary font-serif py-2 px-4 rounded-lg w-64 shadow-xl bg-primary "
              onClick={handlerConsulta}>Solicitar cuenta de Vendedor</button>
            </li>  ) : (
              <li>
                <Link href={"/Dashboard"}>
                <button className="cursor-pointer text-xl hover:bg-secondary hover:text-primary text-tertiary font-serif py-2 px-4 rounded-lg w-64 shadow-xl bg-primary ">Ir al Dashboard</button>
                </Link>
              </li>
            )
              }
          </ul>
        </div>
        <div className="w-3/4 m-10">{renderComponenteActual()}</div>
      </div>
      <Toaster/>
    </div>
  );
}

export default AuthGuard(Perfil);
