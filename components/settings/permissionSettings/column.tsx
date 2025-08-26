import { ColumnDef } from "@tanstack/react-table";

// Define the structure of our permission data
export interface PermissionData {
  role: string;
  noOfUsers: number;
}

export const columnsPermission: ColumnDef<PermissionData>[] = [
  {
    accessorKey: "role",
    header: "Type",
    cell: ({ row }) => {
      const role = row.original.role;
      return role.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: () => "All permissions in the organization",
  },
  {
    accessorKey: "noOfUsers",
    header: "Number of Users",
  },
];

export const transformPermissionData = (data: Record<string, { role: string; noOfUsers: number }>) => {
  return Object.values(data);
};

