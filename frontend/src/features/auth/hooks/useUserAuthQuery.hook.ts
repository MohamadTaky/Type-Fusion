import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useUserAuthQuery() {
	return useQuery(["user"], getUserAuth, {
		staleTime: Infinity,
		cacheTime: Infinity,
		select: data => data.data,
		suspense: true
	});
}

function getUserAuth() {
	return axios.get("/api/user", { withCredentials: true });
}
