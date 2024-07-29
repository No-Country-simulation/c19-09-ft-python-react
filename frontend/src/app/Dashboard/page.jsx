"use client";
import { useAppSelector } from '@/redux/hooks';
import React from 'react';
import VendedorPage from '@/components/Dashboard/VendedorPage';
import AdminPage from '@/components/Dashboard/AdminPage';

const Page = () => {
  const user = useAppSelector((state) => state.useReducer.user);

  const SelectedPage = user?.role === "Admin" ? AdminPage : VendedorPage;

  return (
    <div>
      <SelectedPage />
    </div>
  );
}

export default Page;
