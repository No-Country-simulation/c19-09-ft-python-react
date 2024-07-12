import React from "react";
import { data } from "../../../public/data";
import { CiViewList } from "react-icons/ci";
import Link from "next/link";

const Page = () => {
  const cantidad = data.products.length;
  const categorias = data.categories.length;

  const itemsCards = [
    { title: "Total de productos", value: cantidad, icon: CiViewList, color: "bg-red-200", link: "/Dashboard/Products" },
    { title: "Total de categorías", value: categorias, icon: CiViewList, color: "bg-green-200", link: "/Dashboard/Categories" },
  ];

  return (
    <main>
      <h1 className="text-3xl font-bold underline mb-10">Dashboard</h1>
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
    </main>
  );
};

export default Page;
