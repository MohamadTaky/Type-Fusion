import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/libraries/axios/axiosInterceptor";

export default function useSignout() {
  const client = useQueryClient();
  return useMutation(signout, { onSuccess: () => client.invalidateQueries(["user"]) });
}

async function signout() {
  return request({ url: "/api/user/signout", method: "post" });
}
