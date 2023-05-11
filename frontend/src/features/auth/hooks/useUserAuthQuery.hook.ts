import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import request from "~/libraries/axios/axiosInterceptor";

export default function useUserAuthQuery() {
	return useQuery(["user"], getUserAuth, {
		staleTime: Infinity,
		cacheTime: Infinity,
		select: data => data.data,
		suspense: true,
	});
}

function getUserAuth() {
	return request({ url: "/api/user", withCredentials: true });
	//return axios.get("/api/user", { withCredentials: true });
}
