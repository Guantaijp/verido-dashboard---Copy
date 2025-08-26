import { ColumnDef } from "@tanstack/react-table";
import { Consultant } from "../../../types/index";
import { Checkbox } from "@/components/ui/checkbox";
const getStatusStyles = (status: boolean | string) => {
  if (status) {
    return "bg-active-green  text-verido-green";
  } else {
    return "bg-light-danger text-danger ";
  }
};

export const columnsConsultant: ColumnDef<Consultant>[] = [
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
    accessorFn: (row) => row.name || row.username,
    header: "Enterprise Name",
  },
  {
    accessorKey: "referenceId",
    header: "Super Agent ID",
  },
  {
    accessorKey: "createdBy.name",
    header: "created By",
  },
  {
    accessorFn: (row) => row.superAgentDetails.company?.referenceId,
    id: "upline",
    header: "Upline",
  },
  {
    accessorKey: "email",
    header: "Email",
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
