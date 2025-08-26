import { useMutation } from "@tanstack/react-query";
import { createBroadcast } from "../../api/braodcast.api";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ICreateBroadcastPayload } from "../../api/braodcast.api";
import { uploadImage } from "../../api/braodcast.api";

const useBroadcast = () => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();

  const createBroadcastMutation = useMutation({
    mutationFn: async (payload: ICreateBroadcastPayload) => {
      const response = await createBroadcast(payload);
      return response;
    },
    onSuccess: (data) => {
      showToast(
        "Success!",
        "Broadcast has been created successfully.",
        "success"
      );
      queryClient.invalidateQueries({
        queryKey: ["notification-broadcast"],
      });
    },
    onError: (error) => {
      let errDetail = error.message;
      if (error instanceof AxiosError) {
        errDetail = error?.response?.data?.message;
        if (Array.isArray(errDetail)) {
          errDetail = errDetail[0];
        }
      }
      showToast("Something went wrong", errDetail, "error");
    },
  });
  const uploadImageMutation = useMutation({
    mutationFn: async (pic: File) => {
      const response = await uploadImage(pic);
      return response;
    },
  });

  return {
    createBroadcastMutation,
    uploadImageMutation,
  };
};

export default useBroadcast;
