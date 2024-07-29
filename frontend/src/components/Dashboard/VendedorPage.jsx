"use client";
import React, { useEffect } from "react";
import { data } from "../../../public/data";
import { CiViewList } from "react-icons/ci";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { getlogindata } from "@/redux/features/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { BarChartHero } from "@/components/Dashboard/BarChar";
import { DonutChartUsageExample } from "@/components/Dashboard/DonutChar";
import { Card, Metric, Text } from '@tremor/react';

const VendedorPage = () => {
  
  const user = useAppSelector((state) => state.useReducer.user);
  const dispatch = useAppDispatch();

  const vendedorId = parseInt(user?._id);
  const vendedor = data.users.find((vendedor) => vendedor._id === vendedorId);
  const products = data.products.filter(
    (product) => product.idvendedor === vendedorId
  );

  const cantidad = products.length;

  const itemsCards = [
    { title: "Total de productos", value: cantidad, icon: CiViewList, color: "bg-red-200", link: `/Dashboard/Products` },
    { title: "Total de ventas", value: 20, icon: CiViewList, color: "bg-red-200", link: `/Dashboard/Products` }
  ];

  useEffect(() => {
    dispatch(getlogindata());
  }, [dispatch]);


  return (
    <main>
      <h1 className="text-3xl underline mb-10">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {itemsCards.map((item, index) => {
          const LinkIcon = item.icon;
          return (
            <Link key={index} legacyBehavior href={item.link}>
              <a className={`rounded-xl ${item.color} hover:bg-sky-200 cursor-pointer p-2 shadow-sm hover:scale-105`}>
                <div className="flex p-4">
                  <LinkIcon className="w-6" />
                  <h3 className="ml-2 text-sm font-medium">{item.title}</h3>
                </div>
                <p className="truncate rounded-xl px-4 py-8 text-center text-2xl">
                  {item.value}
                </p>
              </a>
            </Link>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="mt-10">
        <Card className="mt-4">
        <h3 className="text-xl text-gray-500 ">Estadisticas ventas</h3>
        <DonutChartUsageExample/>
        </Card>
      </div>
      <div className="mt-10">
        <Card className="mt-4">
        <h3 className="text-xl text-gray-500  ">Distribucion de productos</h3>
        <BarChartHero />
        </Card>
        
      </div>
      </div>
    </main>
  );
};

export default VendedorPage
