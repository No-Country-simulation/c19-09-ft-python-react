import React from "react";

const Buscador = ({ handleSearch }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md">
        {" "}
        {/* Limita el ancho del input */}
        <input
          onChange={handleSearch}
          type="search"
          placeholder="Buscar..."
          className="w-full border border-secondary px-4 py-2 rounded-lg bg-primary text-tertiary placeholder-tertiary focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Buscador;
