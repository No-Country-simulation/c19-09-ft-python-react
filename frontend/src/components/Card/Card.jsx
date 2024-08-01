import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ _id, title, price, image }) => {
  return (
    <Link href={`/Details/${_id}`}>
      <div className="bg-white text-tertiary shadow-xl  hover:scale-105 hover:shadow-2xl transition-transform duration-300 rounded-lg p-6 cursor-pointer">
        <div className="flex justify-center items-center py-2 px-4">
          <Image
            src={image[0]}
            alt={title}
            width={150}
            height={150}
            className="object-contain h-48 w-96 transition-all duration-200"
          />
        </div>
        <div className="flex flex-col text-center gap-2 py-2 px-4">
          <h1 className="truncate text-md font-sans font-bold hover:text-secondary hover:underline">
            {title}
          </h1>
          <p className="text-xl font-sans font-semibold">$ {price}</p>
          <p className="text-sm text-center  bg-secondary text-primary rounded-full 
          py-2">
            6 cuotas sin interés
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
