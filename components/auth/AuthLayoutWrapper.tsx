import React from "react";
import Image from "next/image";
import { Manrope as Inter } from "next/font/google";
import "../../app/globals.css";

const inter = Inter({ subsets: ["latin"] });


interface Props {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen`}>
        <div className="hidden md:flex flex-col bg-active-green flex-1  gap-10 p-14">
          <div className="flex items-start w-full">
            <Image
              width={80}
              height={80}
              className="object-contain"
              src="/assets/icons/verido_logo.svg"
              alt="logo"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">
              Monitor and Manage your Organization
            </h1>
            <p className="text-gray-text text-sm ">
              Login to monitor your organization’s key performance indicators
              and <br /> manage your organization and teams effectively.
            </p>
          </div>

          <div className="w-full lg:mt-10">
            <Image
              width={550}
              height={200}
              className="object-contain"
              src="/assets/icons/auth_card_two.svg"
              alt="auth-image"
            />
          </div>
        </div>
        <div className="flex-1 flex-col flex items-center  justify-center">
          {children}
        </div>
      </body>
    </html>
  );
};
