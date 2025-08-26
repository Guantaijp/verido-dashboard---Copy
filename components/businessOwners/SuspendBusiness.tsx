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
import useSubAgents from "@/lib/react-query/mutations/useSubAgents";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../ui/loading-spinner";

interface SuspendBusinessProps {
  id: string;
  businessName: string;
}

const SuspendBusiness = ({ id , businessName }: SuspendBusinessProps) => {
  const [open, setOpen] = useState(false);
  const { changeBusinessStatusMutation } = useSubAgents();
  const isLoading = changeBusinessStatusMutation.isPending;
  const router = useRouter();

  const handleSuspension = async () => {
    try {
      await changeBusinessStatusMutation.mutateAsync({
        subAgentId: id,
        status: "suspend",
      });
      setOpen(false);
    } catch (error) {}
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size={"sm"}
          className="bg-suspend text-white px-3 py-2 text-[13px] rounded-md"
        >
          Suspend
        </Button>
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
              src="/assets/icons/redCheck.svg"
              width={30}
              height={30}
              alt="caution"
            />
            Suspend User
          </AlertDialogTitle>
          <AlertDialogTitle className="flex justify-between gap-1 font-normal text-[14px]">
            {`Are you sure you want to  suspend ${businessName}?`}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex">
          <Button
            className={`text-white ${
              isLoading ? "bg-verido-card-red" : "bg-danger"
            }  w-[8rem] rounded-lg`}
            disabled={isLoading}
            onClick={handleSuspension}
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

export default SuspendBusiness;
