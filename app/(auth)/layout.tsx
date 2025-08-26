import { AuthLayoutWrapper } from "../../components/auth/AuthLayoutWrapper";
import { QueryProvider } from "../QueryProvider";
import { ChakraProvider } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verido",
  description: "An App For Business Owners",
  icons: {
    icon: "/assets/icons/favicon.svg",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayoutWrapper>
      <ChakraProvider>
        <QueryProvider>{children}</QueryProvider>
      </ChakraProvider>
    </AuthLayoutWrapper>
  );
}
