import React, { useEffect, useState } from "react";
import { data } from "../../../public/data";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Image from "next/image";
import { removeFavorite } from "@/redux/features/userSlice";

//toast
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";

const FavoritesList = () => {
  const user = useAppSelector((state) => state.useReducer.user);
  const dispatch = useAppDispatch();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      setFavorites(user.favorites);
    }
  }, [user]);

  console.log("favorites", favorites);

  const favoriteProducts = data.products.filter((product) =>
    favorites.includes(product._id)
  );

  console.log("favoriteProducts", favoriteProducts);

  const handleToggleFavorite = (productId) => {
    if (user) {
      // Elimina el producto de la lista de favoritos
      dispatch(removeFavorite(productId));
      setFavorites((prevFavorites) =>
        prevFavorites.filter((id) => id !== productId)
      );
      toast.success("Producto eliminado de tus favoritos.");
    }
  };

  return (
    <div>
      <h2>Favorite Products</h2>
      <div className="overflow-x-auto mt-10">
        {favoriteProducts.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 mr-4"></th>
                <th className="text-left p-2">Producto</th>
                <th className="text-left p-2">Precio</th>
                <th className="text-left p-2">Material</th>
                <th className="text-left p-2">Tamaño</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {favoriteProducts.map((item) => (
                <tr key={item._id} className="border-b text-sm text">
                  <td className="p-2">
                    <Link
                      href={`/Details/${item._id}`}
                      className="underline font-bold "
                    >
                      <Image
                        width={200}
                        height={200}
                        src={item.image[0]}
                        alt={item.title}
                        className="object-contain w-20 h-20 mr-4"
                      />
                    </Link>
                  </td>
                  <td className="p-2 text-left">
                    <Link
                      href={`/Details/${item._id}`}
                      className="underline font-bold "
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="p-2 text-left">${item.price}</td>
                  <td className="p-2 text-left">{item.material}</td>
                  <td className="p-2 text-left">{item.size}</td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleToggleFavorite(item._id)}
                    >
                      Eliminar de favoritos
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No hay productos favoritos</p>
        )}
        <Toaster position="top-center" />
      </div>
    </div>
  );
};

export default FavoritesList;
