import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { LoadingSpinner } from "../ui/loading-spinner";
import useCustomToast from "@/lib/hooks/useCustomToast";

type LocationFilterDropdownProps = {
  selectedLocation: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
  locations: string[];
  isLoading: boolean;
  isError: boolean;
};

const LocationFilterDropdown = ({
  selectedLocation,
  setSelectedLocation,
  locations,
  isLoading,
  isError,
}: LocationFilterDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const showToast = useCustomToast();
  useEffect(() => {
    if (isError) {
      showToast("Error", "Failed to load locations", "error");
    }
  }, [isError, showToast]);

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Select onValueChange={setSelectedLocation} value={selectedLocation}>
      <SelectTrigger className="w-[200px] text-light-gray">
        <SelectValue placeholder="Select Location" />
      </SelectTrigger>
      <SelectContent>
        <div className="relative mb-2 mt-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search Location"
            className="pl-8 pr-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : (
          filteredLocations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))
        )}
        {filteredLocations.length === 0 && (
          <p className="p-2 text-sm text-gray-500">No locations found.</p>
        )}
      </SelectContent>
    </Select>
  );
};

export default LocationFilterDropdown;
