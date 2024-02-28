import request from "@/libraries/axios/axiosInterceptor";
import { useQuery } from "@tanstack/react-query";
import useUserAuthQuery from "../auth/useUserAuthQuery.hook";
import useStatsPersistedStore from "./useStatsPersistedStore";

export default function useTestsQuery() {
  const { data: userAuth } = useUserAuthQuery();
  const store = useStatsPersistedStore();
  const query = useQuery(["tests"], getTests, {
    select: (data) => data.data,
    enabled: !!userAuth,
    suspense: true,
  });

  return query.data ?? store;
}

async function getTests() {
  return request({ url: "/api/data", withCredentials: true });
}
