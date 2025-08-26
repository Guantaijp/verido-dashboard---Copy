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
import { currencies } from "@/constant";

import Image from "next/image";

export interface ICreateCountryAdmin {
  name: string;
  email: string;
  phoneNumber: string;
  // sector: string;
  // institution: string;
  // subscriptionTimeline: string;
  // subscriptionFee: string;
  countryName: string;
  currency: string;
  password: string;
}

interface CountryAdminFormProps {
  closeModal: () => void;
}

const CountryAdminForm = ({ closeModal }: CountryAdminFormProps) => {
  const { createCountryAdminMutation } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors, isValid },
  } = useForm<ICreateCountryAdmin>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      // sector: "",
      // institution: "",
      // subscriptionTimeline: "",
      // subscriptionFee: "",
      countryName: "",
      currency: "",
    },
  });

  const onSubmit = async (data: ICreateCountryAdmin) => {
    if (isSubmitting) return;
    try {
      await createCountryAdminMutation.mutateAsync(data);
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
          <Label htmlFor="name" className="text-[14px] font-medium">
            Name
          </Label>
          <Input
            placeholder="Enter your name"
            id="name"
            {...register("name", { required: "Name is required" })}
            className={`border ${
              errors.name ? "border-red-500" : "border-verido-border"
            } px-3 py-2 focus:outline-none`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
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
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="countryName" className="text-[14px] font-medium">
            Country Name
          </Label>
          <Input
            placeholder="Enter Country Name"
            id="countryName"
            {...register("countryName", {
              required: "Country Name is required",
            })}
            className={`border ${
              errors.countryName ? "border-red-500" : "border-verido-border"
            } px-3 py-2 focus:outline-none`}
          />
          {errors.countryName && (
            <p className="text-red-500 text-xs">{errors.countryName.message}</p>
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
        {/* <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="sector" className="text-[14px] font-medium">
            Sector
          </Label>
          <Select onValueChange={(value) => setValue("sector", value)}>
            <SelectTrigger className="w-full text-light-gray">
              <SelectValue placeholder="Select Sector" />
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
        {/* <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="subscriptionFee" className="text-[14px] font-medium">
            Subscription Fee
          </Label>
          <Input
            placeholder="Enter Subscription Fee Amount"
            id="subscriptionFee"
            {...register("subscriptionFee", {
              required: "Subscription Fee is required",
              setValueAs: (value) => {
                const numericValue = value.replace(/[^\d]/g, "");

                return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              },
            })}
            onBlur={(e) => {
              const formattedValue = e.target.value
                .replace(/[^\d]/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              e.target.value = formattedValue;
            }}
            className={`border ${
              errors.subscriptionFee ? "border-red-500" : "border-verido-border"
            } px-3 py-2 focus:outline-none`}
          />
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

        <Button
          type="submit"
          className={`w-full ${
            isSubmitting || !isValid
              ? "bg-button-disabled text-verido-nuetral"
              : "bg-verido-green text-verido-white"
          }`}
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? <LoadingSpinner /> : "Add Country Admin"}
        </Button>
      </form>
    </>
  );
};

export default CountryAdminForm;
