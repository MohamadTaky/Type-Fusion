import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const client = axios.create({ baseURL: import.meta.env.VITE_API ?? "", withCredentials: true });

export default function request({ ...options }: AxiosRequestConfig): Promise<AxiosResponse> {
	return client(options) as Promise<AxiosResponse>;
}
