import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { LoadingSpinner } from "../ui/loading-spinner";

interface AlertDialog {
  logout: () => void;
  isLoggingOut: boolean;
}

const LogoutModal = ({ logout, isLoggingOut }: AlertDialog) => {
  // const isLoggingOutNow = true
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p className="cursor-pointer">Logout</p>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[40rem]  border-t-4 border-t-danger flex justify-center mt-[10vh] gap-10 flex-col h-[12rem]">
        <AlertDialogCancel className="absolute top-0 right-0">
          <Image
            src="/assets/icons/close.svg"
            width={20}
            height={20}
            alt="close"
          />
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold gap-2 flex">
            <Image
              src="/assets/icons/misc.svg"
              width={30}
              height={30}
              alt="caution"
            />
            Logout
          </AlertDialogTitle>
          <AlertDialogTitle className="flex justify-between gap-1 font-normal text-[16px]">
            Are you sure you want Logout?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex">
          <Button
            className={`text-white ${
              isLoggingOut ? "bg-verido-card-red" : "bg-danger"
            }  w-[8rem] rounded-lg`}
            disabled={isLoggingOut}
            onClick={logout}
          >
            {isLoggingOut ? <LoadingSpinner /> : "Yes, I'm sure"}
          </Button>
          <AlertDialogCancel className="border border-light-gray text-gray-text w-[8rem]">
            No,cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;
