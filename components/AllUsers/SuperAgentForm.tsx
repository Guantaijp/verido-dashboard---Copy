import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import useUser from "@/lib/react-query/mutations/useUser";
import InternationalPhoneSelect from "../common/InternationalPhoneSelect";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useAuthenticatedUser } from "@/context/AuthContext";

import Image from "next/image";
import NoAccessButton from "../common/NoAccessButton";

export interface ICreateSuperAgent {
  email: string;
  password: string;
  phoneNumber: string;
  name: string;
  referenceId?: string;
}

interface SuperAgentProps {
  closeModal: () => void;
}

const SuperAgentForm = ({ closeModal }: SuperAgentProps) => {
  const { currentUser } = useAuthenticatedUser();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors, isValid },
  } = useForm<ICreateSuperAgent>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
      phoneNumber: "",
      name: "",
      referenceId: currentUser?.role === "companies" ? currentUser?._id : "",
    },
  });
  const { createSuperAgentMutation } = useUser();

  const onSubmit = async (data: ICreateSuperAgent) => {
    if (isSubmitting) return;
    try {
      await createSuperAgentMutation.mutateAsync(data);
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
        <div
          className={`flex-col gap-1 items-start ${
            currentUser?.role === "companies" && "hidden"
          }`}
        >
          <Label htmlFor="referenceId" className="text-[14px] font-medium">
            Company ID
          </Label>
          <Input
            placeholder="Enter company ID"
            id="referenceId"
            {...register("referenceId")}
            className={`border px-3 py-2 focus:outline-none`}
          />
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
          className={`w-full bg-button-disabled ${
            isSubmitting || !isValid
              ? "bg-button-disabled text-verido-nuetral"
              : "bg-verido-green text-verido-white"
          } `}
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? <LoadingSpinner /> : "Add Super Agent"}
        </Button>
      </form>
    </>
  );
};

export default SuperAgentForm;
