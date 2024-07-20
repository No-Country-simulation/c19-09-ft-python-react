"use client";
import React, { useState, useEffect } from "react";

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["images/banner6.jpg", "images/banner9.jpg"]; // Agrega más imágenes si es necesario

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextIndex);
    }, 3000); // Cambia la imagen cada 3 segundos

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  const handleImageChange = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
  };

  return (
    <div className="w-full h-[600px] flex justify-center items-center overflow-hidden relative ">
      <div
        className="absolute inset-0 bg-center bg-cover transition-all duration-300 ease-in-out cursor-pointer"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        onClick={handleImageChange}
      ></div>
    </div>
  );
};

export default Banner;
