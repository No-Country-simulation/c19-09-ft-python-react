"use client";

import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";

const Header = () => {
  return (
    <container className=" flex items-center justify-between p-5 w-full bg-primary text-white font-bold ">
      <Link href="/" legacyBehavior>
      <div className="flex items-center gap-4 w-1/3 px-10 cursor-pointer">
        <Image src="/icons/logo.svg" alt="logo" width={50} height={50} />
      </div>
      </Link>
      <div className="w-2/3 justify-between flex items-center gap-4 flex-row-reverse sm:flex-row">
        <div className="flex  md:items-start px-4 py-2 rounded-full">
          <Navbar />
        </div>
        <div className="flex gap-4 items-end px-10">
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
    </container>
  );
};

export default Header;
