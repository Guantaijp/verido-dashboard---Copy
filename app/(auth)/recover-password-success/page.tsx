"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useAuth from "../../../lib/react-query/mutations/useAuth";
import { IRecoverPassword } from "../../../types/index";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Image from "next/image";
import Cookies from "js-cookie";

const RecoverPasswordSuccess = () => {
  const { recoverPasswordMutation } = useAuth();
  const email = Cookies.get("userEmail");
  const isSending = recoverPasswordMutation.isPending;

  const handleResendLink = () => {
    try {
      if (email) {
        recoverPasswordMutation.mutateAsync({ email });
      }
    } catch (error) {}
  };
  return (
    <div className="flex pt-16 lg:pt-0 md:pt-0 lg:items-center justify-center h-screen w-full">
      <section className="w-[90%] md:w-[80%] flex flex-col gap-2">
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
          <h2 className="text-[32px] font-bold">Password Reset Link Sent</h2>
          <p className="text-gray-text text-[14px]">
            {`We've emailed a password reset link to: emial. Check your inbox and click the link to create a new password.`}
          </p>
        </div>

        <Link href={"/signin"}>
          <Button
            type="button"
            className="text-white bg-verido-green mt-10   py-2 rounded-md w-full hover:bg-green-600"
          >
            Go back to login
          </Button>
        </Link>
        <div className="mt-5 flex justify-center w-full">
          <p className="font-bold text-gray-text text-sm">
            No email?{" "}
            <span
              className="text-verido-green text-sm font-bold cursor-pointer"
              onClick={handleResendLink}
            >
              {isSending ? "Sending..." : "Resend Link"}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default RecoverPasswordSuccess;
