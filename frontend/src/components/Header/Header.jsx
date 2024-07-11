"use client";

import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";

const Header = () => {
  return (
    <container className=" flex flex-col w-full  text-white font-bold ">
      <div className="w-full flex justify-between items-center gap-4 bg-primary md:px-10 md:py-6 cursor-pointer border-b-1 border-white">
      <Link href="/" legacyBehavior>
        <Image src="/icons/logo.svg" alt="logo" width={50} height={50} />
      </Link>
        <div className="flex gap-4 items-end  md:justify-between">
          <div className="flex gap-2 items-center">
          <MdOutlineShoppingCart className="w-8 h-8" />
          <p className="text-md">0</p>
          </div>
          <Image
            src="/images/carlosmalissia.jpg"
            alt="logo"
            width={30}
            height={30}
            className="rounded-full"
            />
        </div>
        </div>
      <div className="bg-tertiary w-full justify-between flex items-center gap-4 flex-row-reverse sm:flex-row">
        <div className="flex w-full md:items-start rounded-full">
          <Navbar />
        </div>
      </div>
    </container>
  );
};

export default Header;
