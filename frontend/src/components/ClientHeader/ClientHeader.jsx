// src/components/ClientHeader.js
"use client";

import { usePathname } from 'next/navigation';
import Header from "../Header/Header";

export default function ClientHeader() {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith('/Dashboard',);
  const isLoginPage = pathname.startsWith('/LoginDashboard',);

  if (isDashboardRoute || isLoginPage) {
    return null;
  }

  return <Header />;
}
