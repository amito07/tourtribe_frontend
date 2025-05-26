"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthRedirect() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  return { isAuthenticated, isLoading };
}

export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const checkAuthAndRedirect = () => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
      return false;
    }
    return isAuthenticated;
  };

  return { isAuthenticated, isLoading, checkAuthAndRedirect };
}
