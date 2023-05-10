import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

if (!import.meta.env.DEV) axios.defaults.baseURL = import.meta.env.API;

export default function useAddTestMutation() {
	const client = useQueryClient();
	return useMutation(addTest, { onSuccess: () => client.invalidateQueries(["tests"]) });
}

function addTest({ test }: { test: any }) {
	return axios.post(`/api/data`, test);
}
