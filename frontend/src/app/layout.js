import { Inter } from "next/font/google";
import "./globals.css";
import ClientHeader from "../components/ClientHeader/ClientHeader";
import { Providers } from "@/redux/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Productos artesanales de madera",
  description: "Productos artesanales de madera",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <ClientHeader />
        {children}
        </Providers>
      </body>
    </html>
  );
}
