import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useCountryAdminById } from "@/lib/react-query/query/useCountryAdmin";
import { PartnersTable } from "../partners/PartnersTable";
import { columnsPartner } from "@/app/(root)/partners/column";
import PartnerInfoCardSkeleton from "../partners/PartnerInfoCardSkeleton";
import CountryAdminInfoCard from "./CountryAdminInfoCard";
import { useUserMetrics } from "@/lib/react-query/query/useStats";
import { usePartners } from "@/lib/react-query/query/usePartners";
import DashboardCard from "../home/DashboardCard";
import { cardData } from "@/constant";

const CountryAdminInfo = () => {
  const { id } = useParams() as { id: string };
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const { data: countryAdminDetails, isPending } = useCountryAdminById(id);
  const { data: uniqueUser, isPending: isUniqueUserPending } = useUserMetrics(
    countryAdminDetails?._id
  );
  const { data: uniquePartner, isFetching: isUniquePartnerPending } =
    usePartners({
      parentId: countryAdminDetails?._id,
      page,
      search: search ? search : undefined,
    });
  const partnersData = uniquePartner || [];
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  if (isPending || isUniqueUserPending || !countryAdminDetails) {
    return <PartnerInfoCardSkeleton />;
  }

  return (
    <div className="w-full h-full p-2 lg:p-0">
      <div className="flex flex-col p-2 gap-2">
        <CountryAdminInfoCard countryAdmin={countryAdminDetails} />
        <div className="flex mt-3 lg:mt-10 flex-wrap lg:flex-nowrap gap-4 items-center">
          <div className="w-full border rounded-[16px] overflow-hidden">
            <div className="px-6 py-4 bg-sidebar-gray border-b">
              <p className="font-medium">Users</p>
              <p className="text-[12px] font-normal">
                {`An overview of all users registered under ${countryAdminDetails?.name}`}
              </p>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-5">
                {cardData
                  .filter((card) => card.roles.includes("country_admin"))
                  .map((card, idx) => {
                    let value = card.value;
                    if (uniqueUser) {
                      switch (card.title) {
                        case "Total Users":
                          value = uniqueUser.totalUsers;
                          break;
                        case "Partners":
                          value = uniqueUser.partnersCount;
                          break;
                        case "Companies":
                          value =
                            uniqueUser.company || uniqueUser.companiesCount;
                          break;
                        case "Super Agents":
                          value = uniqueUser.superAgentsCount;
                          break;
                        case "Sub Agents":
                          value =
                            uniqueUser.subAgentsCount ||
                            uniqueUser.subagentCount;
                          break;
                        case "Digital Entrepreneurs":
                          value = uniqueUser.digitalEntrepreneurCount;
                          break;
                        case "Distributors":
                          value = uniqueUser.distributorCount;
                          break;
                        case "Multibranch Businesses":
                          value = uniqueUser.multibranchBusinessCount;
                          break;
                        case "Business Owners":
                          value = uniqueUser.businessOwnerCount;
                          break;
                        default:
                          value = 0;
                      }
                    }
                    return (
                      <DashboardCard
                        key={idx}
                        title={card.title}
                        value={
                          typeof value === "number" && !isNaN(value) ? value : 0
                        }
                        background={card.background}
                        icon={card.icon}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-1 md:p-10 lg:p-10 gap-5 w-full bg-white mb-10 rounded-lg">
          <PartnersTable
            data={partnersData?.data}
            columns={columnsPartner}
            isFetching={isUniquePartnerPending}
            pagination={partnersData}
            onPageChange={handlePageChange}
            onSearchChange={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default CountryAdminInfo;
