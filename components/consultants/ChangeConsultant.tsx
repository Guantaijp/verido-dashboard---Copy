"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { IChangeConsultant } from "../../types/index";
import useConsultant from "../../lib/react-query/mutations/useConsultant";
import { useParams } from "next/navigation";

const ChangeConsultant = () => {
  const { id: businessId } = useParams();
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IChangeConsultant>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      consultant_id: "",
      user_id: businessId,
    },
  });

  const { changeConsultantMutation } = useConsultant();

  const onSubmit = async (data: IChangeConsultant) => {
    if (isSubmitting) return;
    try {
      await changeConsultantMutation.mutateAsync(data);
      reset();
      setOpen(false)
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setValue("user_id", businessId);
  }, [businessId, setValue]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          className="rounded-2xl bg-verido-green text-white text-[13px] w-full md:w-[30%] mt-5"
        >
          Change
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-3xl font-light">
              Change Consultant
            </DialogTitle>
            <DialogDescription className="text-gray-text font-light text-sm">
              Please provide the consultant info.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="consultant_id" className="text-[11px]">
              Consultant&apos;s Id:
            </Label>
            <Input
              id="consultant_id"
              {...register("consultant_id", {
                required: "Consultant id is required",
              })}
              className={`border ${
                errors.consultant_id ? "border-red-500" : "border-verido-border"
              } px-3 py-2 focus:outline-none`}
            />
            {errors.consultant_id && (
              <p className="text-red-500 text-xs">
                {errors.consultant_id.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="user_id" className="text-[11px]">
              User&apos;s Id:
            </Label>
            <Input
              id="user_id"
              {...register("user_id", { required: "User id is required" })}
              disabled
              className="border border-verido-border px-3 py-2 focus:outline-none bg-gray-100"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-verido-green"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Changing..." : "Change Consultant"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeConsultant;
