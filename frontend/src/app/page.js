"use client";

import Image from "next/image";
import Header from "../components/Header/Header";
import ProductSlider from "../components/ProducSlider/ProductSlider";
import Link from "next/link";
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { getCartData } from "@/redux/features/cart";
import { getlogindata } from "@/redux/features/userSlice";
import Buscador from "@/components/Buscador/Buscador"; // Importa el componente Buscador
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Ajusta la importación según el icono que quieras

export default function Home() {
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const user = useAppSelector((state) => state.useReducer.user);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getCartData());
    dispatch(getlogindata());
  }, [dispatch]);

  const sections = [
    { title: "Mas vendidos", topRated: true },
    { title: "Muebles", category: "muebles" },
    { title: "Utensilios de cocina", category: "utensilios" },
    { title: "Juguetes", category: "juguetes" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Aquí podrías redirigir a una página de resultados o filtrar los productos
    console.log("Buscar productos con:", searchQuery);
    // Ejemplo: redirigir a la página de búsqueda
    window.location.href = `/SearchPage?query=${searchQuery}`;
  };

  return (
    <>
      <Banner />
      <Header />
      <main>
        <div className="px-10 md:px-4 mt-20">
          <div className="flex flex-row items-center justify-center mb-8">
            <Buscador handleSearch={(e) => setSearchQuery(e.target.value)} />
            <button
              onClick={handleSearch}
              className="ml-2 p-2 bg-secondary text-primary rounded flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:bg-tertiary"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-primary" />
            </button>
          </div>
          {sections.map((section, index) => (
            <div key={index} className="mb-20 md:px-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-tertiary">
                  {section.title}
                </h2>
                {!section.topRated && (
                  <Link
                    href={`/Products/${section.category}`}
                    className="text-md text-secondary hover:text-tertiary"
                  >
                    Ver todos
                  </Link>
                )}
              </div>
              <ProductSlider
                topRated={section.topRated}
                category={section.category}
              />
            </div>
          ))}
        </div>
        <Footer />
      </main>
    </>
  );
}
