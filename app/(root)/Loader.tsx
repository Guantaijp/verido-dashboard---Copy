'use client'
import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="animate-pulse">
        <Image
          src="/assets/icons/verido_logo.svg" 
          alt="Verido Logo"
          width={600} 
          height={600}
          className="opacity-100"
        />
      </div>
    </div>
  );
};

export default Loading;
