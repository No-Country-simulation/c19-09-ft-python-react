"use client";
import React, { useState, useEffect } from "react";
import styles from "./Banner.module.css";

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["images/banner.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextIndex);
    }, 5000); // Cambia la imagen cada 5 segundos

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  const handleImageChange = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
  };

  return (
    <div className={styles.banner}>
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        onClick={handleImageChange}
      ></div>
    </div>
  );
};

export default Banner;
