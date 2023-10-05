import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useUserAuthQuery from "src/features/auth/hooks/useUserAuthQuery.hook";
import useStatsPersistedStore from "./useStatsPersistedStore";
import request from "src/libraries/axios/axiosInterceptor";

export default function useTestsQuery() {
	const { data: userAuth, isLoading } = useUserAuthQuery();
	return useQuery(["tests", userAuth], getTests, {
		enabled: !isLoading,
		select: data => data.data,
		suspense: true,
	});
}

async function getTests({ queryKey }: QueryFunctionContext) {
	if (queryKey[1]) return request({ url: "/api/data", withCredentials: true });
	else return Promise.resolve({ data: useStatsPersistedStore.getState() });
}
