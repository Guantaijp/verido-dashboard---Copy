import { VeridoAPI } from "./axios";

export const getUserPermissionMetrics = async () => {
  const { data } = await VeridoAPI.get("/admin/permission-metrics-user");
  return data;
};
export const getAllPermissions = async () => {
  const { data } = await VeridoAPI.get("/admin/get-permissions");
  return data;
};
export const getPermissionByRole = async (role: string) => {
  const { data } = await VeridoAPI.get(
    `/get-list-of-user-for-specific-permission?role=${role}`
  );
  return data;
};
export const getSpecifiedUserPermission = async (userId: string) => {
  const { data } = await VeridoAPI.get(`/admin/get-user-permission/${userId}`);
  return data;
};
export const updateUserPermission = async (userId: string, addPermission: string[], removePermission: string[]) => {
  const { data } = await VeridoAPI.patch(
    `/admin/update-user-permission/${userId}`,
    { addPermission, removePermission }
  );
  return data;
};
