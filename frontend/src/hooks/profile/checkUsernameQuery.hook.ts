import request from "@/libraries/axios/axiosInterceptor";
import { useQuery } from "@tanstack/react-query";

export default function useCheckUsernameQuery(username: string) {
  return useQuery(
    ["checkUsername", username],
    ({ queryKey }) => {
      return request({ url: "api/user/checkusername", params: { username: queryKey[1] } });
    },
    { enabled: !!username && username.length > 7 && username.length < 16, select: (data) => data.data }
  );
}
