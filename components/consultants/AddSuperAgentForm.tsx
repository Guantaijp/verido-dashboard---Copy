"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "../ui/loading-spinner";
import { confrimAgentDetails } from "@/lib/api/superAgent.api";
import useConsultant from "@/lib/react-query/mutations/useConsultant";
import { AnimatePresence, motion } from "framer-motion";

interface AddSuperAgentFormProps {
  closeModal: () => void;
}

interface IAddSuperAgent {
  referenceId: string;
}

interface IAgentDetails {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  username: string;
}

const AddSuperAgentForm: React.FC<AddSuperAgentFormProps> = ({
  closeModal,
}) => {
  const showToast = useCustomToast();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [agentDetails, setAgentDetails] = useState<IAgentDetails | null>(null);
  const { sendSuperAgentInviteMutation } = useConsultant();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
    watch,
  } = useForm<IAddSuperAgent>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      referenceId: "",
    },
  });

  const referenceId = watch("referenceId");

  const handleConfirmDetails = async () => {
    if (!referenceId) return;

    setIsConfirming(true);
    try {
      const response = await confrimAgentDetails(referenceId);
      setAgentDetails(response);
      setIsConfirmed(true);
      showToast("Success", "Agent details confirmed", "success");
    } catch (error) {
      showToast("Error", "Failed to confirm agent details", "error");
    } finally {
      setIsConfirming(false);
    }
  };

  const onSubmit = async (data: IAddSuperAgent) => {
    if (!isConfirmed || !agentDetails) return;

    try {
      await sendSuperAgentInviteMutation.mutateAsync({
        invitees: [
          {
            inviteeReferenceId: data.referenceId,
            inviteeRole: "super_agent",
          },
        ],
      });
      closeModal();
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-6 p-2 w-full">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Add Super Agent</h2>
        <p className="text-sm text-gray-500">
          Add an existing super agent to your organization
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="referenceId" className="text-[14px] font-medium">
            User Reference ID
          </Label>
          <Input
            id="referenceId"
            type="text"
            placeholder="Enter user referenceId"
            {...register("referenceId", {
              required: "User referenceId is required",
            })}
            className={`border ${
              errors.referenceId ? "border-red-500" : "border-verido-border"
            } px-3 py-2 focus:outline-none`}
          />
          {errors.referenceId && (
            <p className="text-red-500 text-xs">{errors.referenceId.message}</p>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isConfirmed && agentDetails && (
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="space-y-4"
            >
              <div className="w-full space-y-3">
                <label className="text-gray-600 text-sm font-bold">Name</label>
                <p className="border px-4 py-2 min-h-10 rounded-md bg-gray-table text-light-gray">
                  {agentDetails.name || agentDetails?.username}
                </p>
              </div>
              <div className="w-full space-y-3">
                <label className="text-gray-600 text-sm font-bold">
                  Phone Number
                </label>
                <div className="w-full space-y-3">
                  <p className="border px-4 py-2 min-h-10 rounded-md bg-gray-table text-light-gray">
                    {agentDetails.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="w-full space-y-3">
                <label className="text-gray-600 text-sm font-bold">Email</label>
                <p className="border px-4 py-2 min-h-10 rounded-md bg-gray-table text-light-gray">
                  {agentDetails.email}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3 mt-4">
          {!isConfirmed ? (
            <Button
              type="button"
              onClick={handleConfirmDetails}
              className="flex-1 bg-verido-green text-verido-white"
              disabled={isConfirming || !referenceId}
            >
              {isConfirming ? <LoadingSpinner /> : "Confirm Details"}
            </Button>
          ) : (
            <Button
              type="submit"
              className={`flex-1 ${
                isSubmitting || !isValid
                  ? "bg-button-disabled text-verido-nuetral"
                  : "bg-verido-green text-verido-white"
              }`}
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? <LoadingSpinner /> : "Add Super Agent"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddSuperAgentForm;
