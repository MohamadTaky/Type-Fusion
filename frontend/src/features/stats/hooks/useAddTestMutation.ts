import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useAddTestMutation() {
	const client = useQueryClient();
	return useMutation(addTest, { onSuccess: () => client.invalidateQueries(["tests"]) });
}

function addTest({ test }: { test: any }) {
	return axios.post(`/api/data`, test);
}
