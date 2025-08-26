"use client";
import { columnsVideo } from "@/components/video/column";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useVideos } from "@/lib/react-query/query/useVideo";
import { VideoTable } from "@/components/video/VideoTable";

const VideoPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: videoData, isPending } = useVideos({
    page,
    search: search ? search : undefined,
  });
  const pathname = usePathname();
  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleSearch = (searchValue: string) => setSearch(searchValue);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="text-sm text-verido-green p-2 lg:p-0">
          Home <span>/</span>{" "}
          <span className="text-gray-text">{pathname.substring(1)}</span>
        </div>

        <div className="bg-verido-white p-3 md:p-6 rounded-lg flex flex-col gap-6 min-h-[42rem]">
          <VideoTable
            data={videoData?.data ?? []}
            columns={columnsVideo}
            isPending={isPending}
            addVideo={true}
            onPageChange={handlePageChange}
            onSearchChange={handleSearch}
            pagination={videoData}
          />
        </div>
      </div>
    </>
  );
};

export default VideoPage;
