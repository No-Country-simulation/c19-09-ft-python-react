"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/features/userSlice";


const Navbar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  //estado del usuario
  const user = useSelector((state) => state.useReducer.user);
  console.log("user", user);

  const [localUser, setLocalUser] = useState(user);

  //conteo de los productos del carrito
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    if (count !== cartItemsCount) {
      setCartItemsCount(count);
    }
  }, [cartItems, cartItemsCount]);

  const categories = [
    { name: "Todos", path: "todos" },
    { name: "Utensilios de cocina", path: "utensilios" },
    { name: "Muebles", path: "muebles" },
    { name: "Juguetes", path: "juguetes" },
  ];

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    setLocalUser(null);
    router.push('/Sign-in');
  };


  const renderView = () => {
    return (
      <>
        {/* {user && (
          <li className={pathname === "/My-orders" ? "underline" : ""}>
            <Link href="/My-orders">
              <p>My Orders</p>
            </Link>
          </li>
        )} */}

        {user ? (
          <>
            <li className={pathname === "/My-account" ? "underline" : ""}>
              <Link href="/My-account">
                <p>My Account</p>
              </Link>
            </li>
            <li
              className={"cursor-pointer"}
              onClick={handleSignOut}
            >
              <p>Sign out</p>
            </li>
          </>
        ) : (
          <li className={pathname === "/Sign-in" ? "underline" : ""}>
            <Link href="/Sign-in">
              <p>Sign in</p>
            </Link>
          </li>
        )}

        <li className={pathname === "/Carrito" ? "underline" : ""}>
          <Link href="/Carrito" legacyBehavior>
            <a>
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="bg-red-500 text-white text-xs p-1 rounded-full">
                {cartItemsCount}
              </span>
            </a>
          </Link>
        </li>
      </>
    );
  };

  return (
    <nav
      className="flex justify-between
     items-center fixed z-10 top-0 w-full py-8 px-10 text-sm font-light bg-primary text-tertiary"
    >
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
        {categories.map((category) => (
          <li
            key={category.path}
            className={
              pathname === `/Products/${category.path}` ? "underline" : ""
            }
          >
            <Link legacyBehavior href={`/Products/${category.path}`}>
              <a className="hover:border-b-2 border-white">{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="flex items-center gap-3">{renderView()}</ul>
    </nav>
  );
};

export default Navbar;
