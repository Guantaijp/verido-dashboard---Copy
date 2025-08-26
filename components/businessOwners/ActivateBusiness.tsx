import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import useConsultant from "@/lib/react-query/mutations/useConsultant";
import useSubAgents from "@/lib/react-query/mutations/useSubAgents";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../ui/loading-spinner";

interface ActivateBusinessProps {
  id: string;
}

const ActivateBusiness = ({ id }: ActivateBusinessProps) => {
  const [open, setOpen] = useState(false);
  const { changeBusinessStatusMutation } = useSubAgents();
  const router = useRouter();
  const isLoading = changeBusinessStatusMutation.isPending;

  const handleActivate = async () => {
    try {
      await changeBusinessStatusMutation.mutateAsync({
        subAgentId:id,
        status: "activate",
      });
      setOpen(false);
    } catch (error) {}
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size={"sm"}
          className="bg-verido-green text-white px-8 py-3 text-[13px] rounded-md"
        >
          Activate
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[40rem]  border-t-4 border-t-verido-green flex justify-center mt-[10vh] gap-10 flex-col h-[12rem]">
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
              src="/assets/icons/greenCheck.svg"
              width={30}
              height={30}
              alt="caution"
            />
            Activate User
          </AlertDialogTitle>
          <AlertDialogTitle className="flex justify-between gap-1 font-normal text-[16px]">
            Are you sure you want to activate this User?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex">
          <Button
            className={`text-white ${
              isLoading ? "bg-verido-card-red" : "bg-verido-green"
            }  w-[8rem] rounded-lg`}
            disabled={isLoading}
            onClick={handleActivate}
          >
            {isLoading ? <LoadingSpinner /> : "Yes, I'm sure"}
          </Button>
          <AlertDialogCancel className="border border-light-gray text-gray-text w-[8rem]">
            No,cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActivateBusiness;
