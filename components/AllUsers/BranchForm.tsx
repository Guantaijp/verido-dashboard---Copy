import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { Label } from "../ui/label";
import InternationalPhoneSelect from "../common/InternationalPhoneSelect";
import useDistributors from "@/lib/react-query/mutations/useDistributors";
import useMultibranch from "@/lib/react-query/mutations/useMultibranch";

interface IBranchForm {
  phoneNumber: string;
  consultantId: string;
  businessState: string;
  businessCountry: string;
  password: string;
  branchName: string;
  businessName: string;
}

interface BranchFormProps {
  closeModal: () => void;
}

const BranchForm: React.FC<BranchFormProps> = ({ closeModal }) => {
  const { currentUser } = useAuthenticatedUser();
  const { createMultibranchBusinessBranchMutation } = useMultibranch();
  const { createDistributorBranchMutation } = useDistributors();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IBranchForm>({
    mode: "onBlur",
    defaultValues: {
      phoneNumber: "",
      consultantId: "",
      businessState: "",
      businessCountry: "",
      password: "",
      branchName: "",
      businessName: "",
    },
  });

  const onSubmit = async (payload: IBranchForm) => {
    try {
      const sentPayload = {
        ...payload,
        consultantId: currentUser?.referenceId || "",
        businessName: currentUser?.name || "",
      };

      if (currentUser?.role === "distributor") {
        await createDistributorBranchMutation.mutateAsync({
          id: currentUser._id,
          payload: sentPayload,
        });
      } else if (currentUser?.role === "multi_branch_business") {
        await createMultibranchBusinessBranchMutation.mutateAsync({
          id: currentUser._id,
          payload: sentPayload,
        });
      }
      closeModal();
    } catch (error) {
      console.error("Error creating branch:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Add New Branch</h2>
          <p className="text-sm text-gray-500">
            Fill in the details to create a new branch
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="branchName" className="text-[14px] font-medium">
              Branch Name
            </Label>
            <Input
              placeholder="Enter branch name"
              id="branchName"
              {...register("branchName", {
                required: "Branch name is required",
              })}
              className={`border ${
                errors.branchName ? "border-red-500" : "border-verido-border"
              } px-3 py-2 focus:outline-none`}
            />
            {errors.branchName && (
              <p className="text-red-500 text-xs">
                {errors.branchName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="phoneNumber" className="text-[14px] font-medium">
              Phone Number
            </Label>
            <InternationalPhoneSelect setValue={setValue} />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="password" className="text-[14px] font-medium">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Enter password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`border ${
                errors.password ? "border-red-500" : "border-verido-border"
              } px-3 py-2 focus:outline-none`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 items-start">
            <Label
              htmlFor="businessCountry"
              className="text-[14px] font-medium"
            >
              Business Country
            </Label>
            <Input
              placeholder="Enter business country"
              id="businessCountry"
              {...register("businessCountry", {
                required: "Business country is required",
              })}
              className={`border ${
                errors.businessCountry
                  ? "border-red-500"
                  : "border-verido-border"
              } px-3 py-2 focus:outline-none`}
            />
            {errors.businessCountry && (
              <p className="text-red-500 text-xs">
                {errors.businessCountry.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="businessState" className="text-[14px] font-medium">
              Business State
            </Label>
            <Input
              placeholder="Enter business state"
              id="businessState"
              {...register("businessState", {
                required: "Business state is required",
              })}
              className={`border ${
                errors.businessState ? "border-red-500" : "border-verido-border"
              } px-3 py-2 focus:outline-none`}
            />
            {errors.businessState && (
              <p className="text-red-500 text-xs">
                {errors.businessState.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className={`w-full bg-button-disabled ${
              isSubmitting
                ? "bg-button-disabled text-verido-nuetral"
                : "bg-verido-green text-verido-white"
            } `}
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingSpinner /> : "Add Branch"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BranchForm;
