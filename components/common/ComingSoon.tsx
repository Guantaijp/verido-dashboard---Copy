import React from "react";
import { ClockIcon } from "lucide-react";

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="bg-verido-green/10 rounded-full p-6 mb-6">
        <ClockIcon className="text-verido-green" />
      </div>
      <h1 className="text-2xl font-bold text-verido-green mb-2">Coming Soon</h1>
      <p className="text-gray-text text-center max-w-xs">
        This feature is under development and will be available soon.
      </p>
    </div>
  );
};

export default ComingSoon;
