import React from "react";
import Image from "next/image";
import { IAgentCard } from "@/types";
import { Phone, Copy } from "lucide-react";
import useCustomToast from "@/lib/hooks/useCustomToast";

const AgentCard = ({ agent }: { agent: IAgentCard }) => {
  const showToast = useCustomToast();
  const handleCopy = (phoneNumber?: string) => {
    if (phoneNumber) {
      navigator.clipboard.writeText(phoneNumber);
      showToast("Success", "Phone number copied!", "success");
    }
  };

  return (
    <div className="border-[1.5px] rounded-[20px] p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm">Agent:</p>
        <p className="font-medium w-fit text-xs">{agent?.name}</p>
        <Image
          src={agent?.photoUrl || "/assets/icons/flag.svg"}
          alt={`${agent?.country} Flag`}
          width={12}
          height={12}
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm">Amount left:</p>
        <p className="font-medium w-fit text-sm">
          {agent?.totalQuantity} {agent?.unit}
        </p>
      </div>
      <p className="text-xs text-gray-400">{agent?.country}</p>

      <div className="flex items-center justify-between gap-2 mt-2">
        <p className="text-xs">{agent?.phoneNumber}</p>
        <Copy
          className="w-4 h-4 text-gray-500 cursor-pointer"
          onClick={() => handleCopy(agent?.phoneNumber)}
        />
      </div>
    </div>
  );
};

export default AgentCard;
