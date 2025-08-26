import { ColumnDef } from "@tanstack/react-table";
import { PermissionIdData } from "./SpecificUserTable";
import { formatDate } from "@/utils";

export const columnsSpecificPermission: ColumnDef<PermissionIdData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "_id",
    header: "User ID",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Modified",
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt;
      return formatDate(updatedAt);
    },
  },
];

export const transformPermissionData = (
  data: Record<string, { role: string; noOfUsers: number }>
) => {
  return Object.values(data);
};
