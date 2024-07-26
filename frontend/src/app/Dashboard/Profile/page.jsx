"use client";
import PerfilUsuario from "@/components/PerfilUsuario/PerfilUsuario";
import React from "react";

const page = () => {
  return (
    <div>
      <div>
        <h1>Datos del Profile</h1>
      </div>
      <div className="flex justify-center mt-20">
        <PerfilUsuario/>
      </div>
    </div>
  );
};

export default page;
