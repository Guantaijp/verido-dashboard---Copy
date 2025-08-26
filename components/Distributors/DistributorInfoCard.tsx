"use client";
import React, { useState } from "react";
import { getInitials } from "@/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { formatDate } from "@/utils";

interface DistributorInfoCardProps {
  distributor: any;
}

const DistributorInfoCard: React.FC<
  DistributorInfoCardProps
> = ({ distributor }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-8 w-full bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-verido-green-2 p-3 text-[16px] font-bold">
            {getInitials(distributor?.name)}
          </div>
          <div>
            <h2 className="text-[22px] font-bold">{distributor?.name}</h2>
            <p className="text-gray-text text-[14px]">{distributor?.email}</p>
            <p
              className={`  max-w-max px-3 py-1 text-[12px] rounded-[12px] mt-1 ${
                distributor?.status
                  ? "bg-light-green text-verido-green"
                  : "bg-verido-card-red text-verido-red"
              }`}
            >
              {distributor?.status ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
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
            </DialogTrigger>
          </Dialog> */}
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
              <span className="font-normal">{distributor?.name}</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Email Address:</span>
              <span className="font-normal">{distributor?.email}</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">User ID:</span>
              <span className="font-normal">{distributor?.referenceId}</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Date Created:</span>
              <span className="font-normal">
                {formatDate(distributor?.createdAt)}
              </span>
            </p>
          </div>
          {/* <div className="flex-1 flex flex-col gap-3">
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Company name:</span>
              <span className="font-normal">
                {distributor?.superAgentDetails?.email}
              </span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">ID:</span>
              <span className="font-normal">
                {distributor?.superAgentDetails?.referenceId}
              </span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Sector:</span>
              <span className="font-normal">Agriculture</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Institution:</span>
              <span className="font-normal">Agriculture produce</span>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DistributorInfoCard;
