"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import EditCompanyProfile from "./EditCompanyProfile";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import SuspendActivateCompany from "./SuspendActivateCompany";
import { getInitials } from "@/utils";
import { format } from "date-fns";

interface ConsultantInfoCardProps {
  company: any;
}

const CompanyInfoCard: React.FC<ConsultantInfoCardProps> = ({ company }) => {
  const [open, setOpen] = useState(false);
  const companyDetails = company?.companyDetails;
  return (
    <div className="flex flex-col gap-8 w-full bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-verido-green-2 p-3 text-[16px] font-bold">
            {getInitials(company?.name || companyDetails?.companyName)}
          </div>
          <div>
            <h2 className="text-[22px] font-bold">
              {company?.name || companyDetails?.companyName}
            </h2>
            <p
              className={`  max-w-max px-3 py-1 text-[12px] rounded-[12px] mt-1 ${
                company?.status
                  ? "bg-light-green text-verido-green"
                  : "bg-verido-card-red text-verido-red"
              }`}
            >
              {company?.status ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  items-center gap-3">
          <Dialog open={open} onOpenChange={setOpen}>
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
            <DialogContent>
              <EditCompanyProfile closeModal={() => setOpen(false)} company={company} />
            </DialogContent>
          </Dialog>
          {/* <Button
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
          </Button> */}
          {/* <SuspendActivateCompany id={company?._id} status={company?.status} /> */}
        </div>
      </div>

      <div className="border rounded-[16px] overflow-hidden">
        <p className="px-6 py-4 bg-sidebar-gray font-medium border-b">
          Basic Information
        </p>
        <div className="flex px-6 py-6">
          <div className="w-1/2 flex flex-col gap-3">
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Company Name:</span>
              <span className="font-normal">{company?.name || companyDetails?.companyName}</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Email Address:</span>
              <span className="font-normal">{company?.email}</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Company ID:</span>
              <span className="font-normal">
                {companyDetails?.companyUniqueId}
              </span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Sector:</span>
              <span className="font-normal">{companyDetails?.sector}</span>
            </p>
            {/* <p className="text-[14px] flex gap-2">
              <span className="font-medium">Institution:</span>
              <span className="font-normal">Agricu</span>
            </p> */}
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Date Created:</span>
              <span className="font-normal">
                {format(company?.createdAt, "dd/MM/yy")}
              </span>
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Currency:</span>
              <span className="font-normal">{companyDetails?.currency}</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Partner ID:</span>
              <span className="font-normal">{companyDetails?.partnerId}</span>
            </p>
            {/* <p className="text-[14px] flex gap-2">
              <span className="font-medium">Sector:</span>
              <span className="font-normal">Agriculture</span>
            </p> */}
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Business Type:</span>
              <span className="font-normal">
                {companyDetails?.businessType}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoCard;
