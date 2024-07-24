"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { data } from "../../../../public/data";

//toast
import { toast, Toaster } from "react-hot-toast";

//iconos
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import ProductSlider from "../../../components/ProducSlider/ProductSlider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addItem, getCartData } from "@/redux/features/cart";
import Link from "next/link";
import { addFavorite, getlogindata, removeFavorite } from "@/redux/features/userSlice";

const Details = ({ params }) => {
  //dispatch
  const dispatch = useAppDispatch();

  //estado del carrito
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const user = useAppSelector((state) => state.useReducer.user);

  console.log("user favoritos", user?.favorites);

  //traer el id del producto
  const { _id } = params;
  const productId = parseInt(_id);
  const productos = data.products;
  const product = productos.find((product) => product._id === productId);

  //Manejar la imagen seleccionada y el hover
  const [selectedImage, setSelectedImage] = useState(product.image[0]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  //agregar productos al carrito
  const handleAddToCart = () => {
    if (quantity >= 1) {
      const productData = {
        _id: product._id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        subtotal: product.price * quantity,
        image: product.image[0],
        material: product.material,
        size: product.size,
        finish: product.finish,
        stock: product.stock,
      };

      const existingItem = cartItems.find((item) => item._id === product._id);

      if (
        existingItem &&
        existingItem.quantity + quantity > existingItem.stock
      ) {
        toast.success(
          "No hay suficiente stock disponible para agregar más unidades de este producto al carrito."
        );
      } else {
        dispatch(addItem(productData));
        toast.success("Producto agregado al carrito.");
      }
    } else {
      toast.success("La cantidad debe ser mayor a 0");
    }
  };

  //buscar vendedor con id
  const vendedor = data.users.find(
    (vendedor) => vendedor._id === product.idvendedor
  );

  //favoritos
  const [isFavorite, setIsFavorite] = useState(user?.favorites || []);

  useEffect(() => {
    setIsFavorite(user?.favorites || []);
  }, [user]);

  useEffect(() => {
    dispatch(getCartData());
    dispatch(getlogindata());
  }, [dispatch]);

  const handleToggleFavorite = () => {
    if (user) {
      const productId = product._id; 
  
      if (isFavorite.includes(productId)) {
        dispatch(removeFavorite(productId));
        setIsFavorite((prevFavorites) => prevFavorites.filter(id => id !== productId));
        toast.success("Producto eliminado de tus favoritos.");
      } else {
        dispatch(addFavorite(productId));
        setIsFavorite((prevFavorites) => [...prevFavorites, productId]);
        toast.success("Producto agregado a tus favoritos.");
      }
    }
  };
  

  

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-16 md:py-20 md:px-20 cursor-pointer">
        <div className="flex flex-col items-start text-start  ">
          <div className="flex flex-col md:flex-row-reverse gap-6 items-center  md:m-4 ">
            <div className="relative w-[500px] h-[420px] md:mb-4 rounded-md ">
              <Image
                src={hoveredImage || selectedImage}
                alt="Imagen del producto seleccionada"
                layout="fill"
                objectFit="contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
            </div>
            {/* <div className="md:h-full justify-between flex flex-row md:flex-col ">
              {product.image.map((src, index) => (
                <div
                  key={index}
                  className="relative w-20 h-24 items-start cursor-pointer rounded-md border-solid border-2 border-primary"
                  onClick={() => setSelectedImage(src)}
                  onMouseEnter={() => setHoveredImage(src)}
                  onMouseLeave={() => setHoveredImage(false)}
                >
                  <Image
                    src={src}
                    alt={`Imagen del producto ${index + 1}`}
                    layout="fill"
                    objectFit="contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 100px"
                  />
                </div>
              ))}
            </div> */}
          </div>
          <div className="flex flex-col items-start text-start py-4 px-8 md:px-4">
            <h2 className="text-xl font-bold ">Descripcion del producto</h2>
            <p className="text-lg ">{product.description}</p>
          </div>
        </div>

        {/* Informacion del producto */}
        <div className="flex flex-col items-start text-start py-4 px-8 gap-6">
          <h2 className="text-4xl font-bold ">{product.title}</h2>
          <div className="flex items-center gap-4">
          
          {user && (
            <button
            onClick={handleToggleFavorite}
              className={`
      flex justify-center items-center text-center 
      transition duration-300 ease-in-out`}
            >
              {isFavorite.includes(product._id) ? (
                <BsHeartFill className="text-2xl text-red-700" />
              ) : (
                <BsHeart className="text-2xl text-red-700" />
              )}
            </button>
          )}
     <p>{product.rating}</p>
          </div>
          {/* Icono de corazón para agregar a favoritos */}

          <Link href={`/Profile/${vendedor?._id}`}>
            <p className="text-xl ">
              Perfil del vendedor: {""}
               <span className="text-secondary font-bold underline ">
             {vendedor?.name}
               </span>
            </p>
          </Link>
          <p className="text-2xl font-bold text-secondary">$ {product.price}</p>
          <p className="text-xl font-extralight">{product.category}</p>
          {product.stock > 0 ? (
            <p className="text-sm font-extralight">
              cantidad disponible: {product.stock}
            </p>
          ) : (
            <p className="text-xl font-extralight">❌ sin stock</p>
          )}
     
          {product.stock > 0 && (
            <input
              type="number"
              value={quantity}
              min="1"
              max={product.stock}
              onChange={handleQuantityChange}
              className="border border-gray-300 rounded p-2 text-center"
            />
          )}
          <button
            onClick={handleAddToCart}
            type="button"
            className="flex flex-row gap-4 items-center justify-center w-80  sm:w-96 h-10 bg-secondary text-white text-lg hover:bg-tertyari rounded-full duration-300 "
          >
            <MdOutlineShoppingCart size={25} /> Agregar al carrito
          </button>
          <Toaster position="top-center" />
        </div>
      </div>

      {/* Relacionados */}

      <div className="mb-10 px-8 md:px-20">
        <h2 className="text-3xl font-bold mb-4">Relacionados</h2>
        <ProductSlider category={product.category} />
      </div>
    </>
  );
};

export default Details;
