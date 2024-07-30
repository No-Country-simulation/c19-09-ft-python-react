"use client";

import { data } from "../../../../public/data";
import Image from "next/image";
import { useAppSelector } from "../../../redux/hooks";
import Buscador from "../../../components/Buscador/Buscador";
import { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const user = useAppSelector((state) => state.useReducer.user);

  if (!user) {
    return <p>Cargando usuario...</p>; // O cualquier mensaje de carga/placeholder
  }

  const vendedorId = parseInt(user._id);

  const products = data.products.filter(
    (product) => product.idvendedor === vendedorId
  );

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6 items-center">
      <h1 className="text-3xl font-bold">Lista de productos</h1>
      <div className="mt-10 flex justify-between">
        <div className="px-10">
          <Buscador handleSearch={handleSearch} />
        </div>
        <div className="flex justify-end px-10">
          <Link href="/Dashboard/Products/Create">
            <button className="bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-800 focus:outline-none cursor-pointer">
              Agregar nuevo
            </button>
          </Link>
        </div>
      </div>
      <div>
        <div className="mt-20 px-10">
          {filteredProducts.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-center p-2 mr-4"></th>
                  <th className="text-center p-2">Producto</th>
                  <th className="text-center p-2">Material</th>
                  <th className="text-center p-2">Tamaño</th>
                  <th className="text-center p-2">Finalizado</th>
                  <th className="text-center p-2">Precio</th>
                  <th className="text-center p-2">Stock</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((item) => (
                  <tr key={item._id} className="border-b text-sm">
                    <td className="p-2">
                      <Image
                        width={150}
                        height={150}
                        src={item.image[0]}
                        alt={item.title}
                        className="object-contain w-20 h-20 mr-4"
                      />
                    </td>
                    <td className="p-2 text-center">{item.title}</td>
                    <td className="p-2 text-center">{item.material}</td>
                    <td className="p-2 text-center">{item.size}</td>
                    <td className="p-2 text-center">{item.finish}</td>
                    <td className="p-2 text-center">${item.price}</td>
                    <td className="p-2 text-center">{item.stock}</td>
                    <td className="p-2 text-center">
                      <Link href={`/Dashboard/Products/Edit/${item._id}`}>
                        <button className="bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-800 focus:outline-none cursor-pointer">
                          Editar
                        </button>
                      </Link>
                    </td>
                    <td className="p-2 text-center">
                      <button className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-800 focus:outline-none cursor-pointer">
                        Deshabilitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">
              Este vendedor no tiene productos en su catálogo
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
