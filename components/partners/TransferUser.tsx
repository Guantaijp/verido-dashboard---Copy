import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { LoadingSpinner } from "../ui/loading-spinner";

type ITransferUser = {
  name: string;
  email: string;
  countryAdminId: string;
};

const TransferUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors, isValid },
  } = useForm<ITransferUser>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      name: "",
      email: "",
      countryAdminId: "",
    },
  });

  const onSubmit = async (data: ITransferUser) => {
    if (isSubmitting) return;
    try {
      //   await createPartnerMutation.mutateAsync(data);

      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="text-center text-lg font-medium">Transfer User</div>
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="name" className="text-[14px] font-medium">
            Name
          </Label>
          <Input
            placeholder="Enter name"
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
          <Label htmlFor="countryAdminId" className="text-[14px] font-medium">
            Country Admin ID
          </Label>
          <Input
            placeholder="Enter Country Admin ID"
            id="countryAdminId"
            {...register("countryAdminId", {
              required: "Country Admin ID is required",
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
              errors.countryAdminId ? "border-red-500" : "border-verido-border"
            } px-3 py-2 focus:outline-none`}
          />
        </div>

        <Button
          type="submit"
          className={`w-full bg-button-disabled ${
            isSubmitting || !isValid
              ? "bg-button-disabled text-verido-nuetral"
              : "bg-verido-green text-verido-white"
          } `}
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? <LoadingSpinner /> : "Transfer User"}
        </Button>
      </form>
    </>
  );
};

export default TransferUser;
