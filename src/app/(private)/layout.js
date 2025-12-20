"use client";

import { useFirebaseAuth } from "@/context/FirebaseAuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import PrivateHeader from "@/components/layout/PrivateHeader";

export default function PrivateLayout({ children }) {
  const { currentUser, loading } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace("/login");
    }
  }, [currentUser, loading, router]);

  if (loading || !currentUser) return null;

  return (
    <>
      <PrivateHeader />
      <main className="container py-4">{children}</main>
    </>
  );
}
