import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import useUser from "@/lib/react-query/mutations/useUser";
import { useQueryClient } from "@tanstack/react-query";
import useCustomToast from "@/lib/hooks/useCustomToast";
import InternationalPhoneSelect from "../common/InternationalPhoneSelect";
import { LoadingSpinner } from "../ui/loading-spinner";
import usePartner from "@/lib/react-query/mutations/usePartner";
import { ICreatePartner } from "@/types";

import Image from "next/image";

interface PartnerFormProps {
  closeModal?: () => void;
  partner: any;
}
export interface IEditPartner {
  name: string;
  email: string;
  phoneNumber: string;
  sector: string;
  businessType: string;
  currency: string;
}

const EditPartnerProfile = ({ closeModal, partner }: PartnerFormProps) => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();
  const { updateAdminMutation } = useUser();
  const partnerId = partner?._id;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<IEditPartner>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: partner.email || "",
      phoneNumber: partner.phoneNumber || "",
      name: partner?.name || "",
      sector: partner.partnerDetails?.sector || "",
      businessType: partner.partnerDetails?.businessType || "",
      currency: partner.partnerDetails?.currency,
    },
  });

  const onSubmit = async (data: IEditPartner) => {
    try {
      await updateAdminMutation.mutateAsync(
        {
          id: partnerId,
          payload: data,
        },
        {
          onSuccess: () => {
            showToast("Success!", "Partner Updated.", "success");
            queryClient.invalidateQueries({
              queryKey: ["partner"],
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
            initialValue={partner?.phoneNumber}
            setValue={setValue}
          />

          {errors.phoneNumber && (
            <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
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

export default EditPartnerProfile;
