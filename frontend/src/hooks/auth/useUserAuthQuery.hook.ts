import { useQuery } from "@tanstack/react-query";
import request from "@/libraries/axios/axiosInterceptor";

export default function useUserAuthQuery() {
  return useQuery(["user"], getUserAuth, {
    staleTime: Infinity,
    cacheTime: Infinity,
    select: (data) => data.data,
    suspense: true,
  });
}

function getUserAuth() {
  return request({ url: "/api/user", withCredentials: true });
}
