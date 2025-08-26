import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import useUser from "@/lib/react-query/mutations/useUser";
import InternationalPhoneSelect from "../common/InternationalPhoneSelect";
import { LoadingSpinner } from "../ui/loading-spinner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import Image from "next/image";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { currencies } from "@/constant";

export interface ICreateCompany {
  email: string;
  password: string;
  companyName: string;
  partnerId?: string;
  sector: string;
  currency: string;
  phoneNumber: string;
  institution: string;
  subscriptionTimeline: string;
  businessType: string;
}

interface CompanyFormProps {
  closeModal: () => void;
}

const CompanyForm = ({ closeModal }: CompanyFormProps) => {
  const { createCompanytMutation } = useUser();
  const { currentUser } = useAuthenticatedUser();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors, isValid },
  } = useForm<ICreateCompany>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
      companyName: "",
      partnerId: currentUser?.role === "partner" ? currentUser?._id : "",
      sector: "",
      currency: "",
      phoneNumber: "",
      businessType: "",
      // institution: "",
      // subscriptionTimeline: "",
    },
  });

  const onSubmit = async (data: ICreateCompany) => {
    if (isSubmitting) return;
    try {
      await createCompanytMutation.mutateAsync(data);
      reset();
      closeModal();
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="companyName" className="text-[14px] font-medium">
            Company Name
          </Label>
          <Input
            placeholder="Enter Company Name"
            id="companyName"
            {...register("companyName", {
              required: "Company Name is required",
            })}
            className={`border ${
              errors.companyName ? "border-red-500" : "border-verido-border"
            } px-3 py-2 focus:outline-none`}
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs">{errors.companyName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="email" className="text-[14px] font-medium">
            Email address
          </Label>
          <Input
            placeholder="Enter email Address"
            id="email"
            {...register("email", { required: "Email is required" })}
            className={`border ${
              errors.email ? "border-red-500" : "border-verido-border"
            } px-3 py-2 focus:outline-none`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="phoneNumber" className="text-[14px] font-medium">
            Phone
          </Label>
          <InternationalPhoneSelect setValue={setValue} />

          {errors.phoneNumber && (
            <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div
          className={`flex-col gap-1 items-start ${
            currentUser?.role === "partner" && "hidden"
          }`}
        >
          <Label htmlFor="partnerId" className="text-[14px] font-medium">
            Partner ID{" "}
            <span className="text-gray-text/40 font-bold text-sm">
              (optional)
            </span>
          </Label>
          <Input
            placeholder="Enter partner ID"
            id="partnerId"
            {...register("partnerId")}
            className={`border border-verido-border
            px-3 py-2 focus:outline-none`}
          />
        </div>
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="sector" className="text-[14px] font-medium">
            Sector
          </Label>
          <Select onValueChange={(value) => setValue("sector", value)}>
            <SelectTrigger className="w-full text-light-gray">
              <SelectValue placeholder="Select Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                className="text-sm text-light-gray"
                value="entertainment"
              >
                Entertainment
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="business">
                Business
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="minning">
                Minning
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="IT">
                IT
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="politics">
                Politics
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="institution" className="text-[14px] font-medium">
            Institution
          </Label>
          <Select onValueChange={(value) => setValue("institution", value)}>
            <SelectTrigger className="w-full text-light-gray">
              <SelectValue placeholder="Select Institution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-sm text-light-gray" value="Mining">
                Mining
              </SelectItem>
              <SelectItem
                className="text-sm text-light-gray"
                value="Agriculture"
              >
                Agriculture
              </SelectItem>
              <SelectItem
                className="text-sm text-light-gray"
                value="Manufacturing"
              >
                Manufacturing
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="Finance">
                Finance
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="Energy">
                Energy
              </SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        {/* <div className="flex flex-col gap-1 items-start">
          <Label
            htmlFor="subscriptionTimeline"
            className="text-[14px] font-medium"
          >
            Subscription Timeline
          </Label>
          <Select
            onValueChange={(value) => setValue("subscriptionTimeline", value)}
          >
            <SelectTrigger className="w-full text-light-gray">
              <SelectValue placeholder="Select Subscription Timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-sm text-light-gray" value="Quarterly">
                Quarterly
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="Monthly">
                Monthly
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="Yearly">
                Yearly
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="Custom">
                Custom
              </SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        <div className="relative">
          <label className=" text-sm font-medium text-black-light">
            Password
          </label>
          <input
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true, minLength: 6 })}
            className={`mt-1 text-sm text-gray-text  w-full px-3 py-2 border ${
              errors.password ? "border-verido-orange" : "border-light-gray"
            } rounded-md focus:outline-none focus:border-light-gray`}
          />
          <div
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Image
              src={
                showPassword
                  ? "/assets/icons/eye-off.svg"
                  : "/assets/icons/eye-on.svg"
              }
              alt="toggle password visibility"
              width={15}
              height={15}
            />
          </div>
          {errors.password && (
            <p className="text-verido-orange text-xs mt-1">
              Please enter at least 6 characters
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="currency" className="text-[14px] font-medium">
            Currency
          </Label>
          <Select onValueChange={(value) => setValue("currency", value)}>
            <SelectTrigger className="w-full text-light-gray">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem
                  key={currency.code}
                  className="text-sm text-light-gray"
                  value={currency.code}
                >
                  {currency.symbol} {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="businessType" className="text-[14px] font-medium">
            Business Type
          </Label>
          <Select onValueChange={(value) => setValue("businessType", value)}>
            <SelectTrigger className="w-full text-light-gray">
              <SelectValue placeholder="Select Business Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-sm text-light-gray" value="wholesale">
                Wholesale
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="retail">
                Retail
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="vendor">
                Vendor
              </SelectItem>
              <SelectItem
                className="text-sm text-light-gray"
                value="distributor"
              >
                Distributor
              </SelectItem>
              <SelectItem
                className="text-sm text-light-gray"
                value="manufacturer"
              >
                Manufacturer
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          className={`w-full bg-button-disabled ${
            isSubmitting
              ? "bg-button-disabled text-verido-nuetral"
              : "bg-verido-green text-verido-white"
          } `}
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoadingSpinner /> : "Add Company"}
        </Button>
      </form>
    </>
  );
};

export default CompanyForm;
