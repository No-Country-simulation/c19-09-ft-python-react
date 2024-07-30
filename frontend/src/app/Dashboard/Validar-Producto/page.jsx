"use client";

import { toast, Toaster } from "react-hot-toast";
import { data } from "../../../../public/data";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const user = useAppSelector((state) => state.useReducer.user);
  const [productos, setProductos] = useState(data.products);

  const vendedorId = parseInt(user?._id);

  const handleValidar = (id) => {
    setProductos(productos.filter((producto) => producto._id !== id));
    toast.success("Producto Validado");
  };

  const handleInvalidar = (id) => {
    setProductos(productos.filter((producto) => producto._id !== id));
    toast.error("Producto Invalidado");
  };

  return (
    <div className="p-6 items-center">
      <h1 className="text-3xl font-bold">Lista de productos</h1>
      <div>
        <div className="mt-20 px-10">
          {productos.length > 0 ? (
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
                {productos.map((item) => (
                  <tr key={item._id} className="border-b text-sm">
                    <td className="p-2">
                      <Image
                        width={150}
                        height={150}
                        src={item.image[0]}
                        alt={item.title}
                        className="object-contain w-20 h-20 mr-4 rounded-md"
                      />
                    </td>
                    <td className="p-2 text-center">{item.title}</td>
                    <td className="p-2 text-center">{item.material}</td>
                    <td className="p-2 text-center">{item.size}</td>
                    <td className="p-2 text-center">{item.finish}</td>
                    <td className="p-2 text-center">${item.price}</td>
                    <td className="p-2 text-center">{item.stock}</td>
                    <td className="p-2 text-center">
                      <button
                        className="bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-800 focus:outline-none cursor-pointer"
                        onClick={() => handleValidar(item._id)}
                      >
                        Validar
                      </button>
                    </td>
                    <td className="p-2 text-center">
                      <button
                        className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-800 focus:outline-none cursor-pointer"
                        onClick={() => handleInvalidar(item._id)}
                      >
                        Deshabilitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">
              No se encontraron productos para validar
            </p>
          )}
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Page;
