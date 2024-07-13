import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Card = ({ _id, title, price, image, category, stock, rating }) => {


  return (
    <>
   <Link href={`/Details/${_id}`}>
    <div
      className=" shadow-xl hover:scale-110 hover:shadow-2xl transition duration-600 gap-4 cursor-pointer rounden-lg p-8"
    >
      <div className="flex justify-center items-center py-2 px-4">  
        <Image
          src={image[0]}
          alt={title}
          width={150}
          height={150}
          className="object-contain justify-center items-center h-48 w-96 transition-all duration-200" 
        />
      </div>
      <div className=" flex flex-col text-center gap-2 py-2 px-4">
        <h1 className="text-md font-sans font-bold hover:text-primary hover:underline text-center">{title}</h1>
        <p className="text-xl font-sans  font-semibold">$ {price}</p>
        <p className="text-sm text-center font-bold bg-primary text-white rounded-full">6 cuotas sin interes</p>
      </div>
    </div>
    </Link>
    </>
  );
};

export default Card;