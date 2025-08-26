import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import InternationalPhoneSelect from "../common/InternationalPhoneSelect";
import { LoadingSpinner } from "../ui/loading-spinner";
import useUser from "@/lib/react-query/mutations/useUser";
import { useQueryClient } from "@tanstack/react-query";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { currencies } from "@/constant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PartnerFormProps {
  closeModal?: () => void;
  company: any;
}
export interface IEditCompany {
  name: string;
  email: string;
  phoneNumber: string;
  sector: string;
  businessType: string;
  currency: string;
}

const EditCompanyProfile = ({ closeModal, company }: PartnerFormProps) => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();
  const { updateAdminMutation } = useUser();
  const companyId = company?.id;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<IEditCompany>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: company.email || "",
      phoneNumber: company.phoneNumber || "",
      name: company?.name || company?.companyDetails?.companyName,
      sector: company.companyDetails?.sector || "",
      businessType: company.companyDetails?.businessType || "",
      currency: company.companydetails?.currency,
    },
  });

  const onSubmit = async (data: IEditCompany) => {
    try {
      await updateAdminMutation.mutateAsync(
        {
          id: companyId,
          payload: data,
        },
        {
          onSuccess: () => {
            showToast("Success!", "Company Updated.", "success");
            queryClient.invalidateQueries({
              queryKey: ["company"],
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
            initialValue={company.phoneNumber}
            setValue={setValue}
          />

          {errors.phoneNumber && (
            <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="sector" className="text-[14px] font-medium">
            Sector
          </Label>
          <Select
            onValueChange={(value) => setValue("sector", value)}
            defaultValue={company.companyDetails?.sector}
          >
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
          {errors.sector && (
            <p className="text-red-500 text-xs">{errors.sector.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="businessType" className="text-[14px] font-medium">
            Business Type
          </Label>
          <Select
            onValueChange={(value) => setValue("businessType", value)}
            defaultValue={company.companyDetails?.businessType}
          >
            <SelectTrigger className="w-full text-light-gray">
              <SelectValue placeholder="Select Business type" />
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
          {errors.businessType && (
            <p className="text-red-500 text-xs">
              {errors.businessType.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="currency" className="text-[14px] font-medium">
            Currency
          </Label>
          <Select
            defaultValue={company.companyDetails?.currency}
            onValueChange={(value) => setValue("currency", value)}
          >
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

export default EditCompanyProfile;
