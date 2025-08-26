"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAuthenticatedUser } from "@/context/AuthContext";
import Notification from "./Notification";

const Navbar = () => {
  const { currentUser } = useAuthenticatedUser();
  

  return (
    <header className="bg-white hidden lg:flex items-center justify-end p-1 md:p-2 border-b-[2px] border-b-sidebar-gray">
      {/* <div className="flex items-center gap-2 md:gap-5">
        <Image
          width={30}
          height={30}
          src="/assets/icons/add-box.svg"
          alt="documents"
        />
        <Image
          width={20}
          height={20}
          src="/assets/icons/add-box.svg"
          alt="share"
          className="-ml-5"
        />
      </div> */}
      <div className="flex items-center gap-7">
        <Notification />

        <div className="flex justify-center items-center gap-2">
          <Image
            src={currentUser?.photoUrl || "/assets/icons/Avatar.svg"}
            width={100}
            height={100}
            alt="user avatar"
            className="rounded-full object-cover w-10 h-10"
          />
          <p>{currentUser?.name || currentUser?.username}</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
