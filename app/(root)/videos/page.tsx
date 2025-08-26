import React from "react";
import type { Metadata } from "next";
import VideoPage from "./VideoPage";

export const metadata: Metadata = {
  title: "Videos - Verido",
  description: "Manage your videos in Verido",
};

const Videos = () => {
  return (
    <>
      <VideoPage />
    </>
  );
};

export default Videos;
