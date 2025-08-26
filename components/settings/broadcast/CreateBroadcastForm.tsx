import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import useBroadcast from "@/lib/react-query/mutations/useBroadcast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Progress } from "@/components/ui/progress";
import { convertBytesToMb } from "@/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Trash, X } from "lucide-react";
import { ICreateBroadcastPayload } from "@/lib/api/braodcast.api";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { deliveryChannels } from "@/constant";
import useCustomToast from "@/lib/hooks/useCustomToast";
import BroadcastUserDropdown from "./BroadcastUserDropdown";

interface CreateBroadcastFormProps {
  closeModal: () => void;
}

const CreateBroadcastForm = ({ closeModal }: CreateBroadcastFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageResponseUrl, setImageResponseUrl] = useState<string>("");
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const roleHierarchy: { [key: string]: string[] } = {
    master_admin: [
      "country_admin",
      "partner",
      "companies",
      "super_agent",
      "sub_agents",
    ],
    country_admin: ["partner", "companies", "super_agent", "sub_agents"],
    partner: ["companies", "super_agent", "sub_agents"],
    companies: ["super_agent", "sub_agents"],
    super_agent: ["sub_agents"],
    sub_agent: [],
  };
  const showToast = useCustomToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, errors, isValid },
  } = useForm<ICreateBroadcastPayload>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      groups: [],
      content: "",
      metadata: {
        fileUploadURL: "",
      },
      users: "",
      channels: "",
    },
  });

  const { createBroadcastMutation, uploadImageMutation } = useBroadcast();
  const { currentUser } = useAuthenticatedUser();
  const selectableUserTypes = currentUser?.role
    ? roleHierarchy[currentUser.role] || []
    : [];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setUploadProgress(0);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async () => {
    if (!imageFile) {
      console.error("No file selected");
      return;
    }

    try {
      setShowProgress(true);
      const uploadPromise = uploadImageMutation.mutateAsync(imageFile);
      let lastProgress = 0;
      const progressInterval = setInterval(() => {
        if (lastProgress < 95) {
          lastProgress += 5;
          setUploadProgress(lastProgress);
        }
      }, 100);

      const imageResponse = await uploadPromise;
      clearInterval(progressInterval);
      setUploadProgress(100);

      setImageResponseUrl(imageResponse.url);
    } catch (error) {
      showToast(
        "Something went wrong",
        "image did not upload try again",
        "error"
      );
      setShowProgress(false);
      setUploadProgress(0);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const onSubmit = async (payload: ICreateBroadcastPayload) => {
    if (isSubmitting) return;
    try {
      await createBroadcastMutation.mutateAsync({
        users: selectedUserIds.length > 0 ? selectedUserIds : "all",
        title: payload.title,
        groups: selectedUsers,
        content: payload.content,
        metadata: {
          fileUploadURL: imageResponseUrl,
        },
        channels: watch("channels"),
      });
      reset();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="font-bold">Create Broadcast</div>
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="userType" className="text-[14px] font-medium">
            User Type
          </Label>
          <Select
            onValueChange={(value) => {
              setSelectedUsers((prevUsers) => [...prevUsers, value]);
              setValue("groups", [...selectedUsers, value]);
            }}
          >
            <SelectTrigger className="w-full text-light-gray">
              <SelectValue placeholder="Select User Type(s)" />
            </SelectTrigger>
            <SelectContent>
              {selectableUserTypes.includes("country_admin") && (
                <SelectItem
                  className="text-sm text-light-gray"
                  value="country_admin"
                >
                  Country Admin
                </SelectItem>
              )}
              {selectableUserTypes.includes("partner") && (
                <SelectItem className="text-sm text-light-gray" value="partner">
                  Partner
                </SelectItem>
              )}
              {selectableUserTypes.includes("companies") && (
                <SelectItem
                  className="text-sm text-light-gray"
                  value="companies"
                >
                  Company
                </SelectItem>
              )}
              {selectableUserTypes.includes("super_agent") && (
                <SelectItem
                  className="text-sm text-light-gray"
                  value="super_agent"
                >
                  Super Agent
                </SelectItem>
              )}
              {selectableUserTypes.includes("sub_agents") && (
                <SelectItem
                  className="text-sm text-light-gray"
                  value="sub_agent"
                >
                  Sub Agent
                </SelectItem>
              )}
            </SelectContent>
            {selectedUsers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedUsers.map((user) => (
                  <AnimatePresence key={user}>
                    <motion.div
                      key={user}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="bg-verido-card-green text-verido-black px-2 py-1 rounded-2xl text-xs flex items-center gap-2 cursor-pointer"
                    >
                      {user}
                      <X
                        onClick={() => {
                          setSelectedUsers((prevUsers) =>
                            prevUsers.filter((prevUser) => prevUser !== user)
                          );
                        }}
                        className="w-4 h-4"
                      />
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>
            )}
            {selectedUsers.length > 0 && (
              <div className="mt-4 gap-3  max-h-[300px] overflow-y-auto flex flex-wrap items-center">
                {selectedUsers.map((role) => (
                  <BroadcastUserDropdown
                    key={role}
                    role={role}
                    selectedUserIds={selectedUserIds}
                    onChange={(userIds) => {
                      setSelectedUserIds(userIds);
                      setValue("users", userIds.length > 0 ? userIds : "all");
                    }}
                  />
                ))}
              </div>
            )}
          </Select>
        </div>
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="deliveryChannel" className="text-[14px] font-medium">
            Delivery Channel
          </Label>
          <Select
            onValueChange={(value) => {
              setValue("channels", value);
            }}
            value={watch("channels")}
          >
            <SelectTrigger className="w-full text-light-gray">
              <SelectValue placeholder="Select Delivery Channel" />
            </SelectTrigger>
            <SelectContent>
              {deliveryChannels.map((channel) => (
                <SelectItem
                  key={channel.value}
                  className="text-sm text-light-gray"
                  value={channel.value}
                >
                  {channel.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="title" className="text-[14px] font-medium">
            Title
          </Label>
          <Input
            placeholder="Enter Title"
            id="title"
            {...register("title", {
              required: "Title is required",
            })}
            className={`border ${
              errors.title ? "border-red-500" : "border-verido-border"
            } px-3 py-2 focus:outline-none`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="content" className="text-[14px] font-medium">
            Content
          </Label>
          <Textarea
            placeholder="Enter content"
            id="content"
            {...register("content", { required: "Content is required" })}
            className={`border ${
              errors.content ? "border-red-500" : "border-verido-border"
            } px-3 py-2 focus:outline-none resize-none`}
          />
          {errors.content && (
            <p className="text-red-500 text-xs">{errors.content.message}</p>
          )}
        </div>
        {showPreview && imagePreviewUrl ? (
          <div className="flex flex-col h-[170px] gap-4 items-center justify-center border border-verido-border p-3 rounded-lg relative">
            <Image
              className="w-[80%] h-[80%] object-cover rounded-lg"
              src={imagePreviewUrl}
              alt="Preview"
              width={500}
              height={500}
              quality={100}
              priority
            />
            <div>
              <X
                onClick={() => {
                  setShowPreview(false);
                }}
                className="w-4 h-4 cursor-pointer absolute top-2 right-2"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center border border-verido-border p-4 rounded-lg">
            <Label
              htmlFor="file-upload"
              className="flex items-center gap-2 flex-col cursor-pointer"
            >
              <Image
                src="/assets/icons/cloudUpload.svg"
                alt="image"
                width={20}
                height={20}
              />
              <p className="text-[14px] font-bold text-verido-black text-center">
                {imageFile
                  ? `You have selected ${imageFile.name}`
                  : "Select file to upload"}
              </p>
            </Label>
            <p className="text-[11px] text-light-gray text-center">
              Type of file to upload: JPG, PNG, PDF
            </p>
            <Input
              type="file"
              id="file-upload"
              {...register("metadata.fileUploadURL", {
                onChange: handleFileSelect,
              })}
              className="hidden"
              accept="image/*,video/mp4,video/quicktime,video/x-msvideo,video/x-matroska"
            />
            <Button
              type="button"
              className="cursor-pointer inline-flex items-center justify-center text-gray-500 text-[11px] p-2 h-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md"
              onClick={handleFileUpload}
            >
              Upload File
            </Button>
          </div>
        )}
        {showProgress && (
          <div className="flex flex-col gap-2 border border-verido-border p-4 rounded-lg relative">
            {uploadProgress === 100 ? (
              <Trash
                className="w-4 h-4 cursor-pointer absolute top-2 right-2"
                onClick={() => {
                  setImageFile(null);
                  setImagePreviewUrl(null);
                  setImageResponseUrl("");
                  setShowProgress(false);
                  setUploadProgress(0);
                  const fileInput = document.getElementById(
                    "file-upload"
                  ) as HTMLInputElement;
                  if (fileInput) {
                    fileInput.value = "";
                  }
                }}
              />
            ) : null}
            <div className="flex flex-col items-start justify-between">
              <p className="text-[10px] font-bold text-verido-black">
                {imageFile?.name}
              </p>
              <p className="text-[10px] text-light-gray">
                {convertBytesToMb(imageFile?.size ?? 0)} MB
              </p>
            </div>
            {uploadProgress < 100 ? (
              <>
                <div className="flex items-center justify-between">
                  <Progress className="h-1 " value={uploadProgress} />
                  <p className="text-[10px] text-light-gray">
                    {uploadProgress.toFixed(0)}%
                  </p>
                </div>
                <p className="text-[10px] text-yellow-500">File uploading...</p>
              </>
            ) : (
              <p className="text-[10px] text-green-500 font-bold">File ready</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <Button
            type="button"
            variant={"outline"}
            onClick={handlePreview}
            size={"sm"}
            className={`border-verido-green text-verido-green flex-1 ${
              !imageFile ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!imageFile}
          >
            Preview
          </Button>
          <Button
            type="submit"
            className={` bg-button-disabled flex-1 ${
              isSubmitting || !isValid
                ? "bg-button-disabled text-verido-nuetral"
                : "bg-verido-green text-verido-white"
            } `}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? <LoadingSpinner /> : "Send"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateBroadcastForm;
