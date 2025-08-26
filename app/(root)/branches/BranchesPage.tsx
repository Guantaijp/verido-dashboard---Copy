"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { useDistributorsBranches } from "@/lib/react-query/query/useDistributors";
import { useMultibrancBusinessBranches } from "@/lib/react-query/query/useMultiBranchBusiness";
import { NewBusinessOwnersTable } from "@/components/newBusinessOwners/NewBusinessOwnersTable";
import { columnsBranches } from "@/components/branches/column";

const BranchesPage = () => {
  const { currentUser } = useAuthenticatedUser();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  const isMultibranch = currentUser?.role === "multi_branch_business";
  const isDistributor = currentUser?.role === "distributor";

  const { data: distributorData, isPending: isDistributorPending } =
    useDistributorsBranches(
      {
        id: currentUser?._id || "",
      },
      {
        enabled: isDistributor,
      }
    );

  const { data: multibranchData, isPending: isMultibranchPending } =
    useMultibrancBusinessBranches(
      {
        id: currentUser?._id || "",
      },
      {
        enabled: isMultibranch,
      }
    );

  const branchData = isMultibranch
    ? multibranchData?.data || []
    : distributorData?.data || [];
  const isPending = isMultibranch ? isMultibranchPending : isDistributorPending;

  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-verido-green p-2 lg:p-0">
        Home <span>/</span>{" "}
        <span className="text-gray-text">{pathname.substring(1)}</span>
      </div>
      <div className="bg-verido-white p-6 rounded-lg flex flex-col gap-6 min-h-[42rem]">
        <NewBusinessOwnersTable
          data={branchData}
          columns={columnsBranches}
          isFetching={isPending}
          isBranch={true}
        />
      </div>
    </div>
  );
};

export default BranchesPage;
