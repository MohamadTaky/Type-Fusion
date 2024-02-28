import request from "@/libraries/axios/axiosInterceptor";
import { useQuery } from "@tanstack/react-query";
import useUserAuthQuery from "../auth/useUserAuthQuery.hook";

export default function useTestsQuery() {
  const { data: userAuth } = useUserAuthQuery();
  const query = useQuery(["tests"], getTests, {
    select: (data) => data.data,
    enabled: !!userAuth,
    suspense: true,
  });

  return query;
}

async function getTests() {
  return request({ url: "/api/data", withCredentials: true });
}
