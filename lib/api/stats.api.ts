import { VeridoAPI } from "./axios";

export const fetchDashboardStats = async () => {
  const { data } = await VeridoAPI.get("/dashboard/stat");

  return data.data;
};
export const getnumberOfUsersLineGraph = async (
  year: string,
  month?: string
) => {
  let url = `/admin/get-number-of-users?year=${year}`;
  if (month) {
    url += `&month=${month}`;
  }
  const { data } = await VeridoAPI.get(url);
  return data;
};

export const getUserHierarchyCount = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/admins/users/hierarchy-count", {
    params,
  });
  return data;
};
export const getMetrics = async (parentId?: string) => {
  const { data } = await VeridoAPI.get("/admins/metrics", {
    params: {
      parentId,
    },
  });
  return data;
};
