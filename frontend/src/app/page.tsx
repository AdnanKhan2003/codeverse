"use client";
import Login from "@/components/Auth/Login/Login";
import ProjectsPage from "./projects/page";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAuthStatus, setAuth } from "@/lib/features/auth/authSlice";
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
  }, [isLoggedIn]);
  
  return null
}
