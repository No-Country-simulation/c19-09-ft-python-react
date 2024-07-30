"use client";

import { useState, useMemo } from "react";
import Cards from "../Cards/Cards";
import Buscador from "../Buscador/Buscador";
import Filtros from "../Filtros/Filtros";
import { Toaster } from "react-hot-toast";

const Products = ({ category, data }) => {
  const productos = data.products || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("todos");
  const [material, setMaterial] = useState("todos");
  const [finish, setFinish] = useState("todos");
  const [size, setSize] = useState("todos");

  const [counterProducts, setCounterProducts] = useState(8);

  const handleLoadMore = () => {
    setCounterProducts(counterProducts + 4);
  };

  const priceRanges = {
    todos: [0, Infinity],
    bajo: [0, 5000],
    medio: [5001, 10000],
    alto: [10001, 20000],
    premium: [20001, Infinity],
  };

  const [minPrice, maxPrice] = priceRanges[priceRange] || priceRanges["todos"];

  // Filtra los productos basados en todos los criterios
  const filteredProducts = useMemo(() => {
    return productos
      .filter(
        (product) => category === "todos" || product.category === category
      )
      .filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      )
      .filter(
        (product) => material === "todos" || product.material === material
      )
      .filter((product) => finish === "todos" || product.finish === finish)
      .filter((product) => size === "todos" || product.size === size);
  }, [category, productos, searchQuery, priceRange, material, finish, size]);

  const slicedProducts = filteredProducts.slice(0, counterProducts);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <Filtros
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        material={material}
        setMaterial={setMaterial}
        finish={finish}
        setFinish={setFinish}
        size={size}
        setSize={setSize}
        filteredProducts={filteredProducts}
      />
      <div className="col-span-3">
        <div className="flex flex-row md:flex-col gap-9">
          <div className="mb-4">
            <Buscador handleSearch={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div>
            {filteredProducts.length > 0 ? (
              <>
                <h2 className="text-3xl font-bold mb-4">
                  {category.toUpperCase()}
                </h2>
                <Cards products={slicedProducts} />
              </>
            ) : (
              <h2 className="text-3xl font-bold mb-4">
                <span>No se encontraron resultados</span>
              </h2>
            )}
          </div>
          {slicedProducts.length < filteredProducts.length && (
            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLoadMore}
              >
                Cargar más
              </button>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Products;
