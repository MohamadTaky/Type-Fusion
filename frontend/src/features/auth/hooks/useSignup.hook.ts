import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import request from "src/libraries/axios/axiosInterceptor";

interface IProps {
	username: string;
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

async function signup({ username, email, password, confirmedPassword }: IProps) {
	if (!username) throw Error("please enter your username");
	if (!email) throw Error("please enter your email");
	if (!password) throw Error("please enter your password");
	if (!confirmedPassword) throw Error("please confirm your password");
	if (password != confirmedPassword) throw Error("passwords does not match");
	try {
		const results = await Promise.allSettled([
			request({ url: "/api/user/signup", data: { username, email, password }, method: "post" }),
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
