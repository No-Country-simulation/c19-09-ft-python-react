import React from "react";

const Buscador = ({ handleSearch }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md">
        <input
          onChange={handleSearch}
          type="search"
          placeholder="Buscar..."
          className="w-full border border-secondary rounded-l-md pl-10 pr-4 py-2 text-tertiary bg-primary focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
    </div>
  );
};

export default Buscador;
