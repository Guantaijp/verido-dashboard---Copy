"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import CountryAdminForm from "./CountryAdminForm";
import DigitalEntrepreneurForm from "./DigitalEntrepreneurForm";
import DistributorForm from "./DistributorForm";
import MultibranchForm from "./MultibranchForm";
import CompanyForm from "./CompanyForm";
import PartnerForm from "./PartnerForm";
import SuperAgentForm from "./SuperAgentForm";
import { useAuthenticatedUser } from "@/context/AuthContext";

export interface ICreateUser {
  email: string;
  phoneNumber: string;
  sector: string;
  password: string;
  institution: string;
  subTimeline: string;
  countryName: string;
}

const userTypes: { value: string; label: string; permission: any }[] = [
  {
    value: "countryAdmin",
    label: "Country Admin",
    permission: "countryadmin.create",
  },
  {
    value: "partner",
    label: "Partner",
    permission: "partners.create",
  },
  {
    value: "company",
    label: "Company",
    permission: "company.create",
  },
  {
    value: "superAgents",
    label: "Super Agents",
    permission: "superagents.create",
  },
  {
    value: "digitalEntrepreneurs",
    label: "Digital Entrepreneurs",
    permission: "digital_entrepreneur.create",
  },
  {
    value: "multiBranch",
    label: "Multi Branches",
    permission: "multi_branch_business.create",
  },
  {
    value: "distributors",
    label: "Distributors",
    permission: "distributor.create",
  },
];

const AddUser = () => {
  const [open, setOpen] = React.useState(false);

  const [userType, setUserType] = React.useState("");

  const { hasPermission } = useAuthenticatedUser();

  const resetModal = () => {
    setUserType("");
    setOpen(false);
  };

  const selectableUserTypes = userTypes.filter((type) =>
    hasPermission(type.permission)
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="bg-verido-green text-verido-white">
          Create User
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`flex flex-col w-full h-[100dvh] lg:h-[80dvh] sm:w-[425px] sm:h-auto ${
          userType ? "sm:w-[550px]" : ""
        } transition-all duration-300 overflow-y-auto overflow-x-hidden`}
      >
        <DialogHeader>
          <DialogTitle className="text-[20px] font-semibold">
            Create User
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="userType" className="text-[14px] font-medium">
            User Type
          </Label>
          <Select onValueChange={(value) => setUserType(value)}>
            <SelectTrigger className="w-full text-light-gray">
              <SelectValue placeholder="Select User Type" />
            </SelectTrigger>
            <SelectContent>
              {selectableUserTypes.map((type) => (
                <SelectItem
                  key={type.value}
                  className="text-sm text-light-gray"
                  value={type.value}
                >
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {userType === "countryAdmin" && (
          <CountryAdminForm closeModal={resetModal} />
        )}
        {userType === "company" && <CompanyForm closeModal={resetModal} />}
        {userType === "partner" && <PartnerForm closeModal={resetModal} />}
        {userType === "superAgents" && (
          <SuperAgentForm closeModal={resetModal} />
        )}
        {userType === "digitalEntrepreneurs" && (
          <DigitalEntrepreneurForm closeModal={resetModal} />
        )}
        {userType === "multiBranch" && (
          <MultibranchForm closeModal={resetModal} />
        )}
        {userType === "distributors" && (
          <DistributorForm closeModal={resetModal} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
