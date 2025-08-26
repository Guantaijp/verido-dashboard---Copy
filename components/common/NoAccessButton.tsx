import React from "react";
import { Button } from "../ui/button";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { cn } from "@/lib/utils";

interface ButtonProps {
  title: string;
  className?: string;
}

const NoAccessButton = ({ title, className }: ButtonProps) => {
  const showToast = useCustomToast();

  const handleClick = () => {
    showToast(
      "Something went wrong!",
      "You do not have permission, contact Verido to gain access.",
      "error"
    );
  };
  return (
    <Button
      type="button"
      onClick={handleClick}
      size={"sm"}
      className={cn("bg-verido-green text-verido-white", className)}
    >
      {title}
    </Button>
  );
};

export default NoAccessButton;
