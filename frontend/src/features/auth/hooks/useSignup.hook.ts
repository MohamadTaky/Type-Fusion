import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

interface IProps {
	email: string;
	password: string;
	confirmedPassword: string;
}

export default function useSignup() {
	const client = useQueryClient();
	return useMutation<[PromiseSettledResult<AxiosResponse>, PromiseSettledResult<any>], Error, IProps>(
		signup,
		{ onSuccess: () => client.invalidateQueries(["user"]), mutationKey: ["signup"] }
	);
}

async function signup({ email, password, confirmedPassword }: IProps) {
	if (!email) throw Error("please enter your email");
	if (!password) throw Error("please enter your password");
	if (!confirmedPassword) throw Error("please confirm your password");
	if (password != confirmedPassword) throw Error("passwords does not match");
	try {
		const results = await Promise.allSettled([
			axios.post("/api/user/signup", { email, password }),
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
