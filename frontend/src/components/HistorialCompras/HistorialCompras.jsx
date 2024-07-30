import React, { useEffect, useState } from "react";

const HistorialCompras = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);

  useEffect(() => {
    // Recupera los productos del local storage
    const items = localStorage.getItem("purchasedItems");
    if (items) {
      setPurchasedItems(JSON.parse(items));
    }
  }, []);

  return (
    <div className="p-14 font-bold">
      <fieldset className="border p-4 rounded-md">
        <legend className="text-2xl p-8 text-start font-bold text-bgred">
          Historial de Compras
        </legend>
        <div className="flex flex-col p-4 rounded-lg shadow-md">
          {purchasedItems.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Imagen</th>
                  <th className="text-left p-2">Producto</th>
                  <th className="text-left p-2">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {purchasedItems.map((item, index) => (
                  <tr key={index} className="border-b text-sm">
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-contain w-20 h-20"
                      />
                    </td>
                    <td className="p-2">{item.title}</td>
                    <td className="p-2">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">
              No hay productos en el historial de compras.
            </p>
          )}
        </div>
      </fieldset>
    </div>
  );
};

export default HistorialCompras;
