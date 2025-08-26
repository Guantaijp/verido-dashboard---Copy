"use client";

import { ColumnDef } from "@tanstack/react-table";

const getStatusStyles = (status: boolean | string) => {
  if (status) {
    return "bg-active-green  text-verido-green";
  } else {
    return "bg-light-danger text-danger ";
  }
};

export const columnsNewBusiness: ColumnDef<any>[] = [
  {
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: "Enterprise Name",
  },
  {
    accessorFn: (row) =>
      row.digitalEntrepreneur && row.digitalEntrepreneur.name
        ? row.digitalEntrepreneur.name
        : "No Upline",
    id: "digitalEntrepreneur",
    header: "Upline",
  },
  {
    accessorFn: (row) =>
      row.business_country ? row?.business_country : "No Country",
    id: "business_country",
    header: "Country",
  },
  {
    accessorKey: "dateJoined",
    header: "Date Joined",
  },
  {
    accessorFn: (row) => (row.suspended ? "Inactive" : "Active"),
    id: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<boolean>();
      return (
        <span
          className={`px-6 py-1 rounded-lg text-xs font-medium ${getStatusStyles(
            status
          )}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorFn: (row) =>
      new Date(row.subscription_status?.expires).toLocaleDateString(),
    id: "expires",
    header: "Expires",
  },
];
