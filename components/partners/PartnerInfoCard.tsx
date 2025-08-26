'use client'
import React , {useState} from "react";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "../ui/button";
import SuspendPartner from "./SuspendPartner";
import ActivatePartner from "./ActivatePartner";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import EditPartnerProfile from "./EditPartnerProfile";
import { getInitials } from "@/utils";
import TransferUser from "./TransferUser";

interface BusinessInfoCardProps {
  partners: any;
}

const PartnerInfoCard: React.FC<BusinessInfoCardProps> = ({ partners }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col gap-8 w-full bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-verido-green-2 p-3 text-[16px] font-bold">
            {getInitials(partners?.name)}
          </div>
          <div>
            <h2 className="text-[22px] font-bold">{partners?.name}</h2>
            <p className="text-gray-text text-[14px]">{partners?.email}</p>
            <p
              className={`  max-w-max px-3 py-1 text-[12px] rounded-[12px] mt-1 ${
                partners?.status
                  ? "bg-light-green text-verido-green"
                  : "bg-verido-card-red text-verido-red"
              }`}
            >
              {partners?.status ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3">
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
              <EditPartnerProfile closeModal = {() => setOpen(false)} partner={partners} />
            </DialogContent>
          </Dialog>
          {/* <Dialog>
            <DialogTrigger>
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
            </DialogTrigger>
            <DialogContent>
              <TransferUser />
            </DialogContent>
          </Dialog> */}
          {partners?.status === true ? (
            <SuspendPartner id={partners?._id} />
          ) : (
            <ActivatePartner id={partners?._id} />
          )}
        </div>
      </div>

      <div className="border rounded-[16px] overflow-hidden">
        <p className="px-6 py-4 bg-sidebar-gray font-medium border-b">
          Basic Information
        </p>
        <div className="flex flex-wrap md:flex-row px-6 py-6">
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Partner Name:</span>
              <span className="font-normal">{partners?.name}</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Email Address:</span>
              <span className="font-normal">{partners?.email}</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Partner ID:</span>
              <span className="font-normal">
                {partners?.referenceId}
              </span>
            </p>
            {/* <p className="text-[14px] flex gap-2">
              <span className="font-medium">Sector:</span>
              <span className="font-normal">Agriculture</span>
            </p> */}
            {/* <p className="text-[14px] flex gap-2">
              <span className="font-medium">Institution:</span>
              <span className="font-normal">Farm produce</span>
            </p> */}
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Date Created:</span>
              <span className="font-normal">
                {format(partners?.createdAt, "dd/MM/yy")}
              </span>
            </p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Subscription:</span>
              <span className="font-normal">0</span>
            </p>
            <p className="text-[14px] flex gap-2">
              <span className="font-medium">Subscription amount:</span>
              <span className="font-normal">0</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerInfoCard;
