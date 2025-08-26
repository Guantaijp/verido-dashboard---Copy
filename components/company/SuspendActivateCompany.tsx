import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import useCompany from "@/lib/react-query/mutations/useCompany";
import { LoadingSpinner } from "../ui/loading-spinner";
import useCustomToast from "@/lib/hooks/useCustomToast";

interface SuspendActivateCompanyProps {
  id: string;
  status: boolean;
}

const SuspendActivateCompany = ({
  id,
  status,
}: SuspendActivateCompanyProps) => {
  const showToast = useCustomToast();
  const [open, setOpen] = React.useState(false);
  const { suspendActiviateCompanyMutation } = useCompany();
  const isLoading = suspendActiviateCompanyMutation.isPending;

  const handleAction = async () => {
    try {
      await suspendActiviateCompanyMutation.mutateAsync(id, {
        onSuccess: () => {
          showToast(
            "Success",
            status
              ? "Company suspended successfully"
              : "Company activated successfully",
            "success"
          );
          setOpen(false);
        },
      });
      setOpen(false);
    } catch (error) {}
  };

  const buttonStyle = status
    ? "bg-suspend text-white"
    : "bg-verido-green text-white";

  const buttonText = status ? "Suspend" : "Activate";
  const dialogBorderColor = status
    ? "border-t-danger"
    : "border-t-verido-green";
  const iconSrc = status
    ? "/assets/icons/redCheck.svg"
    : "/assets/icons/greenCheck.svg";
  const actionButtonColor = status
    ? `${isLoading ? "bg-verido-card-red" : "bg-danger"}`
    : `${isLoading ? "bg-verido-card-red" : "bg-verido-green"}`;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size={"sm"}
          className={`${buttonStyle} px-3 py-2 text-[13px] rounded-md`}
        >
          {buttonText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        className={`w-[40rem] border-t-4 ${dialogBorderColor} flex justify-center mt-[10vh] gap-10 flex-col h-[12rem]`}
      >
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
            <Image src={iconSrc} width={30} height={30} alt="caution" />
            {buttonText} Company
          </AlertDialogTitle>
          <AlertDialogTitle className="flex justify-between gap-1 font-normal text-[16px]">
            Are you sure you want to {buttonText.toLowerCase()} this company?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex">
          <Button
            className={`text-white ${actionButtonColor} w-[8rem] rounded-lg`}
            disabled={isLoading}
            onClick={handleAction}
          >
            {isLoading ? <LoadingSpinner /> : "Yes, I'm sure"}
          </Button>
          <AlertDialogCancel className="border border-light-gray text-gray-text w-[8rem]">
            No, cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuspendActivateCompany;
