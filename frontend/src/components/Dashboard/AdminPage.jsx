"use client";
import React, { useEffect } from "react";
import { data } from "../../../public/data";
import { CiViewList } from "react-icons/ci";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { getlogindata } from "@/redux/features/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { BarChartHero } from "@/components/Dashboard/BarChar";
import {AreaChartHero} from "@/components/Dashboard/AreaChartHero";
import { DonutChartUsageExample } from "@/components/Dashboard/DonutChar";
import { Card, Metric, Text } from '@tremor/react';

const AdminPage = () => {
  
  const user = useAppSelector((state) => state.useReducer.user);
  const dispatch = useAppDispatch();

  const vendedorId = parseInt(user?._id);
  const vendedor = data.users.find((vendedor) => vendedor._id === vendedorId);
  const products = data.products.filter(
    (product) => product.idvendedor === vendedorId
  );

  const cantidad = products.length;

  const itemsCards = [
    { title: "Total de productos", value: cantidad, icon: CiViewList, color: "bg-red-200", link: `/Dashboard/Products` }
  ];

  useEffect(() => {
    dispatch(getlogindata());
  }, [dispatch]);


  return (
    <main>
      <h1 className="text-3xl font-bold mb-10">Dashboard</h1>
      <div className="grid grid-cols-1  gap-4">
    
      <div>
        <Card>
            <h3 className="text-xl text-gray-500">Estadistica de usuarios</h3>
            <AreaChartHero />
        </Card>
      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="mt-10">
        <Card className="mt-4">
        <h3 className="text-xl text-gray-500">Estadisticas ventas</h3>
        <DonutChartUsageExample/>
        </Card>
      </div>
      <div className="mt-10">
        <Card className="mt-4">
        <h3 className="text-xl text-gray-500 ">Distribucion de productos</h3>
        <BarChartHero />
        </Card>
        
      </div>
      </div>
    </main>
  );
};

export default AdminPage;
