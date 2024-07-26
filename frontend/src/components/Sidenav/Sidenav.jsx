"use client";
import Link from "next/link";
import { CiPower } from "react-icons/ci";
import NavLinks from "./NavLinks";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { logoutUser } from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SideNav() {
  const user = useAppSelector((state) => state.useReducer.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [localUser, setLocalUser] = useState(user);

  const handleLogout = () => {
    const confirmed = confirm("¿Seguro que quieres cerrar tu sesión?");
    if (confirmed) {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    setLocalUser(null);
    router.push('/LoginDashboard') 
    }
  };

  console.log("User from SideNav:", user);

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40 shadow-md shadow-gray-400"
        href="/Dashboard"
      >
        <div className="w-32  md:w-40">
          <Image src="/icons/logo.svg" alt="Logo" width={100} height={100} />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        {user && user.image ? (
         <div className="flex  p-3 md:p-2 md:px-3">
           <Image
              src={user?.image}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full "
            />

         </div>
        ) : (
          <div className="w-12 h-12 bg-gray-300 rounded-full" />
        )}
        
          <button
          onClick={handleLogout}
            type="submit"
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            aria-label="Sign Out"
          >
            <CiPower className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
      </div>
    </div>
  );
}
