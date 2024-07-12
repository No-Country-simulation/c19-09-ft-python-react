"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faShoppingCart,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();

  //conteo de los productos del carrito
  //items del carrito
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemsCount(count);
  }, [cartItems]);

  const renderView = () => {
    return (
      <>
        <li className={pathname === "/my-orders" ? "underline" : ""}>
          <Link href="/my-orders">
            <p>My Orders</p>
          </Link>
        </li>
        <li className={pathname === "/my-account" ? "underline" : ""}>
          <Link href="/my-account">
            <p>My Account</p>
          </Link>
        </li>
        <li className={pathname === "/sign-out" ? "underline" : ""}>
          <Link href="/sign-out">
            <p>Sign out</p>
          </Link>
        </li>

        <li className={pathname === "/Carrito" ? "underline" : ""}>
          <Link href="/Carrito" legacyBehavior>
            <a>
              <FontAwesomeIcon icon={faShoppingCart} /> 
              <span className="bg-red-500 text-white text-xs p-1 rounded-full">{cartItemsCount}</span>
            </a>
          </Link>
        </li>
      </>
    );
  };

  return (
    <nav className="flex justify-evenly items-center fixed z-10 top-0 w-full py-8 px-10 text-sm font-light bg-primary text-tertiary">
      <ul className="flex items-center gap-7">
        <li
          className={`font-semibold text-lg ${
            pathname === "/" ? "underline" : ""
          }`}
        >
          <Link href="/" legacyBehavior>
            <a className="text-tertiary">
              <FontAwesomeIcon icon={faHome} />
            </a>
          </Link>
        </li>
        <li className={pathname === "/Muebles" ? "underline" : ""}>
          <Link href="/Muebles">
            <p>Muebles</p>
          </Link>
        </li>
        <li className={pathname === "/Decoración" ? "underline" : ""}>
          <Link href="/Decoración">
            <p>Decoración</p>
          </Link>
        </li>
        <li className={pathname === "/Utensilios" ? "underline" : ""}>
          <Link href="/Utensilios">
            <p>Utensilios</p>
          </Link>
        </li>
        <li className={pathname === "/Juguetesyjuegos" ? "underline" : ""}>
          <Link href="/Juguetesyjuegos">
            <p>Juguetes y Juegos</p>
          </Link>
        </li>
        <li className={pathname === "/Otros" ? "underline" : ""}>
          <Link href="/Otros">
            <p>Otros</p>
          </Link>
        </li>
      </ul>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="¿Qué estás buscando?"
          className="w-full border border-secondary px-4 py-2 rounded-lg bg-primary text-tertiary placeholder-tertiary focus:outline-none"
        />
        <button
          type="button"
          className="ml-2 px-3 py-2 bg-transparent border border-secondary rounded-lg text-tertiary hover:bg-secondary hover:text-primary focus:outline-none"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <ul className="flex items-center gap-3">{renderView()}</ul>
    </nav>
  );
};

export default Navbar;

/*  return (
    <>
      <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-primary text-tertiary">
    
        <div className="hidden sm:flex justify-start">
          <Link href="/" legacyBehavior>
            <a className="text-tertiary">
              <FontAwesomeIcon icon={faHome} />
            </a>
          </Link>
        </div>


        <div className="flex items-center">
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            className="w-full border border-secondary px-4 py-2 rounded-lg bg-primary text-tertiary placeholder-tertiary focus:outline-none"
          />
          <button
            type="button"
            className="ml-2 px-3 py-2 bg-transparent border border-secondary rounded-lg text-tertiary hover:bg-secondary hover:text-primary focus:outline-none"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>


        <div className="hidden sm:flex items-center gap-3">
          <Link href="/Sign-in" legacyBehavior>
            <a className={activeStyle}>
              <FontAwesomeIcon icon={faUser} />
            </a>
          </Link>
   

          <Link href="/Carrito" legacyBehavior>
            <a className={activeStyle}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </a>
          </Link>
          <Link href="/Carrito" legacyBehavior>
            <a className={activeStyle}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </a>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
 */
