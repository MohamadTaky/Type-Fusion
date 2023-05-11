import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const client = axios.create({ baseURL: import.meta.env.API ?? "" });

console.log(import.meta.env.MODE);
console.log(import.meta.env.VITE_API);
console.log(import.meta.env);


export default function request({ ...options }: AxiosRequestConfig): Promise<AxiosResponse> {
	const onError = (error: AxiosError) => error;
	const onSuccess = (response: AxiosResponse) => response;
	return client(options).then(onSuccess).catch(onError) as Promise<AxiosResponse>;
}
