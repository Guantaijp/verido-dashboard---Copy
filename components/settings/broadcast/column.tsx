import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils";

const getBackround = (status: string) => {
  switch (status.toLowerCase()) {
    case "sent":
      return "bg-active-green text-verido-green  ";
    case "draft":
      return "bg-verido-card-blue text-verido-blue-2";
    case "scheduled":
      return "bg-verido-card-orange text-verido-orange";

    default:
      return "";
  }
};

export const columnsBroadcast: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "groups",
    header: "Audience",
    cell: ({ row }) => {
      const users = row.original.groups;
      return users.map((user: string) => (
        <span key={user} className="mr-2">
          {user
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </span>
      ));
    },
  },
  {
    accessorKey: "channels",
    header: "Delivery Channel",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Modified",
    cell: ({ row }) => {
      const timeStamp = row.original.updatedAt;
      return formatDate(timeStamp);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div
          className={`${getBackround(
            status
          )} flex items-center justify-center p-2 rounded-2xl w-[84px] h-[24px] text-center text-[12px] font-medium`}
        >
          {status}
        </div>
      );
    },
  },
];
