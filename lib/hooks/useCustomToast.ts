import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useCustomToast = () => {
  const toast = useToast();

  const showToast = useCallback(
    (title: string, description: string, status: "success" | "error") => {
      toast({
        title,
        description,
        status,
        isClosable: true,
        position: "top-right",
        variant: status === "success" ? "success" : "error",
        containerStyle: {
          background: status === "success" ? "#E6FFFA" : "#FFF5F5",
          border: `1px solid ${status === "success" ? "#38B2AC" : "#FC8181"}`,
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
    },
    [toast]
  );

  return showToast;
};

export default useCustomToast;
