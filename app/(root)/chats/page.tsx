"use client";
import React from "react";
import { usePathname } from "next/navigation";

const Chats = () => {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="text-sm  text-verido-green">
          Home <span>/</span>{" "}
          <span className="text-gray-text">{pathname.substring(1)}</span>
        </div>
        <div className="bg-verido-white p-6 rounded-lg flex flex-col gap-6 min-h-[42rem]">
          Chats
        </div>
      </div>
    </div>
  );
};

export default Chats;
