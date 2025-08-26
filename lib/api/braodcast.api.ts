import { VeridoAPI } from "./axios";

export interface ICreateBroadcastPayload {
  users: string | string[];
  groups: string[];
  title: string;
  channels: string;
  content: string;
  metadata: {
    fileUploadURL: string;
  };
}

export const getBroadcast = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/v2/notifications/broadcast" , {
    params
  });
  return data;
};

export const createBroadcast = async (payload: ICreateBroadcastPayload) => {
  const { data } = await VeridoAPI.post("/notifications/broadcast", payload);
  return data;
};
export const uploadImage = async (pic: File) => {
  const formData = new FormData();
  formData.append("pic", pic);

  const { data } = await VeridoAPI.post("/upload-image", formData);
  return data;
};

export const getBroadcastUsers = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/admins/search/all-users", { params });
  return data;
};
