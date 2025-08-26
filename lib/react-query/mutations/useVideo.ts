import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ICreateVideo, IUpdateVideo } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import useCustomToast from "@/lib/hooks/useCustomToast";

import { createVideos, deleteVideo, updateVideos } from "@/lib/api/video.api";

const useVideos = () => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();

  const createVideoMutation = useMutation({
    mutationFn: async (payload: ICreateVideo) => {
      const response = await createVideos(payload);
      return response.response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Video has been added successfully.", "success");
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
    },
  });
   const deleteVideoMutation = useMutation({
     mutationFn: async (id: string) => {
       await deleteVideo(id);
     },
     onSuccess: () => {
       showToast(
         "Success!",
         "Video has been deleted successfully.",
         "success"
       );
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
     onSettled: () => {
       queryClient.invalidateQueries({ queryKey: ['videos'] });
     },
   });

   const editVideoMutation = useMutation({
     mutationFn: async (data: IUpdateVideo) => {
       const response = await updateVideos(data);
       return response.data;
     },
     onSuccess: (data) => {
       showToast("Success!", "Video has been updated successfully.", "success");
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
     onSettled: () => {
       queryClient.invalidateQueries({ queryKey: ["videos"] });
     },
   });

  return {
    createVideoMutation,
    editVideoMutation,
    deleteVideoMutation
  };
};

export default useVideos;
