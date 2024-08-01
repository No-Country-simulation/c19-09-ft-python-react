import React from "react";
import { data } from "../../../../public/data";
import Image from "next/image";
import Link from "next/link";

const page = ({ params }) => {
  const { _id } = params;
  const vendedorId = parseInt(_id);
  const vendedor = data.users.find((vendedor) => vendedor._id === vendedorId);
  const products = data.products.filter(
    (product) => product.idvendedor === vendedorId
  );

  console.log("products", products);

  const countproducts = products.length;

  return (
    <div className="md:mt-[140px]  text-black mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-center items-center">
        <Image
          src={vendedor.image}
          alt={vendedor.name}
          width={200}
          height={200}
          className="rounded-full"
        />
        </div>
        <div className="w-[70%] flex flex-col justify-center items-start
        gap-4">
         <p className="text-3xl"> Detalles del vendedor:</p>
          <p>Nombre: {vendedor.name}</p>
          <p>Email: {vendedor.email}</p>
          <p>Direccion: {vendedor.address.city}</p>
          <p>{countproducts} productos</p>
        </div>
      </div>
      <div className="mt-20 px-10">
      {products.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-center p-2 mr-4"></th>
                  <th className="text-center p-2">Producto</th>
                  <th className="text-center p-2">material</th>
                  <th className="text-center p-2">size</th>
                  <th className="text-center p-2">finish</th>
                  <th className="text-center p-2">Precio</th>
                  <th className="text-center p-2">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item._id} className="border-b text-sm">
                    <td className="p-2">
                      <Link
                        href={`/Details/${item._id}`}
                        className="underline font-bold "
                      >
                        <Image
                        width={150}
                        height={150} 
                          src={item.image[0]}
                          alt={item.title}
                          className="object-contain w-20 h-20 mr-4"
                        />
                      </Link>
                    </td>
                    <td className="p-2 text-center">
                      <Link
                        href={`/Details/${item._id}`}
                        className="underline font-bold "
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="p-2 text-center">{item.material}</td>
                    <td className="p-2 text-center">{item.size}</td>
                    <td className="p-2 text-center">{item.finish}</td>
                    <td className="p-2 text-center">${item.price}</td>
                    <td className="p-2 text-center">{item.stock}</td>
                   
               
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
  );
};

export default page;
