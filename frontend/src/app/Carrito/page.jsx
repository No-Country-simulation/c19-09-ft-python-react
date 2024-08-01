"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartData, removeItem, updateQuantity } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
// import { useShoppingCartupdateUserMutation } from "@/redux/services/usersApi";
import { toast, Toaster } from "react-hot-toast";

const Carrito = () => {
  const dispatch = useAppDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const user = useAppSelector((state) => state.useReducer.user);
  // const userToken = useAppSelector((state) => state.loginReducer.token);

  let idItems = [];

  cartItems.forEach((product) => {
    for (let i = 0; i < product.quantity; i++) {
      idItems.push(product._id);
    }
  });

  // const [updateCart] = useShoppingCartupdateUserMutation();

  const handleUpdateCart = async () => {
    // Saco solo los id de shoppingCart para ponerlo la bd
    const shoppingcart = [];
    cartItems.forEach((product) => {
      for (let i = 0; i < product.quantity; i++) {
        shoppingcart.push(product._id);
      }
    });
    try {
      if (userId && userId?._id && userToken) {
        const userID = userId?._id;
        const token = userToken;
        const shoppingCart = idItems;

        const config = {
          shoppingCart,
          userID,
          token,
        };

        // const { data, error } = await updateCart(config);

        if (error) {
          console.error("Error al actualizar el carrito:", error);
        } else {
          console.log("Carrito actualizado con éxito:", data);
        }
      } else {
        console.log(
          "Usuario no autenticado. No se actualizará el carrito en la base de datos."
        );
      }
    } catch (error) {
      console.error("Error general al actualizar el carrito:", error);
    }
  };
  // Elimino del localStorage y de la BD
  const handleRemoveItem = async (_id) => {
    dispatch(removeItem({ _id }));
    handleUpdateCart();
    toast.success("Removido del carrito");
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    const item = cartItems.find((item) => item._id === itemId);

    if (!isNaN(newQuantity) && newQuantity > 0 && newQuantity <= item.stock) {
      dispatch(updateQuantity({ itemId, newQuantity }));
    }

    await handleUpdateCart();
  };

  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 1 && newQuantity <= item.stock) {
      handleQuantityChange(item._id, newQuantity);
    }
  };

  const count = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isCartEmpty = cartItems.length === 0;

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2);
  };

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  useEffect(() => {
    console.log("Contenido del carrito:", cartItems);
    handleUpdateCart();
  }, [cartItems]);

  return (
    <div className="p-14 font-bold">
      <fieldset className="border  p-4 rounded-md ">
        <legend className="text-2xl p-8 text-start font-bold text-secondary ">
          Detalle del Carrito
        </legend>
        <div className=" flex flex-col p-4 -mt-8 rounded-lg shadow-md">
          {cartItems.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-center p-2 mr-4"></th>
                  <th className="text-center p-2">Producto</th>
                  <th className="text-center p-2">material</th>
                  <th className="text-center p-2">size</th>
                  <th className="text-center p-2">finish</th>
                  <th className="text-center p-2">Precio</th>
                  <th className="text-center p-2">Cantidad</th>
                  <th className="text-center p-2">Subtotal</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-b text-sm">
                    <td className="p-2">
                      <Link
                        href={`/Details/${item._id}`}
                        className="underline font-bold "
                      >
                        <img
                          src={item.image}
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
                    <td className="p-2 text-center">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          if (newQuantity >= 1 && newQuantity <= item.stock) {
                            handleQuantityChange(item._id, newQuantity);
                          }
                        }}
                        min="1"
                        max={item.stock}
                        className="w-16 p-1 text-center border"
                      />
                    </td>
                    <td className="p-2 text-center font-bold ">
                      ${item.subtotal.toFixed(2)}
                    </td>
                    <td className="p-2 text-center hover:text-red-600  ">
                      <button onClick={() => handleRemoveItem(item._id)}>
                        Eliminar
                      </button>
                    </td>
                    <Toaster position="top-center" />
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">
              El carrito esta vacío.
              <br />
              <Link
                href="/#product"
                className="underline font-bold text-secondary"
              >
                <span>Revisa el catalogo para agregar productos</span>
              </Link>
            </p>
          )}
          <div className="w-full flex  m-2 p-4 max-h-80">
            <fieldset className="border border-bggris  p-4 rounded-md">
              <legend className="text-base  text-start font-bold text-bgred p-4">
                Resumen del Carrito
              </legend>
              <div className="flex justify-end  overflow-auto">
                <div className=" flex-col">
                  <p>
                    Cant. de productos:
                    <span className="text-bgred ml-2">{count}</span>
                  </p>
                  <br />
                  <hr />
                  <br />
                  <p className=" text-xl flex text-start ">
                    Total:
                    <span className="text-bgred  ml-2 flex justify-end text-end">
                      $ {calculateTotal()}
                    </span>
                  </p>
                  <br />
                  {!isCartEmpty && (
        <>
          {user ? (
            <Link href="/Checkout">
              <button
                className="bg-secondary text-white text-base py-2 px-10 rounded-lg mx-2 
                flex justify-center items-center text-center whitespace-nowrap hover:bg-bgred hover:text-white"
              >
                Finalizar Compra
              </button>
            </Link>
          ) : (
            <Link href="/Sign-in">
              <button
                className="bg-secondary text-white text-base py-2 px-10 rounded-lg mx-2 
                flex justify-center items-center text-center whitespace-nowrap hover:bg-bgred hover:text-white"
              >
                Inicia Sesión para Finalizar Compra
              </button>
            </Link>
          )}
        </>
      )}
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </fieldset>

      {/* cierre del contenedor principal */}
    </div>
  );
};

export default Carrito;
