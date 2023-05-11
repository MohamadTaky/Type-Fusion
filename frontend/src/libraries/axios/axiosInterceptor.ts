import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const client = axios.create({ baseURL: import.meta.env.VITE_API ?? "" });

export default function request({ ...options }: AxiosRequestConfig): Promise<AxiosResponse> {
	const onError = (error: AxiosError) => error;
	const onSuccess = (response: AxiosResponse) => response;
	return client(options).then(onSuccess).catch(onError) as Promise<AxiosResponse>;
}
