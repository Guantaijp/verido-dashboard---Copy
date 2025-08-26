import React from "react";
import { AdminBusinessResponse } from "../../types/index";
import Image from "next/image";
import { Button } from "../ui/button";
import { getInitials, formatDate } from "@/utils";
import SuspendBusiness from "./SuspendBusiness";
import ActivateBusiness from "./ActivateBusiness";

interface BusinessInfoCardProps {
  business: AdminBusinessResponse;
}

const BusinessInfoCard: React.FC<BusinessInfoCardProps> = ({ business }) => {
  return (
    <div className="flex flex-col gap-8 w-full bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-verido-green-2 p-3 text-[16px] font-bold">
            {getInitials(`${business?.first_name} ${business?.last_name}`)}
          </div>
          <div>
            <h2 className="text-[22px] font-bold">
              {business?.first_name} {business?.last_name}
            </h2>
            <p className="text-gray-text text-[14px]">{business?.email}</p>
            <p
              className={`  max-w-max px-3 py-1 text-[12px] rounded-[12px] mt-1 ${
                business?.isSuspended
                  ? "bg-verido-card-red text-verido-red"
                  : "bg-light-green text-verido-green"
              }`}
            >
              {business?.isSuspended ? "Inactive" : "Active"}
            </p>
          </div>
        </div>
        {/* <div className="flex items-center gap-3">
          <Button
            size={"sm"}
            className="flex gap-2 items-center bg-transparent text-gray-text px-3 py-2 text-[13px] border rounded-md"
          >
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={14}
              height={14}
            />
            Edit Profile
          </Button>
          <Button
            size={"sm"}
            className="flex gap-2 items-center bg-transparent text-gray-text px-3 py-2 text-[13px] border rounded-md"
          >
            <Image
              src="/assets/icons/send.svg"
              alt="edit"
              width={14}
              height={14}
            />
            Transfer User
          </Button>
          {business?.isSuspended === true ? (
            <SuspendBusiness businessName={business?.full_name} id={business._id} />
          ) : (
            <ActivateBusiness id={business._id} />
          )}

        </div> */}
      </div>

      <div className="border rounded-[16px] overflow-hidden">
        <p className="px-6 py-4 bg-sidebar-gray font-medium border-b">
          Basic Information
        </p>
        <div className="flex px-6 py-6">
          <div className="w-1/2 flex flex-col gap-3">
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Name:</span>
              <span className="font-normal">
                {business?.first_name} {business?.last_name}
              </span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Email Address:</span>
              <span className="font-normal">{business?.email}</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Date Created:</span>
              <span className="font-normal">{business?.dateJoined}</span>
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Consultants:</span>
              <div className="flex flex-col gap-1">
                {business?.consultant?.flatMap(
                  (consultant: any, index: number) => [
                    <div key={index} className="flex items-center gap-2">
                      <span className="font-normal">
                        {consultant?.username}
                      </span>
                      <span className="font-normal text-gray-text">
                        ({consultant?.referenceId})
                      </span>
                    </div>,
                  ]
                )}
              </div>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Sector:</span>
              <span className="font-normal">Agriculture</span>
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

export default BusinessInfoCard;
