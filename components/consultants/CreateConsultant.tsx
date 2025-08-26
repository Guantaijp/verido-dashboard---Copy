"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Image from "next/image";
import { ICreateConsultantCreate } from "../../types/index";
import useConsultant from "../../lib/react-query/mutations/useConsultant";

const CreateConsultant = () => {
   const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ICreateConsultantCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      partner_id: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");
  const { createConsultantMutation } = useConsultant();

  const onSubmit = async (data: ICreateConsultantCreate) => {
    if (isSubmitting) return;
    try {
      await createConsultantMutation.mutateAsync(data);
      reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="bg-verido-green text-verido-white">
          Consultant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-3xl font-light">
              Create Consultant
            </DialogTitle>
            <DialogDescription className="text-gray-text font-light text-sm">
              Please provide the consultant info.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="name" className="text-[11px]">
              Full Name:
            </Label>
            <Input
              id="name"
              {...register("name", { required: "Full name is required" })}
              className={`border ${
                errors.name ? "border-red-500" : "border-verido-border"
              } px-3 py-2 focus:outline-none`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="email" className="text-[11px]">
              Email:
            </Label>
            <Input
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
            <Label htmlFor="phone" className="text-[11px]">
              Phone Number:
            </Label>
            <Input
              id="phone"
              {...register("phone", {
                required: "Phone phone is required",
              })}
              className={`border ${
                errors.phone ? "border-red-500" : "border-verido-border"
              } px-3 py-2 focus:outline-none`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="partner_id" className="text-[11px]">
              Partner ID:
            </Label>
            <Input
              id="partner_id"
              {...register("partner_id", {
                required: "Partner id is required",
              })}
              className={`border ${
                errors.partner_id ? "border-red-500" : "border-verido-border"
              } px-3 py-2 focus:outline-none`}
            />
            {errors.partner_id && (
              <p className="text-red-500 text-xs">
                {errors.partner_id.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 items-start relative">
            <Label htmlFor="password" className="text-[11px]">
              Password:
            </Label>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`border ${
                errors.password ? "border-red-500" : "border-verido-border"
              } px-3 py-2 focus:outline-none`}
            />
            <div
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Image
                src={
                  showPassword
                    ? "/assets/icons/eye-off.svg"
                    : "/assets/icons/eye-off.svg"
                }
                alt="toggle password visibility"
                width={15}
                height={15}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 items-start relative">
            <Label htmlFor="confirmPassword" className="text-[11px]">
              Confirm Password:
            </Label>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords must match",
              })}
              className={`border ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-verido-border"
              } px-3 py-2 focus:outline-none`}
            />
            <div
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Image
                src={
                  showConfirmPassword
                    ? "/assets/icons/eye-off.svg"
                    : "/assets/icons/eye-off.svg"
                }
                alt="toggle confirm password visibility"
                width={15}
                height={15}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-verido-green"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateConsultant;
