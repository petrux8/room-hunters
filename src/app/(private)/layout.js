"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateLayout({ children }) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) router.replace("/login");
  }, [currentUser, loading, router]);

  if (loading || !currentUser) return null;

  return (
    <>
      <main>{children}</main>
    </>
  );
}
