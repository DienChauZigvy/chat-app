import axiosClient from "./axiosClient";
import { LoginPayload, LoginResponse } from "../types/auth";

export const authApi = {
  login(data: LoginPayload): Promise<LoginResponse> {
    const url = "/auth/login";

    return axiosClient.post(url, data);
  },
  refreshToken(): Promise<LoginResponse> {
    const url = "/auth/refresh";

    let refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("Cannot get refreshToken");
    }

    const headers = { Authorization: `Bearer ${refreshToken}` };

    console.log({ headers });
    return axiosClient.post(url, { headers });
  },
  logout() {
    const url = "/auth/logout";
    return axiosClient.post(url);
  },
};
