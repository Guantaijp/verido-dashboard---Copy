"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { roleHierarchy } from "@/constant";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ICreateVideo } from "../../types/index";
import useVideos from "../../lib/react-query/mutations/useVideo";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useAuthenticatedUser } from "@/context/AuthContext";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import BroadcastUserDropdown from "../settings/broadcast/BroadcastUserDropdown";
import { extractYouTubeVideoId } from "@/utils";
import useDebounce from "@/lib/hooks/useDebounce";



const CreateVideo = () => {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [videoPreviewType, setVideoPreviewType] = useState<
    | { type: "youtube"; id: string }
    | { type: "vimeo"; id: string }
    | { type: "direct"; src: string }
    | null
  >(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);
  const [invalidPreview, setInvalidPreview] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, errors, isValid },
  } = useForm<ICreateVideo>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      videoURL: "",
      category: "",
      groups: [],
      users: [],
    },
  });

  const { createVideoMutation } = useVideos();
  const { currentUser, hasPermission } = useAuthenticatedUser();
  const showToast = useCustomToast();
  const videoURL = watch("videoURL");
  const debouncedVideoURL = useDebounce(videoURL, 800);

  const selectableUserTypes = currentUser?.role
    ? roleHierarchy[currentUser.role] || []
    : [];

  useEffect(() => {
    if (debouncedVideoURL && debouncedVideoURL.trim()) {
      const videoId = extractYouTubeVideoId(debouncedVideoURL);
      if (videoId && videoId.length === 11) {
        setYoutubeVideoId(videoId);
        setShowPreview(true);
        setInvalidPreview(false);
      } else {
        setYoutubeVideoId(null);
        setShowPreview(true);
        setInvalidPreview(true);
      }
    } else {
      setYoutubeVideoId(null);
      setShowPreview(false);
      setInvalidPreview(false);
    }
  }, [debouncedVideoURL]);

  const onSubmit = async (data: ICreateVideo) => {
    if (hasPermission("video.create")) {
      if (!youtubeVideoId) {
        showToast(
          "Invalid Video URL",
          "Please enter a valid YouTube video URL",
          "error"
        );
        return;
      }

      const payload = {
        ...data,
        users: selectedUserIds.length > 0 ? selectedUserIds : [],
        groups: selectedUsers,
      };
      await createVideoMutation.mutateAsync(payload);
      reset();
      setSelectedUsers([]);
      setSelectedUserIds([]);
      setYoutubeVideoId(null);
      setShowPreview(false);
      setOpen(false);
    } else {
      showToast(
        "Access Denied",
        "You do not have permission to create videos",
        "error"
      );
    }
  };

  return (
    <>
      {hasPermission("video.create") && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size={"sm"}
              className={`bg-verido-green text-verido-white`}
              variant="outline"
            >
              Add Video
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-[20px] font-bold">
                  Add Video
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="title" className="text-[11px]">
                    Title:
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter title"
                    {...register("title", { required: "Title is required" })}
                    className={`border ${
                      errors.title ? "border-red-500" : "border-verido-border"
                    } px-3 py-2 focus:outline-none`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="category" className="text-[11px]">
                    Category:
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      setValue("category", value);
                    }}
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
                    <SelectTrigger
                      id="category"
                      className={`w-full border ${
                        errors.category
                          ? "border-red-500"
                          : "border-verido-border"
                      } px-3 py-2 focus:outline-none`}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="other">Setup</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-red-500 text-xs">
                      {errors.category.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="videoURL" className="text-[11px]">
                    Video URL:
                  </Label>
                  <Input
                    placeholder="Enter YouTube video URL"
                    id="videoId"
                    {...register("videoURL", {
                      required: "Video URL is required",
                    })}
                    className={`border ${
                      errors.videoURL
                        ? "border-red-500"
                        : "border-verido-border"
                    } px-3 py-2 focus:outline-none`}
                  />
                  {errors.videoURL && (
                    <p className="text-red-500 text-xs">
                      {errors.videoURL.message}
                    </p>
                  )}
                </div>

                {/* YouTube Preview */}
                <AnimatePresence>
                  {showPreview && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.75 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.3 }}
                      key={youtubeVideoId || "invalid-preview"}
                      className="flex flex-col gap-2 border border-verido-border p-4 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-verido-black">
                          Video Preview
                        </p>
                        <X
                          onClick={() => {
                            setShowPreview(false);
                            setYoutubeVideoId(null);
                            setInvalidPreview(false);
                          }}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </div>
                      <div className="relative w-full h-48 flex items-center justify-center">
                        {invalidPreview ? (
                          <span className="text-verido-black text-center">
                            Cannot show preview for this link
                          </span>
                        ) : (
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&controls=1&modestbranding=1&rel=0`}
                            title="YouTube video preview"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg w-full h-full"
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="userType" className="text-[11px]">
                    User Type:
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
                        <SelectItem
                          className="text-sm text-light-gray"
                          value="partner"
                        >
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
                  </Select>
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
                                  prevUsers.filter(
                                    (prevUser) => prevUser !== user
                                  )
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
                    <div className="mt-4 gap-3 max-h-[300px] overflow-y-auto flex flex-wrap items-center">
                      {selectedUsers.map((role) => (
                        <BroadcastUserDropdown
                          key={role}
                          role={role}
                          selectedUserIds={selectedUserIds}
                          onChange={(userIds) => {
                            setSelectedUserIds(userIds);
                            setValue("users", userIds);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  className={`w-full bg-button-disabled ${
                    isSubmitting || !isValid
                      ? "bg-button-disabled text-verido-nuetral"
                      : "bg-verido-green text-verido-white"
                  } `}
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? <LoadingSpinner /> : "Add Video"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CreateVideo;
