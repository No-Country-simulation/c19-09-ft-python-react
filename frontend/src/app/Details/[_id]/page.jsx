"use client";

import Image from "next/image";
import { useState } from "react";
import { data } from "../../../../public/data";

//iconos
import { MdOutlineShoppingCart } from "react-icons/md";
import ProductSlider from "../../../components/ProducSlider/ProductSlider";

const Details = ({ params }) => {
  const { _id } = params;
  const productId = parseInt(_id);
  const productos = data.products;
  const product = productos.find((product) => product._id === productId);

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

  return (
    <>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-16 md:py-20 md:px-20 cursor-pointer">
      <div className="flex flex-col items-start text-start  ">
        <div className="flex flex-col md:flex-row-reverse gap-6 items-center  md:m-4 ">
          <div className="relative w-[400px] h-[420px] md:mb-4 rounded-md ">
            <Image
              src={hoveredImage || selectedImage}
              alt="Imagen del producto seleccionada"
              layout="fill"
              objectFit="contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            />
          </div>
          <div className="md:h-full justify-between flex flex-row md:flex-col ">
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
          </div>
        </div>
        <div className="flex flex-col items-start text-start py-4 px-8 md:px-4">
          <h2 className="text-xl font-bold ">Descripcion del producto</h2>
          <p className="text-lg ">{product.description}</p>
        </div>
      </div>

      {/* Informacion del producto */}
      <div className="flex flex-col items-start text-start py-4 px-8 gap-6">
        <h2 className="text-4xl font-bold ">{product.title}</h2>
        <p className="text-2xl font-bold text-primary">$ {product.price}</p>
        <p className="text-xl font-extralight">{product.category}</p>
        {product.stock > 0 ? (
          <p className="text-sm font-extralight">cantidad disponible: {product.stock}</p>
        ) : ( <p className="text-xl font-extralight">❌ sin stock</p>)}
        <p>{product.rating}</p>
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
        <button type="button" className="flex flex-row gap-4 items-center justify-center w-80  sm:w-96 h-10 bg-primary text-white text-lg hover:bg-tertiary rounded-full duration-300 "><MdOutlineShoppingCart size={25} /> Agregar al carrito</button>
      </div>
    </div>


    
    {/* Relacionados */}

    <div className="mb-10 px-8 md:px-20">
      <h2 className="text-3xl font-bold mb-4">Relacionados</h2>
      <ProductSlider  category={product.category} />
    </div>
    </>
  );
};

export default Details;