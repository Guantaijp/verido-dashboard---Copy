"use client";
import React, { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { updatePassword } from "@/lib/api/auth.api";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type IUsers = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordContent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const userEmail = Cookies.get("userEmail");
  const showToast = useCustomToast();

  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IUsers>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const password = watch("password");
  const router = useRouter();
  console.log(token);

  const onSubmit = async (data: IUsers) => {
    try {
      await updatePassword(
        {
          email: userEmail!,
          confirm_password: data.confirmPassword,
        },
        token!
      );
      showToast("Success", "Password has been reset successfully", "success");
      router.push("/signin");
      Cookies.remove("userEmail");
    } catch (e: any) {
      showToast(
        "Error",
        "Password reset was not successful. Please try again.",
        "error"
      );
    }
  };
  return (
    <div className="flex pt-16 lg:pt-0 md:pt-0 lg:items-center justify-center h-screen w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[90%] md:w-[80%] flex flex-col gap-2"
      >
        <div className="flex items-start w-full md:hidden lg:hidden mb-4">
          <Image
            width={100}
            height={100}
            className="object-contain"
            src="/assets/icons/verido_logo.svg"
            alt="logo"
          />
        </div>
        <div className="flex flex-col gap-1 mb-5">
          <h2 className="text-[32px] font-bold">Reset Password </h2>
          <p className="text-gray-text font-extralight text-[14px]">
            Email verification is done. Please choose another password.
          </p>
        </div>

        <div className="relative mb-5">
          <label className=" text-sm font-medium text-black-light">
            Create New Password
          </label>
          <input
            placeholder="Enter new password"
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

        <div className="relative">
          <label className=" text-sm font-medium text-black-light">
            Confirm Password
          </label>
          <input
            placeholder="Re-Enter password"
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: true,
              minLength: 6,
              validate: (value) => value === password || "Passwords must match",
            })}
            className={`mt-1 text-sm text-gray-text  w-full px-3 py-2 border ${
              errors.confirmPassword
                ? "border-verido-orange"
                : "border-light-gray"
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
          {errors.confirmPassword && (
            <p className="text-verido-orange text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="text-white bg-verido-green mt-10 py-4 rounded-md w-full hover:bg-green-600 disabled:opacity-50"
        >
          {isSubmitting ? <LoadingSpinner /> : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};

const ResetPassword = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner className="w-10 h-10" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
