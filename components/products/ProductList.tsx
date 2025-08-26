import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useProducts } from "@/lib/react-query/query/useProducts";
import { IProductCard } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { useAuthenticatedUser } from "@/context/AuthContext";
import {
  useUniqueCountries,
  useUniqueStates,
  useUniqueCities,
  useProductDownlineAgent,
} from "@/lib/react-query/query/useProducts";
import AgentFilterDropdown from "./AgentFilterDropdown";
import LocationFilterDropdown from "./LocationFilterDropdown";
import { Ban, MoveRight, MoveLeft } from "lucide-react";

type productProps = {
  isWidget?: boolean;
  onProductSelect?: (product: IProductCard) => void;
};

const ProductList = ({ isWidget, onProductSelect }: productProps) => {
  const { currentUser } = useAuthenticatedUser();
  const [page, setPage] = useState<number>(1);
  const [agentPage, setAgentPage] = useState<number>(1);
  const [filterType, setFilterType] = useState<string>("All");
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [agentSearch, setAgentSearch] = useState<string>("");

  const { data: productCountry, isLoading: isLoadingProductCountry } =
    useUniqueCountries();

  const { data: productStates, isLoading: isLoadingStates } =
    useUniqueStates(selectedCountry);

  const { data: productCities, isLoading: isLoadingCities } = useUniqueCities(
    selectedState,
    selectedCountry
  );

  const {
    data: agents,
    isLoading: isLoadingProductAgents,
    isError: failedLaodingProductAgents,
    fetchNextPage,
    hasNextPage,
  } = useProductDownlineAgent({
    id: currentUser?._id!!,
    params: {
      search: agentSearch,
    },
    enabled: !isWidget && !!currentUser?._id,
  });

  const allAgents = agents?.pages.flatMap((page) => page.data) ?? [];

  const {
    data: products,
    isLoading: isProductLoading,
    isError: failedLoadingProductCountry,
  } = useProducts({
    limit: isWidget ? 5 : 30,
    page,
    country: selectedCountry ? selectedCountry : undefined,
    state: selectedState ? selectedState : undefined,
    city: selectedCity ? selectedCity : undefined,
    parentId: selectedAgent ? selectedAgent : undefined,
  });

  const productData = products?.docs ?? [];

  const handleClearFilters = () => {
    setSelectedCountry("");
    setSelectedAgent("");
    setSelectedState("");
    setSelectedCity("");
    setFilterType("All");
  };

  const handleProductClick = (product: IProductCard) => {
    if (!isWidget && onProductSelect) {
      onProductSelect(product);
    }
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const handleAgentPageChange = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleAgentSearch = (search: string) => {
    setAgentSearch(search);
  };

  const renderSkeletons = () => {
    const count = isWidget ? 5 : 12;
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <div
          key={index}
          className="flex flex-col rounded-2xl p-3 gap-y-8 max-w-[200px] shadow-sm bg-verido-border/20"
        >
          <Skeleton className="h-[120px] w-full rounded-md" />
          <div className="flex justify-between items-end">
            <div className="flex flex-col items-start">
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center gap-10 md:gap-0 mb-10">
        <p className="text-[20px] font-medium">Products</p>
        {isWidget && productData.length !== 0 && (
          <Link href="/products">
            <Button
              className={` text-white bg-verido-green hover:bg-verido-green/70`}
            >
              See all
            </Button>
          </Link>
        )}
        {!isWidget && (
          <div className="flex flex-wrap gap-2 items-center">
            <Select
              onValueChange={(value) => {
                setFilterType(value);
                if (value === "All") {
                  setSelectedAgent("");
                  setSelectedCountry("");
                  setSelectedState("");
                  setSelectedCity("");
                }
              }}
              value={filterType}
            >
              <SelectTrigger className="w-[100px]  text-light-gray">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="text-sm text-light-gray" value="Agent">
                  Agent
                </SelectItem>
                <SelectItem
                  className="text-sm text-light-gray"
                  value="Location"
                >
                  Location
                </SelectItem>
                <SelectItem className="text-sm text-light-gray" value="All">
                  All
                </SelectItem>
              </SelectContent>
            </Select>
            {filterType === "Agent" && (
              <AgentFilterDropdown
                selectedAgent={selectedAgent}
                setSelectedAgent={setSelectedAgent}
                agents={allAgents}
                isLoading={isLoadingProductAgents}
                isError={failedLaodingProductAgents}
                onAgentPageChange={handleAgentPageChange}
                onSearchChange={handleAgentSearch}
              />
            )}
            {filterType === "Location" && (
              <div className="flex flex-wrap gap-2 items-center">
                <LocationFilterDropdown
                  locations={productCountry}
                  selectedLocation={selectedCountry}
                  setSelectedLocation={setSelectedCountry}
                  isLoading={isLoadingProductCountry}
                  isError={failedLoadingProductCountry}
                />
                {selectedCountry && selectedCountry?.length > 0 && (
                  <Select
                    onValueChange={setSelectedState}
                    value={selectedState}
                  >
                    <SelectTrigger className="w-[150px] text-light-gray">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {productStates?.length > 0 ? (
                        productStates?.map((state: string) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))
                      ) : (
                        <p className="text-center text-semibold text-xs">
                          No State Available
                        </p>
                      )}
                    </SelectContent>
                  </Select>
                )}
                {selectedState && selectedState?.length > 0 && (
                  <Select onValueChange={setSelectedCity} value={selectedCity}>
                    <SelectTrigger className="w-[150px] text-light-gray">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {productCities?.length > 0 ? (
                        productCities?.map((city: string) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))
                      ) : (
                        <p className="text-center text-semibold text-xs">
                          No cities Available
                        </p>
                      )}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}
            {(selectedCountry ||
              selectedState ||
              selectedCity ||
              selectedAgent) && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="text-xs flex items-center justify-between bg-verido-card-red font-bold gap-3"
              >
                <Ban className="w-4 h-5" />
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-5">
        {isProductLoading ? (
          renderSkeletons()
        ) : productData?.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-10 text-gray-500">
            <p className="text-lg font-semibold">No products available</p>
            <p className="text-sm">Add some products to get started</p>
          </div>
        ) : (
          productData?.map((product: IProductCard, index: number) => (
            <div
              key={index}
              onClick={() => handleProductClick(product)}
              className={!isWidget ? "cursor-pointer" : ""}
            >
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
      {/* Pagination will go here */}
      {!isProductLoading && productData?.length > 5 && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(products?.prevPage ?? 1)}
            disabled={!products?.hasPrevPage}
            className="border border-verido-green disabled:border-gray-text text-gray-text"
          >
            <MoveLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-gray-text">
            Page {products?.page} of {products?.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(products?.nextPage ?? 1)}
            disabled={!products?.hasNextPage}
            className="border border-verido-green disabled:border-gray-text text-gray-text"
          >
            Next
            <MoveRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
