"use client";
import React, { useState } from "react";
import { BroadcastTable } from "../settings/broadcast/BroadcastTable";
import { columnsBroadcast } from "../settings/broadcast/column";

import { useNotificationBroadcast } from "@/lib/react-query/query/useBroadcast";
import { AnimatePresence, motion } from "framer-motion";

const NotificationsSettings = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const { data, isLoading: isLoadingBroadcast } = useNotificationBroadcast({
    page,
    search: search ? search : undefined,
  });
  console.log(data)
  const broadcastData = data ?? [];
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="broadcast-table"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="p-3"
      >
        <BroadcastTable
          columns={columnsBroadcast}
          data={broadcastData?.data ?? []}
          isPending={isLoadingBroadcast}
          pagination={broadcastData}
          onPageChange={handlePageChange}
          onSearchChange={handleSearch}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationsSettings;
