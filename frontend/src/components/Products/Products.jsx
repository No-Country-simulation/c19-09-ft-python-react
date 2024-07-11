"use client";

import Cards from "../Cards/Cards";
import {data} from "../../../public/data";

const Products = ({category}) => {

  const productos = data.products;
  const filteredProducts = category === "todos" ? productos : productos.filter(product => product.category === category);
  console.log("products", productos)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div className="col-span-1">
        <h1>Filtros</h1>
        {/* Aquí puedes agregar filtros adicionales si es necesario */}
      </div>
      <div className="col-span-3">
        <h1>Productos</h1>
        <Cards products={filteredProducts} />
      </div>
    </div>
  );
};

export default Products;

