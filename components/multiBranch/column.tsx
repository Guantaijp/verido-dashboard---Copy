import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

const getStatusStyles = (status: boolean | string) => {
  if (status) {
    return "bg-active-gerren text-verido-green";
  } else {
    return "bg-light-danger text-danger ";
  }
};

export const columnsMultibranch: ColumnDef<any>[] = [
  // {
  //   accessorKey: "",
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  // },
  {
    accessorFn: (row) => row.name,
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email address",
  },
  {
    accessorKey: "referenceId",
    header: "User ID",
  },

  {
    accessorKey: "createdAt",
    header: "Date Joined",
    cell: ({ getValue }) => {
      const date = getValue<string>();
      return new Date(date).toLocaleDateString();
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<boolean | string>();
      return (
        <span
          className={`px-6 py-1 rounded-lg text-xs font-medium ${getStatusStyles(
            status
          )}`}
        >
          {status ? "Active" : "Suspended"}
        </span>
      );
    },
  },
];
