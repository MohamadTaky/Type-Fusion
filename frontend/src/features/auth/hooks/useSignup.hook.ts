import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import request from "~/libraries/axios/axiosInterceptor";

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
			request({ url: "/api/user/signup", data: { email, password }, method: "post" }),
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
