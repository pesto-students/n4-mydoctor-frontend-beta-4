import axios from "axios";

const getAuthToken = () => {
	return localStorage.getItem("auth-token");
};

export const setAuthToken = (token) => {
	localStorage.setItem("auth-token", token);
};

const instance = axios.create({
	baseURL: `http://localhost:4000`,
});
instance.interceptors.request.use((config) => {
	if (!config.headers.Authorization) {
		config.headers.Authorization = `Bearer ${getAuthToken()}`;
	}
	config.headers.po = performance.now();
	return config;
});
instance.interceptors.response.use(
	async (response) => {
		if (response.data.data && response.data.data.token) {
			setAuthToken(response.data.data.token);
		}
		return response;
	},
	(error) => {
		if (!error.response) {
			return Promise.reject({
				message:
					"We are facing some technical difficulty, please try after some time.",
				statusCode: 500,
				name: "Server Error",
			});
		}
		return Promise.reject({
			status: error.response.status,
			data: error.response.data,
		});
	}
);
export default instance;
export { getAuthToken };
