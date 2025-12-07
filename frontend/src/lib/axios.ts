import axios from "axios";
import { setAuth } from "./features/auth/authSlice";
import { store } from "./store";



const codeVerseApi = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

codeVerseApi.interceptors.response.use(
  response => response,
  async error => {
    const authData = store.getState();

    const originalRequest = error.config;

    if ((error?.response?.status === 401) || (error?.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // const refreshToken = localStorage.getItem("refreshToken");
        const refreshToken = authData.auth.refreshToken;
        if (!refreshToken) throw new Error("Not Authenticated");

        const response = await codeVerseApi.post(`/auth/refresh-token`, {
          refreshToken
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken, user } = response.data.data;

        // localStorage.setItem("accessToken", newAccessToken);
        // localStorage.setItem("refreshToken", newRefreshToken);
        store.dispatch(setAuth({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          user
        }));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return codeVerseApi(originalRequest);
      } catch (err) {
        console.log(err);

      }
    }
  }
);

export { codeVerseApi };