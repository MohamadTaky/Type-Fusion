import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/libraries/axios/axiosInterceptor";

export default function useEditUsernameMutation(successCallback: () => void) {
  const client = useQueryClient();
  return useMutation(editUsername, {
    onSuccess: () => {
      client.invalidateQueries(["user"]);
      successCallback();
    },
  });
}

function editUsername({ username }: { username: string }) {
  return request({ url: "api/user/editusername", method: "post", data: { username } });
}
