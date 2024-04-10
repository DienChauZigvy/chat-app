import { UserProfile } from "../types";
import axiosClient from "./axiosClient";

export const userAPI = {
  getCurrentUser(): Promise<UserProfile> {
    const url = "/users/current-user";

    return axiosClient.get(url);
  },
};
