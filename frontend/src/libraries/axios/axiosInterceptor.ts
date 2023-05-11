import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const client = axios.create({ baseURL: import.meta.env.VITE_API ?? "" });

export default function request({ ...options }: AxiosRequestConfig): Promise<AxiosResponse> {
	return client(options) as Promise<AxiosResponse>;
}
