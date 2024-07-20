import React from "react";

const Filtros = ({
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  material,
  setMaterial,
  finish,
  setFinish,
  size,
  setSize,
  filteredProducts,
}) => {
  const priceRanges = {
    todos: [0, Infinity],
    bajo: [0, 5000],
    medio: [5001, 10000],
    alto: [10001, 20000],
    premium: [20001, Infinity],
  };

  const [minPrice, maxPrice] = priceRanges[priceRange] || priceRanges["todos"];

  const uniqueValues = (key) => {
    const values = new Set(filteredProducts.map((product) => product[key]));
    return ["todos", ...values];
  };

  return (
    <div className="col-span-1 bg-primary p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6 border-b pb-2 border-secondary">
        Filtros
      </h2>
      <div className="mb-6">
        <label
          htmlFor="price-range"
          className="block text-tertiary text-sm font-medium mb-2"
        >
          Rango de precios
        </label>
        <select
          id="price-range"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="block w-full p-3 border border-secondary rounded-md shadow-sm focus:ring-2 focus:ring-secondary focus:border-secondary"
        >
          <option value="todos">Todos los precios</option>
          <option value="bajo">Hasta $5,000</option>
          <option value="medio">$5,001 - $10,000</option>
          <option value="alto">$10,001 - $20,000</option>
          <option value="premium">Más de $20,000</option>
        </select>
      </div>
      <div className="mb-6">
        <label
          htmlFor="material"
          className="block text-tertiary text-sm font-medium mb-2"
        >
          Material
        </label>
        <select
          id="material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="block w-full p-3 border border-secondary rounded-md shadow-sm focus:ring-2 focus:ring-secondary focus:border-secondary"
        >
          {uniqueValues("material").map((mat) => (
            <option key={mat} value={mat}>
              {mat.charAt(0).toUpperCase() + mat.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label
          htmlFor="finish"
          className="block text-tertiary text-sm font-medium mb-2"
        >
          Acabado
        </label>
        <select
          id="finish"
          value={finish}
          onChange={(e) => setFinish(e.target.value)}
          className="block w-full p-3 border border-secondary rounded-md shadow-sm focus:ring-2 focus:ring-secondary focus:border-secondary"
        >
          {uniqueValues("finish").map((fin) => (
            <option key={fin} value={fin}>
              {fin.charAt(0).toUpperCase() + fin.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label
          htmlFor="size"
          className="block text-tertiary text-sm font-medium mb-2"
        >
          Tamaño
        </label>
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="block w-full p-3 border border-secondary rounded-md shadow-sm focus:ring-2 focus:ring-secondary focus:border-secondary"
        >
          {uniqueValues("size").map((siz) => (
            <option key={siz} value={siz}>
              {siz.charAt(0).toUpperCase() + siz.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filtros;
