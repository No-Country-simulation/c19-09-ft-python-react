"use client";

import Cards from "../Cards/Cards";
import { data } from "../../../public/data";
import Buscador from "../Buscador/Buscador";
import { useState } from "react";

const Products = ({ category }) => {
  const productos = data.products;
  const filteredProducts =
    category === "todos"
      ? productos
      : productos.filter((product) => product.category === category);
  console.log("products", productos);

  //busqueda
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProductsSearch = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div className="col-span-1">
        <h2>Filtros</h2>
        {/* Aquí puedes agregar filtros adicionales si es necesario */}
      </div>
      <div className="col-span-3">
  <div className="flex flex-row md:flex-col gap-9">
    <div className="mb-4">
      <Buscador handleSearch={handleSearch} />
    </div>
    <div>
      {filteredProductsSearch.length > 0 ? (
        <>
          <h2 className="text-3xl font-bold mb-4">{category.toUpperCase()}</h2>
          <Cards products={filteredProductsSearch} />
        </>
      ) : (
        <h2 className="text-3xl font-bold mb-4">
          <span>No se encontraron resultados</span>
        </h2>
      )}
    </div>
  </div>
</div>
    </div>
  );
};

export default Products;
