"use client";
import { useSelector } from "react-redux";
import { getAuthStatus } from "@/lib/features/auth/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const isLoggedIn = useSelector(getAuthStatus);
  const router = useRouter();

  console.log("wwwww", isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/projects");
    } else {
      router.replace("/login");
    }
    // }, [isLoggedIn]);
  }, [isLoggedIn, router]);

  return null
}
