"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { IUsers } from "../../types/index";
import useAuth from "../../lib/react-query/mutations/useAuth";
import { LoadingSpinner } from "../ui/loading-spinner";

const Login = () => {
  const { loginMutation } = useAuth();

  const onSubmit = async (data: IUsers) => {
    if (isSubmitting) return;
    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {}
  };
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IUsers>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
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
        <div className="flex flex-col gap-5">
          <h2 className="text-[32px] font-bold">Welcome Back!</h2>
          <p className="text-gray-text  text-[14px]">
            Log in to monitor and manage your organization effectively.
          </p>
        </div>

        <div className="mb-[20px]">
          <label className=" text-sm font-medium text-black-light">
            Email address
          </label>
          <input
            placeholder="Enter email address"
            {...register("email", { required: true })}
            className={`mt-1 text-sm text-gray-text  w-full px-3 py-2 border ${
              errors.email ? "border-danger" : "border-light-gray"
            } rounded-md focus:outline-none focus:border-light-gray`}
          />
          {errors.email && (
            <p className="text-danger text-xs mt-1">Your Email is required</p>
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
        <div className="flex  items-center justify-between mt-4">
          <Link href="/recover-password" className="text-sm  text-verido-green">
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          className={`text-white bg-verido-green mt-10    py-4 rounded-md w-full hover:bg-verido-green/50`}
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoadingSpinner /> : "Log in"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
