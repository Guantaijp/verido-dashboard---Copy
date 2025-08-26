import React, { Suspense } from "react";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import type { Metadata } from "next";
import { Manrope as Inter } from "next/font/google";
import "../../app/globals.css";
import { QueryProvider } from "../QueryProvider";
import { ChakraProvider } from "@chakra-ui/react";
import MobileNav from "@/components/common/MobileNav";
import { AuthenticatedUserProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Verido",
  description: "An App For Business Owners",
  icons: {
    icon: "/assets/icons/favicon.svg",
  },
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ChakraProvider>
        <QueryProvider>
          <AuthenticatedUserProvider>
            <body
              className={`${inter.className} flex flex-col md:flex-row h-screen bg-gray-body`}
            >
              <div className="hidden md:block md:fixed md:h-full md:w-64 z-10">
                <Sidebar />
              </div>
              <div className="flex-1 flex flex-col w-full lg:ml-64 md:ml-0">
                <div className="sticky top-0 z-20 bg-white p-2">
                  <div className="lg:hidden">
                    <MobileNav />
                  </div>
                  <div className="hidden md:block">
                    <Navbar />
                  </div>
                </div>
                <main className="flex-1 md:w-full lg:w-full overflow-y-auto bg-white px-3 md:px-6">
                  {children}
                </main>
              </div>
            </body>
          </AuthenticatedUserProvider>
        </QueryProvider>
      </ChakraProvider>
    </html>
  );
};

export default DashboardLayout;
