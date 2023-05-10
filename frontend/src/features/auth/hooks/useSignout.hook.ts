import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useSignout() {
	const client = useQueryClient();
	return useMutation(signout, { onSuccess: () => client.invalidateQueries(["user"]) });
}

async function signout() {
	return axios.post("/api/user/signout");
}
