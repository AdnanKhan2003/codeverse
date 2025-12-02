"use client";

import { codeVerseApi } from "@/lib/axios";
import { getAuthStatus, logout, setAuth } from "@/lib/features/auth/authSlice";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getAuthStatus);
  const pathname = usePathname();

  useEffect(() => {
    const restoreAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken && !isLoggedIn) {
        try {
          const response = await codeVerseApi.get("/auth/check-auth", {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          const user = response.data;
          console.log("user", user);
          
          dispatch(setAuth({ accessToken, refreshToken, user }));
        } catch (err) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          dispatch(logout());
        }
      }
    };

    restoreAuth();
  }, [dispatch, isLoggedIn, pathname]);

  return (
    <>{children}</>
  )
}

export default AuthProvider