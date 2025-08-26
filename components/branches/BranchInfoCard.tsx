import React from "react";
import { AdminBusinessResponse } from "../../types/index";
import { getInitials, formatDate } from "@/utils";

interface BranchInfoCardProps {
  branch: any;
}

const BranchInfoCard: React.FC<BranchInfoCardProps> = ({
  branch,
}) => {
  return (
    <div className="flex flex-col gap-8 w-full bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-verido-green-2 p-3 text-[16px] font-bold">
            {getInitials(`${branch?.full_name}`)}
          </div>
          <div>
            <h2 className="text-[22px] font-bold">{branch?.full_name}</h2>
            <p className="text-gray-text text-[14px]">{branch?.email}</p>
            <p
              className={`  max-w-max px-3 py-1 text-[12px] rounded-[12px] mt-1 ${
                branch?.isSuspended
                  ? "bg-verido-card-red text-verido-red"
                  : "bg-light-green text-verido-green"
              }`}
            >
              {branch?.isSuspended ? "Inactive" : "Active"}
            </p>
          </div>
        </div>
      </div>

      <div className="border rounded-[16px] overflow-hidden">
        <p className="px-6 py-4 bg-sidebar-gray font-medium border-b">
          Basic Information
        </p>
        <div className="flex px-6 py-6">
          <div className="w-1/2 flex flex-col gap-3">
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Name:</span>
              <span className="font-normal">{branch?.full_name}</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Email Address:</span>
              <span className="font-normal">{branch?.email}</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Date Created:</span>
              <span className="font-normal">{branch?.dateJoined}</span>
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Business Country:</span>
              <span>{branch?.business_country}</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Phone Number:</span>
              <span className="font-normal">{branch?.username}</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Institution:</span>
              <span className="font-normal">Agriculture produce</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchInfoCard;
