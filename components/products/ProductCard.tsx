import React from "react";
import Image from "next/image";
import { IProductCard } from "@/types";
import { productCardColors } from "@/constant";

const ProductCard = ({ product }: { product: IProductCard }) => {
  const randomColor =
    productCardColors[Math.floor(Math.random() * productCardColors.length)];

  return (
    <div
      className={`flex flex-col rounded-2xl p-3 gap-y-2 max-w-[200px] shadow-sm transition-all duration-300 ease-out`}
      style={{ backgroundColor: randomColor }}
    >
      <div className="relative h-[120px] w-full rounded-md overflow-hidden">
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
        <p className="absolute bottom-2 left-2 z-10 text-black font-semibold text-sm drop-shadow bg-white px-2 py-1 rounded-2xl">
          {product.name}
        </p>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex flex-col items-start">
          <p className="text-gray-500 text-sm">Amount left:</p>
          <p className="text-base font-semibold">
            {product.totalQuantity} <span>{product?.unit}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
