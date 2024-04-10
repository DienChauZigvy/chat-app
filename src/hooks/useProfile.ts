import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { UserProfile } from "../types";
import { userAPI } from "../api";

type UseProfileQueryOptions = Omit<
  UseQueryOptions<UserProfile>,
  "queryKey" | "queryFn"
>;

export const useProfile = (options?: UseProfileQueryOptions) => {
  return useQuery<UserProfile>({
    ...options,
    queryKey: ["profile"],
    queryFn: userAPI.getCurrentUser,
  });
};
