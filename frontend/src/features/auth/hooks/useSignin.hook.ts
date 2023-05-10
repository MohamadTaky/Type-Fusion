import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

interface IProps {
	email: string;
	password: string;
}

export default function useSingin() {
	const client = useQueryClient();
	return useMutation<[PromiseSettledResult<AxiosResponse>, PromiseSettledResult<any>], Error, IProps>(
		signin,
		{ onSuccess: () => client.invalidateQueries(["user"]), mutationKey: ["signin"] }
	);
}

async function signin({ email, password }: IProps) {
	if (!email) throw Error("please enter your email");
	if (!password) throw Error("please enter your password");
	try {
		const results = await Promise.allSettled([
			axios.post("/api/user/signin", { email, password }, { withCredentials: true }),
			new Promise(resolve => setTimeout(resolve, 1500)),
		]);
		results.forEach(result => {
			if (result.status === "rejected") throw result.reason;
		});
		return results;
	} catch (error) {
		if (error instanceof AxiosError) throw Error(error.response?.data.message);
		throw Error("an error occured");
	}
}
