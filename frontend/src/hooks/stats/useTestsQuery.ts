import request from "@/libraries/axios/axiosInterceptor";
import { useQuery } from "@tanstack/react-query";

export default function useTestsQuery() {
  return useQuery(["tests"], getTests, {
    select: (data) => data.data,
    suspense: true,
  });
}

async function getTests() {
  return request({ url: "/api/data", withCredentials: true });
}
