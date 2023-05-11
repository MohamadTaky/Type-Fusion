import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import axios from "axios";
import useUserAuthQuery from "~/features/auth/hooks/useUserAuthQuery.hook";
import useStatsPersistedStore from "./useStatsPersistedStore";

export default function useTestsQuery() {
	const { data: userAuth, isLoading } = useUserAuthQuery();
	return useQuery(["tests", userAuth], getTests, {
		enabled: !isLoading,
		select: data => data.data,
		suspense: true,
	});
}

async function getTests({ queryKey }: QueryFunctionContext) {
	if (queryKey[1]) return axios.get(`/api/data`);
	else return Promise.resolve({ data: useStatsPersistedStore.getState() });
}
