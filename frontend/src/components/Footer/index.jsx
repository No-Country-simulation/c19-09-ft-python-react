import "@fortawesome/fontawesome-free/css/all.min.css"; // Importa FontAwesome aquí
import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center z-10 w-full py-5 px-8 text-sm font-light bg-secondary text-primary">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex items-center mb-4">
          <p className="text-primary mr-2">Síguenos en Instagram</p>
          <a
            href="https://instagram.com"
            className="text-primary text-xl hover:text-white transition-colors"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <p className="text-center text-primary">
          © 2024 wood . Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
