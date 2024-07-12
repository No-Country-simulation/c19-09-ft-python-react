"use client";

import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex w-full md:items-start rounded-full">
      <Navbar />
    </div>
  );
};

export default Header;
