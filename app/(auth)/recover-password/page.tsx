"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useAuth from "../../../lib/react-query/mutations/useAuth";
import { IRecoverPassword } from "../../../types/index";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

const RecoverPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<IRecoverPassword>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();
  const { recoverPasswordMutation } = useAuth();
  const onSubmit = async (data: IRecoverPassword) => {
    try {
      Cookies.set("userEmail", data.email);

      await recoverPasswordMutation.mutateAsync(data);
    } catch (error) {}
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

        <div className="flex flex-col gap-1">
          <h2 className="text-[32px] font-bold">Recover Password</h2>
          <p className="text-gray-text text-[14px]">
            We’ll e-mail you instructions on how to reset your password.
          </p>
        </div>

        <div className="">
          <label className=" text-sm font-medium text-black-light">
            Email address
          </label>
          <input
            {...register("email", { required: true })}
            className={`mt-1 text-sm text-gray-text  w-full px-3 py-2 border ${
              errors.email ? "border-danger" : "border-light-gray"
            } rounded-md focus:outline-none focus:border-light-gray`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-danger text-xs mt-1">Your email is required</p>
          )}
        </div>

        <Button
          type="submit"
          className="text-white bg-verido-green mt-10   py-2 rounded-md w-full hover:bg-green-600"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? <LoadingSpinner /> : " Recover Password"}
        </Button>
        <div className="mt-5">
          <p className="font-bold text-gray-text text-sm">
            Remember Password?{"  "}
            <Link
              className="text-verido-green text-sm font-bold"
              href="/signin"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RecoverPassword;
