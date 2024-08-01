"use client"; // Asegúrate de que este archivo sea un componente de cliente

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Filtros from "../../components/Filtros/Filtros";
import Buscador from "../../components/Buscador/Buscador";
import { data } from "../../../public/data";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estado de búsqueda y filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("todos");
  const [material, setMaterial] = useState("todos");
  const [finish, setFinish] = useState("todos");
  const [size, setSize] = useState("todos");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (queryParam) {
      setSearchQuery(queryParam);
      // Filtra los productos basados en la consulta
      const filtered = data.products.filter((product) =>
        product.title.toLowerCase().includes(queryParam.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchParams]);

  useEffect(() => {
    // Filtra los productos basado en los filtros
    let filtered = data.products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filtra por rango de precios
    const priceRanges = {
      todos: [0, Infinity],
      bajo: [0, 5000],
      medio: [5001, 10000],
      alto: [10001, 20000],
      premium: [20001, Infinity],
    };
    const [minPrice, maxPrice] =
      priceRanges[priceRange] || priceRanges["todos"];
    filtered = filtered.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    // Filtra por material
    filtered =
      material === "todos"
        ? filtered
        : filtered.filter((product) => product.material === material);

    // Filtra por acabado
    filtered =
      finish === "todos"
        ? filtered
        : filtered.filter((product) => product.finish === finish);

    // Filtra por tamaño
    filtered =
      size === "todos"
        ? filtered
        : filtered.filter((product) => product.size === size);

    setFilteredProducts(filtered);
  }, [searchQuery, priceRange, material, finish, size]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/Search?query=${searchQuery}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-36">
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
        <div className="flex flex-row items-center gap-4 mb-4">
          <div className="relative w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-secondary rounded-l-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Buscar productos..."
            />
            <MagnifyingGlassIcon
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tertiary cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-secondary"
              onClick={handleSearch}
            />
          </div>
        </div>

        <div>
          {filteredProducts.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/Details/${product._id}`}
                  className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                >
                  <div className="p-4 border border-secondary rounded-md shadow-sm hover:scale-105 hover:shadow-2xl transition duration-300 bg-primary">
                    <h2 className="text-md font-sans font-bold text-center text-secondary">
                      {product.title}
                    </h2>
                    <div className="flex justify-center items-center py-2 px-4">
                      <img
                        src={product.image[0]}
                        alt={product.title}
                        className="object-contain h-48 w-full transition-all duration-200"
                      />
                    </div>
                    <p className="text-sm text-center font-bold text-black rounded-full">
                      {product.description}
                    </p>
                    <div className="flex flex-col text-center gap-2 py-2 px-4">
                      <p className="text-xl font-sans font-semibold text-tertiary">
                        Precio: ${product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No se encontraron productos.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
