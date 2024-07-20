import React from "react";
/* import { useAppSelector } from "@/redux/hooks"; */

const InfoPerfil = () => {
  /* const userData = useAppSelector((state) => state.loginReducer.user);
  const userToken = useAppSelector((state) => state.loginReducer.token);
  const name = userData?.name;
  console.log("este es el name " + name);
  console.log("este es el token " + userToken); */

  return (
    <div className="min-h-screen mt-20 ml-12 mr-64 p-8 bg-primary text-tertiary">
      <h2 className="text-3xl font-semibold mb-12 text-secondary">
        ¡Bienvenido a tu Perfil!
      </h2>
      <p className="text-secondary mb-6">
        En tu perfil de usuario, puedes realizar diversas acciones para
        personalizar tu experiencia. A continuación, te explicamos algunas de
        las funcionalidades disponibles:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-4 bg-white rounded-md shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-tertiary">
            Modificar Datos Personales
          </h3>
          <p className="text-secondary">
            Actualiza tu información personal, como nombre, dirección y detalles
            de contacto.
          </p>
        </div>

        <div className="p-4 bg-white rounded-md shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-tertiary">
            Revisar Tus Reseñas
          </h3>
          <p className="text-secondary">
            Accede a todas las reseñas que has realizado. Modifica o elimina tus
            comentarios según sea necesario.
          </p>
        </div>

        <div className="p-4 bg-white rounded-md shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-tertiary">
            Ver Historial de Compras
          </h3>
          <p className="text-secondary">
            Explora todas las compras que has realizado. Obtén detalles sobre
            productos, fechas y más.
          </p>
        </div>

        <div className="p-4 bg-white rounded-md shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-tertiary">
            Ver tus productos favoritos
          </h3>
          <p className="text-secondary">
            Verás un listado de todos los productos que seleccionaste como
            favorito.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPerfil;
