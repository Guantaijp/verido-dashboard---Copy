// columnsCountry.ts
import { ColumnDef } from "@tanstack/react-table";
import { ICountry } from "../../types/index"; // Adjust the path to where your types are defined

export const columnsCountry: ColumnDef<ICountry>[] = [
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "partners",
    header: "Partners",
  },
  {
    accessorKey: "consultants",
    header: "Consultants",
  },
  {
    accessorKey: "businesses",
    header: "Businesses",
  },
  {
    accessorKey: "subscribers",
    header: "Subscribers",
  },
];
