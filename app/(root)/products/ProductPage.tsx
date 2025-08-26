"use client";
import React, { useState } from "react";
import Image from "next/image";
import DashboardCard from "@/components/home/DashboardCard";
import ProductList from "@/components/products/ProductList";
import { IAgentCard, IProductCard } from "@/types";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import AgentCard from "@/components/products/AgentCard";
import { useAgentProducts } from "@/lib/react-query/query/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductStats } from "@/lib/react-query/query/useProducts";

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<IProductCard | null>(
    null
  );
  const { data: productStats, isLoading: isLoadingProductStats } =
    useProductStats();

  const { data: agentProducts, isLoading: isLoadingAgentProduct } =
    useAgentProducts(
      selectedProduct
        ? {
            productName: selectedProduct.name,
            productQtyUnit: selectedProduct.unit,
          }
        : undefined
    );

  const handleProductSelect = (product: IProductCard) => {
    setSelectedProduct(product);
  };

  return (
    <div className="w-full flex flex-col flex-1 p-3 space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 md:gap-0">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-text text-[12px] font-light">
            Details of the products uploaded
          </p>
        </div>
      </div>
      <div className="h-full flex flex-[2.5] flex-col gap-8">
        <h1 className="font-medium text-[20px]">Overview</h1>
        {isLoadingProductStats ? (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-2 lg:gap-5">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-2 lg:gap-5">
            <DashboardCard
              icon={"/assets/icons/green-trend.svg"}
              title={"Total Products"}
              background={"#E6F6EA"}
              value={productStats?.totalProducts!!}
            />
            <DashboardCard
              icon={"/assets/icons/teal-trend.svg"}
              title={"Agents"}
              background={"#E6F2FF"}
              value={productStats?.agentsCount!!}
            />
          </div>
        )}

        <div className="border-[1.5px] w-full rounded-[20px] p-5">
          <ProductList onProductSelect={handleProductSelect} />
        </div>
      </div>

      <Sheet
        open={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      >
        <SheetContent
          side={"right"}
          className="w-full flex flex-col gap-6 md:inset-y-5 md:right-2 p-2 rounded-2xl h-full md:w-3/4 overflow-y-auto"
        >
          {selectedProduct && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between mt-10">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-text-3">Product name:</p>
                  <span className="text-lg font-semibold">
                    {selectedProduct.name}
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-text-3">Amount left:</p>
                  <span className="text-lg font-semibold">
                    {selectedProduct.totalQuantity} {selectedProduct.unit}
                  </span>{" "}
                </div>
              </div>
              <div className="relative h-[120px] w-full rounded-md overflow-hidden">
                <Image
                  src={selectedProduct.imageUrl || "/placeholder.png"}
                  alt={selectedProduct.name}
                  className="object-cover w-full h-full"
                  width={500}
                  height={500}
                />
                <p className="absolute bottom-2 left-2 z-10 text-black font-semibold text-sm drop-shadow bg-white px-2 py-1 rounded-2xl">
                  {selectedProduct.name}
                </p>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <h2 className="text-2xl font-bold">Agent details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {isLoadingAgentProduct ? (
                    <>
                      <Skeleton className="h-[200px] bg-gray-100 rounded-lg" />
                      <Skeleton className="h-[200px] bg-gray-100 rounded-lg" />
                    </>
                  ) : agentProducts?.docs?.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-10 text-gray-500">
                      <p className="text-lg font-semibold">
                        No Agents available for this product
                      </p>
                    </div>
                  ) : (
                    agentProducts?.docs?.map(
                      (agent: IAgentCard, index: number) => (
                        <AgentCard key={index} agent={agent} />
                      )
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductPage;
