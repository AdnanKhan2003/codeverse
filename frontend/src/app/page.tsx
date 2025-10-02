"use client";
import Login from "@/components/Auth/Login/Login";
import ProjectsPage from "./projects/page";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAuthStatus, setAuth } from "@/lib/features/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector(getAuthStatus);

  console.log("wwwww", isLoggedIn);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      dispatch(
        setAuth({
          accessToken,
          refreshToken
        })
      )
    }

    if (accessToken && refreshToken) {
      router.replace("/projects");
    } else {
      router.replace("/login");
    }
  }, []);
  
  return null
}
