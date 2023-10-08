import { useQuery } from "@tanstack/react-query";
import request from "@/libraries/axios/axiosInterceptor";

export default function useLeaderboard() {
  return useQuery(["leaderboard"], getLeaderboard, {
    select: (data) => data.data,
    suspense: true,
    refetchInterval: 5000,
  });
}

function getLeaderboard() {
  return request({ url: "api/user/leaderboard" });
}
