"use client";
import React from "react";
import { useParams } from "next/navigation";
import CountryAdminInfo from "@/components/countryAdmin/CountryAdminInfo";
import { useCountryAdmin, useCountryAdminById } from "@/lib/react-query/query/useCountryAdmin";

const CountryAdminDetails = () => {
  const { id } = useParams() as { id: string };
  const {data} = useCountryAdminById(id)
  const name = data?.role
  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm  text-verido-green">
        Home <span>/ </span>{" "}
        <span className="text-gray-text capitalize">
          {""}

          {name}
        </span>
      </div>
      <div className=" rounded-lg  h-[43rem]">
        <CountryAdminInfo />
      </div>
    </div>
  );
};

export default CountryAdminDetails;
