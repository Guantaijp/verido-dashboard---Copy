import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import InternationalPhoneSelect from "../common/InternationalPhoneSelect";
import { LoadingSpinner } from "../ui/loading-spinner";
import useMultibranch from "@/lib/react-query/mutations/useMultibranch";
import { ICreateNewUsers } from "@/types";

import Image from "next/image";

interface MultibranchFormProps {
  closeModal: () => void;
}

const MultibranchForm = ({ closeModal }: MultibranchFormProps) => {
  const { createMultibranchMutation } = useMultibranch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors, isValid },
  } = useForm<ICreateNewUsers>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      referrerReferenceId: "",
      parentReferenceId: "",
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (payload: ICreateNewUsers) => {
    try {
      await createMultibranchMutation.mutateAsync(payload);

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
        <div className={`flex-col gap-1 items-start`}>
          <Label
            htmlFor="referrerReferenceId"
            className="text-[14px] font-medium"
          >
            Referrer Reference ID{" "}
            <span className="text-gray-text/40 font-bold text-sm">
              (optional)
            </span>
          </Label>
          <Input
            placeholder="Enter reference ID"
            id="referrerReferenceId"
            {...register("referrerReferenceId")}
            className={`border border-verido-border
            px-3 py-2 focus:outline-none`}
          />
        </div>
        <div className={`flex-col gap-1 items-start`}>
          <Label
            htmlFor="parentReferenceId"
            className="text-[14px] font-medium"
          >
            Reference ID{" "}
            <span className="text-gray-text/40 font-bold text-sm">
              (optional)
            </span>
          </Label>
          <Input
            placeholder="Enter reference ID"
            id="parentReferenceId"
            {...register("parentReferenceId")}
            className={`border border-verido-border
            px-3 py-2 focus:outline-none`}
          />
        </div>
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
          <Label htmlFor="username" className="text-[14px] font-medium">
            Username
          </Label>
          <Input
            placeholder="Enter username"
            id="username"
            {...register("username", { required: "Email is required" })}
            className={`border ${
              errors.username ? "border-red-500" : "border-verido-border"
            } px-3 py-2 focus:outline-none`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
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
          {isSubmitting ? <LoadingSpinner /> : "Create Multibranch"}
        </Button>
      </form>
    </>
  );
};

export default MultibranchForm;
