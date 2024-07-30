"use client";
import AuthGuard from "@/components/authGuard";
import React from "react";

const MyAccount = () => {
  return <div className="mt-44 flex justify-center ">ORDENES DE COMPRA</div>;
};

export default AuthGuard(MyAccount);
