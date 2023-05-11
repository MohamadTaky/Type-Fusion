import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "~/libraries/axios/axiosInterceptor";

export default function useAddTestMutation() {
	const client = useQueryClient();
	return useMutation(addTest, { onSuccess: () => client.invalidateQueries(["tests"]) });
}

function addTest({ test }: { test: any }) {
	return request({ url: "api/data", data: test });
}
