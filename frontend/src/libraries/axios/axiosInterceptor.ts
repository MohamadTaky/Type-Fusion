import axios from "axios";

axios.interceptors.request.use(config => {
	config.baseURL = import.meta.env.VITE_API ?? "";
	return config;
})
