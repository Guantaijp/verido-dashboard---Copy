"use client";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import InternationalPhoneSelect from "../common/InternationalPhoneSelect";
import { LoadingSpinner } from "../ui/loading-spinner";
import useUser from "@/lib/react-query/mutations/useUser";
import useCustomToast from "@/lib/hooks/useCustomToast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CountryAdminFormProps {
  closeModal?: () => void;
  countryAdmin: any;
}

export interface IEditAdmin {
  name: string;
  email: string;
  phoneNumber: string;
  currency: string;
  countryName: string;
}

const EditCountryAdminProfile = ({
  closeModal,
  countryAdmin,
}: CountryAdminFormProps) => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();
  const { updateAdminMutation } = useUser();
  const countryAdminId = countryAdmin?.id;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<IEditAdmin>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: countryAdmin.email,
      phoneNumber: countryAdmin.phoneNumber,
      name: countryAdmin.name,
      currency: countryAdmin.countryAdminDetails?.currency || "",
      countryName: countryAdmin.countryAdminDetails?.countryName || "",
    },
  });

  const onSubmit = async (payload: IEditAdmin) => {
    try {
      await updateAdminMutation.mutateAsync(
        {
          id: countryAdminId,
          payload,
        },
        {
          onSuccess: () => {
            showToast("Success!", "Country Admin Updated.", "success");
            queryClient.invalidateQueries({
              queryKey: ["country_admin"],
            });
            closeModal?.();
          },
        }
      );
      reset();
    } catch (error) {
      console.error(error);
    }
  };

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
            {...register("name", { required: "Your name is required" })}
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
          <InternationalPhoneSelect
            setValue={setValue}
            initialValue={countryAdmin.phoneNumber}
          />
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
          <Select
            onValueChange={(value) => setValue("currency", value)}
            defaultValue={countryAdmin.countryAdminDetails?.currency}
          >
            <SelectTrigger className="w-full text-light-gray">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-sm text-light-gray" value="USD">
                &#x24; US Dollar
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="EUR">
                &#x20AC; Euro
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="GBP">
                &#xa3; Pounds
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="NGN">
                &#8358; Naira
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="UGX">
                &#x20B5; Ugandan Shilling
              </SelectItem>
              <SelectItem className="text-sm text-light-gray" value="MZN">
                &#x20B5; Mozambican Metical
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.currency && (
            <p className="text-red-500 text-xs">{errors.currency.message}</p>
          )}
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
          {isSubmitting ? <LoadingSpinner /> : "Save Changes"}
        </Button>
      </form>
    </>
  );
};

export default EditCountryAdminProfile;
