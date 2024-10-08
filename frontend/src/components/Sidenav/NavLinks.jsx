"use client";

import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiUser, CiViewList, CiHome} from "react-icons/ci";
import { IoDocumentOutline } from "react-icons/io5";

const vendedorLinks = [
  { name: "Inicio", href: "/Dashboard", icon: CiHome },
  { name: "Productos", href: "/Dashboard/Products", icon: CiViewList },
  { name: "Perfil", href: "/Dashboard/Profile", icon: CiUser },
];

const adminLinks = [
  ...vendedorLinks,
  { name: "Validar Productos", href: "/Dashboard/Validar-Producto", icon: IoDocumentOutline },
  { name: "Validar Usuarios", href: "/Dashboard/Validar-Usuario", icon: CiUser },
];

export default function NavLinks() {
  const user = useAppSelector((state) => state.useReducer.user);
  const pathName = usePathname();

  const links = user?.role === "Admin" ? adminLinks : vendedorLinks;

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
              ${
                pathName === link.href
                  ? "bg-sky-100 text-blue-600"
                  : "bg-gray-50 text-gray-800"
              }
            `}
            aria-label={link.name}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
