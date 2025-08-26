import { IVideo } from "../../types/index";
import { ColumnDef } from "@tanstack/react-table";


export const columnsVideo: ColumnDef<IVideo>[] = [
  {
    accessorKey: "title",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "vidoeID",
    header: "Video Url",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: "Pending",
  },
];
