import Image from "next/image";
import React from "react";

import {
  FaLeaf,
  FaRecycle,
  FaHandsHelping,
  FaStar,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const items = [
  {
    icon: <FaLeaf className="text-4xl text-green-700" />,
    text: "Promover el uso de materiales naturales y técnicas artesanales.",
  },
  {
    icon: <FaRecycle className="text-4xl text-blue-600" />,
    text: "Contribuir a un estilo de vida más ecológico y responsable.",
  },
  {
    icon: <FaHandsHelping className="text-4xl" />,
    text: "Apoyar a los artesanos locales y preservar las tradiciones artesanales.",
  },
  {
    icon: <FaStar className="text-4xl text-yellow-400" />,
    text: "Ofrecer a nuestros clientes productos de alta calidad.",
  },
];

const Page = () => {
  const nosotros = [
    {
      id: 1,
      nombre: "Alan Favatier",
      imagen: "/images/Alan.jpeg",
      linkedin: "https://www.linkedin.com/in/alan-favatier-a7a67825b/",
      github: "https://github.com/alanfavatier",
      aporte: "Fullstack Developer",
    },
    {
      id: 2,
      nombre: "María José Carrazán",
      imagen: "/images/Maria.jpeg",
      linkedin: "https://www.linkedin.com/in/thebusinesscat/",
      github: "https://github.com/Morgwens",
      aporte: "Fullstack Developer",
    },
    {
      id: 3,
      nombre: "Pablo Guerreño",
      imagen: "/images/Pablo.jpeg",
      linkedin: "https://www.linkedin.com/in/guerre-pablo-agustin/",
      github: "https://github.com/Guerre-Pablo-Agustin",
      aporte: "Fullstack Developer",
    },
  ];

  return (
    <container className="flex flex-col justify-center items-center gap-8 px-10 mt-24">
      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <Image
            src={"/images/ecowood.jpg"}
            alt="logo"
            width={1200}
            height={600}
          />
        </div>
        <div className="flex flex-col gap-10 px-6">
          <h1 className="text-3xl font-bold text-secondary">Sobre Nosotros</h1>
          <h2 className="text-2xl font-bold">EcoWood</h2>
          <span className="text-lg font-semibold ">
            ¡Te damos la bienvenida a EcoWood! Nos alegra que te unas a nuestra
            comunidad. Aquí encontrarás productos únicos y sostenibles, creados
            con dedicación por artesanos talentosos. Explora nuestra tienda,
            descubre piezas exclusivas y ayuda a apoyar la artesanía local.
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <h2 className="flex items-center justify-center text-2xl font-bold text-secondary">
          Nuestro Propósito
        </h2>
        <span className="text-lg w-[40%] mt-6 font-sans">
          {" "}
          El propósito de EcoWood es conectar a los amantes de la madera con
          artesanos talentosos que crean productos únicos y sostenibles. De esta
          forma queremos:{" "}
        </span>
        <ul className="text-lg gap-4 flex flex-col md:flex-row items-center justify-center mt-10">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-center justify-center gap-4"
            >
              {item.icon}
              <span className="text-lg text-center justify-center font-sans">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-6 mt-10">
        <h2 className="flex text-2xl font-bold items-center justify-center text-secondary">
          Nosotros
        </h2>
        <div className="flex flex-col md:flex-row gap-20 m-14">
          {nosotros.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 shadow-xl p-4">
              <div className="flex justify-center w-[300px] h-[200px]">
                <Image
                  src={item.imagen}
                  alt={item.nombre}
                  width={200}
                  height={100}
                  className="rounded-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-4 items-center">
                <h3 className="text-xl font-bold">{item.nombre}</h3>
                <span className="text-lg">{item.aporte}</span>
              </div>
              <div className="flex justify-center gap-4">
                <a
                  href={item.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex  items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <FaLinkedin /> <span>Linkedin</span>
                  </button>
                </a>
                <a href={item.github} target="_blank" rel="noopener noreferrer">
                  <button className="flex  items-center gap-2 bg-gray-700 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded">
                    <FaGithub /> <span>Github</span>
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </container>
  );
};

export default Page;
