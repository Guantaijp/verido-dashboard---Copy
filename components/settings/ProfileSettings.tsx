"use client";
import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import { useAuthenticatedUser } from "@/context/AuthContext";
import Image from "next/image";
import { Input } from "../ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "../ui/label";
import useBroadcast from "@/lib/react-query/mutations/useBroadcast";
import { LoadingSpinner } from "../ui/loading-spinner";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { useForm } from "react-hook-form";
import useUser from "@/lib/react-query/mutations/useUser";
import { IUpdateAdmin } from "@/lib/api/users.api";
import InternationalPhoneSelect from "../common/InternationalPhoneSelect";
import { ArrowLeftIcon } from "lucide-react";

const ProfileSettings = () => {
  const { currentUser } = useAuthenticatedUser();
  const [imageResponseUrl, setImageResponseUrl] = useState<string>("");
  const [isEdit, setIsEdit] = useState(false);
  const { uploadImageMutation } = useBroadcast();
  const { updateAdminProfileMutation } = useUser();
  const isImagePending = uploadImageMutation.isPending;
  const showToast = useCustomToast();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<IUpdateAdmin>({
    defaultValues: {
      phoneNumber: currentUser?.phoneNumber || "",
    },
  });

  const handleEditImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const uploadPromise = uploadImageMutation.mutateAsync(file);
      const imageResponse = await uploadPromise;
      showToast("Successful", "Image was uploaded successfully", "success");
      setImageResponseUrl(imageResponse?.url);
    } catch (error) {
      showToast(
        "Something went wrong",
        "Image was not uploaded try again!!",
        "error"
      );
    }
  };

  const onSubmit = async (data: IUpdateAdmin) => {
    try {
      await updateAdminProfileMutation.mutateAsync(
        {
          payload: {
            ...data,
            photoUrl: imageResponseUrl || currentUser?.photoUrl,
          },
        },
        {
          onSuccess: () => {
            setIsEdit(false);
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    if (isEdit) {
      formRef.current?.requestSubmit();
    } else {
      setIsEdit(true);
    }
  };

  return (
    <div className="p-3">
      {isEdit && (
        <div
          className="flex items-center mb-5 cursor-pointer"
          onClick={() => setIsEdit(false)}
        >
          <ArrowLeftIcon />
          <p className="text-sm font-bold">Go back</p>
        </div>
      )}
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold text-xl md:text-2xl">Profile</p>
        <Button
          type="button"
          className="bg-verido-green w-28 h-10"
          onClick={handleButtonClick}
          disabled={isEdit && isSubmitting}
        >
          {isEdit ? (
            isSubmitting ? (
              <LoadingSpinner />
            ) : (
              "Save Changes"
            )
          ) : (
            "Edit Profile"
          )}
        </Button>
      </div>
      <AnimatePresence mode="wait">
        {isEdit ? (
          <motion.form
            ref={formRef}
            key="edit"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            className="flex flex-col justify-start"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <div className=" rounded-full w-28 h-28 mb-3 bg-light-gray/50">
                {!isImagePending ? (
                  <Image
                    src={
                      imageResponseUrl ||
                      currentUser?.photoUrl ||
                      "/assets/icons/Avatar.svg"
                    }
                    alt="Profile"
                    width={100}
                    height={100}
                    loading="lazy"
                    className="rounded-full object-cover w-full h-full"
                  />
                ) : (
                  <div className="rounded-full w-28 h-28  bg-light-gray opacity-50 flex justify-center items-center mb-3">
                    <LoadingSpinner />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="cursor-pointer inline-flex items-center justify-center text-white text-[11px] p-2 h-9 border border-input bg-verido-green rounded-md">
                    Upload Picture
                  </div>
                </Label>
                <p className="text-[14px] text-black-light font-semi-bold mt-2">
                  <span className="text-light-gray font-bold  ">
                    Formats supported:
                  </span>
                  JPG and PNG
                </p>
                <p className="text-[14px] text-black-light font-semi-bold mt-2">
                  <span className="text-light-gray  font-bold">Max size:</span>
                  10MB
                </p>
                <Input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleEditImage}
                  accept="image/*,video/mp4,video/quicktime,video/x-msvideo,video/x-matroska"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-full md:w-3/5 space-y-3">
                <label className="text-gray-600 text-sm font-bold">Name</label>
                <Input
                  {...register("name")}
                  type="text"
                  defaultValue={currentUser?.name}
                  disabled
                  className="border px-4 py-2 min-h-10 rounded-md bg-gray-table text-gray-text font-bold"
                  placeholder="Enter your name"
                />
              </div>
              <div className="w-full md:w-3/5 space-y-3">
                <label className="text-gray-600 text-sm font-bold">
                  Phone Number
                </label>
                <InternationalPhoneSelect
                  setValue={setValue}
                  initialValue={currentUser?.phoneNumber}
                />
              </div>
              <div className="w-full md:w-3/5 space-y-3">
                <label className="text-gray-600 text-sm font-bold">Email</label>
                <Input
                  {...register("email")}
                  defaultValue={currentUser?.email}
                  disabled
                  type="email"
                  className="border px-4 py-2 min-h-10 rounded-md bg-gray-table text-gray-text font-bold"
                  placeholder="Enter your email"
                />
              </div>
              <p className="px-4 py-2 w-3/5 rounded-full text-xs bg-sidebar-gray text-light-gray font-bold">
                To change email, contact Verido
              </p>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="view"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            className="flex flex-col justify-start"
          >
            <div className="rounded-full w-28 h-28 mb-3">
              <Image
                src={currentUser?.photoUrl || "/assets/icons/Avatar.svg"}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full w-full h-full"
              />
            </div>

            <div className="space-y-4">
              <div className="w-full md:w-3/5 space-y-3">
                <label className="text-gray-600 text-sm font-bold">Name</label>
                <p className="border px-4 py-2 min-h-10 rounded-md bg-gray-table text-light-gray">
                  {currentUser?.name}
                </p>
              </div>
              <div className="w-full md:w-3/5 space-y-3">
                <label className="text-gray-600 text-sm font-bold">
                  Phone Number
                </label>
                <p className="border px-4 py-2 min-h-10 rounded-md bg-gray-table text-light-gray">
                  {currentUser?.phoneNumber}
                </p>
              </div>
              <div className="w-full md:w-3/5 space-y-3">
                <label className="text-gray-600 text-sm font-bold">Email</label>
                <p className="border px-4 py-2 min-h-10 rounded-md bg-gray-table text-light-gray">
                  {currentUser?.email}
                </p>
              </div>
              {currentUser?.referenceId ? (
                <div className="w-full md:w-3/5 space-y-3">
                  <label className="text-gray-600 text-sm font-bold">
                    Reference Id
                  </label>
                  <div className="flex items-center gap-2">
                    <p className="border px-4 py-2 min-h-10 rounded-md bg-gray-table text-light-gray flex-1">
                      {currentUser?.referenceId || "No ID available"}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-10 bg-verido-green text-white cursor-pointer"
                      onClick={() => {
                        if (currentUser?._id) {
                          navigator.clipboard.writeText(
                            currentUser.referenceId
                          );
                          showToast(
                            "Copied!",
                            "User ID copied to clipboard",
                            "success"
                          );
                        }
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileSettings;
