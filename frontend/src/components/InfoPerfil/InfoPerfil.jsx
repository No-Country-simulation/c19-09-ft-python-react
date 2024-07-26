import React from "react";

const InfoPerfil = () => {
  return (
    <div className="min-h-screen mt-10 px-4 sm:px-6 lg:px-12 py-8 bg-primary text-tertiary flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-secondary text-center">
        ¡Bienvenido a tu Perfil!
      </h2>
      <p className="text-secondary mb-8 text-center max-w-4xl">
        En tu perfil de usuario, puedes realizar diversas acciones para
        personalizar tu experiencia. A continuación, te explicamos algunas de
        las funcionalidades disponibles:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        <div className="p-8 bg-white rounded-md shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-tertiary text-center">
            Modificar Datos Personales
          </h3>
          <p className="text-secondary text-base text-center">
            Actualiza tu información personal, como nombre, dirección y detalles
            de contacto.
          </p>
        </div>

        <div className="p-8 bg-white rounded-md shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-tertiary text-center">
            Ver Historial de Compras
          </h3>
          <p className="text-secondary text-base text-center">
            Explora todas las compras que has realizado. Obtén detalles sobre
            productos, fechas y más.
          </p>
        </div>

        <div className="p-8 bg-white rounded-md shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-tertiary text-center">
            Ver tus productos favoritos
          </h3>
          <p className="text-secondary text-base text-center">
            Verás un listado de todos los productos que seleccionaste como
            favorito.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPerfil;
