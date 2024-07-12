import "@fortawesome/fontawesome-free/css/all.min.css"; // Importa FontAwesome aquí
import React from "react";

const Footer = () => {
  return (
    <footer className="bottom-0 flex justify-between items-center z-10 w-full py-5 px-8 text-sm font-light bg-secondary">
      <div className="container-fluid mx-auto bottom-0">
        <div className="flex justify-center items-center mb-4">
          <p className="text-white mr-2">Síguenos en Instagram</p>
          <a href="https://instagram.com" className="text-white">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <p className="text-center text-white">
          © 2024 wood . Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
