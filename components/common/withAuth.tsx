'use client'
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { isLoggedIn } from "../../lib/react-query/mutations/useAuth";

export default function withAuth(
  WrappedComponent: React.ComponentType) {
  return function WithAuth(props: any) {

    useEffect(() => {
      if (!isLoggedIn()) {
        redirect("/signin");
      }
    }, []);

    if (typeof window !== "undefined" && !isLoggedIn()) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };
}
