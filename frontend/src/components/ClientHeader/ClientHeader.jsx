// src/components/ClientHeader.js
"use client";

import { usePathname } from 'next/navigation';
import Header from "../Header/Header";

export default function ClientHeader() {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith('/Dashboard');

  if (isDashboardRoute) {
    return null;
  }

  return <Header />;
}
