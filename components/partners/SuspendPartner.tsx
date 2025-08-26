import React from "react";
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
import usePartner from "@/lib/react-query/mutations/usePartner";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../ui/loading-spinner";

interface suspeendPartnerProps {
  id: string;
}

const SuspendPartner = ({ id }: suspeendPartnerProps) => {
  const [open, setOpen] = React.useState(false);
  const { suspendPartnerMutation } = usePartner();
  const router = useRouter();
  const isLoading = suspendPartnerMutation.isPending;

  const handleSuspension = async () => {
    try {
      await suspendPartnerMutation.mutateAsync(id);
      setOpen(false);
      // router.push("/partners");
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
      {/* <AlertDialogContent className="w-[26rem]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between gap-1 font-normal text-[15px]">
            <Image
              src="/assets/icons/caution.svg"
              width={20}
              height={20}
              alt="caution"
            />
            Are you sure you want to suspend this account?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-light-gray text-sm font-light">
            This action cannot be undone. This will suspend the partner&apos;s
            account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border border-verido-green text-verido-green">
            No
          </AlertDialogCancel>
          <Button
            disabled={isLoading}
            onClick={handleSuspension}
            className="text-white bg-verido-orange"
          >
            {isLoading ? <LoadingSpinner /> : "Yes"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent> */}
      <AlertDialogContent className="w-[95%] md:w-[40rem]  border-t-4 border-t-danger flex justify-center mt-[10vh] gap-10 flex-col h-[12rem]">
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
          <AlertDialogTitle className="flex justify-between gap-1 font-normal text-[16px]">
            Are you sure you want to suspend User?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center gap-5 justify-center">
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

export default SuspendPartner;
