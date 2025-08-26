import { VeridoAPI } from "./axios";
export const getNotifications = async () => {
  const { data } = await VeridoAPI.get("/notifications/inapp?sort=-createdAt");
  return data;
};

