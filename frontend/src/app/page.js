import Image from "next/image";
import Header from "../components/Header/Header";
import ProductSlider from "../components/ProducSlider/ProductSlider";
import Link from "next/link";
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer";
import Buscador from "@/components/Buscador/Buscador";

export default function Home() {
  const sections = [
    { title: "Mas vendidos", topRated: true },
    { title: "Muebles", category: "muebles" },
    { title: "Utensilios de cocina", category: "utensilios" },
    { title: "Juguetes", category: "juguetes" },
  ];

  return (
    <>
      <Banner />
      <Buscador />
      <main className="">
        <div className="px-10 md:px-4 mt-20">
          {sections.map((section, index) => (
            <div key={index} className="mb-20  md:px-10">
              <div className="flex justify-evenly ">
                <h2 className="text-3xl font-bold mb-6 flex  ">
                  {section.title}
                </h2>
                {!section.topRated && (
                  <Link
                    href={`/Products/${section.category}`}
                    className="text-md text-primary"
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
