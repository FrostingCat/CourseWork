import axios, {AxiosResponse} from "axios"

const baseUrl = "http://127.0.0.1:8000"
const usersPrefix = "users"
export const salt = "$2b$10$AAOFrjbRj8B5t6JVkUWNdu"

const axiosInstance = axios.create({
	baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(config => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers['Authorization'] = token;
	}
	return config;
}, error => {
	return Promise.reject(error);
});


export const getUserInfo = async (): Promise<AxiosResponse<userRetAuthSchema>> => {
	return await axios.get(baseUrl + `/${usersPrefix}/info`)
}

export const checkCodeUser = async (
	email: string
): Promise<AxiosResponse<ApiCodeDataType>> => {
	return await axios.post(
		baseUrl + `/${usersPrefix}/validate_email`, {
			e_mail: email
		}
	)
}

export const createUser = async (
	firstName: string,
	lastName: string,
	email: string,
	password: string,
): Promise<AxiosResponse<ApiTokenDataType>> => {
	return await axios.post(
		baseUrl + `/${usersPrefix}/register`, {
			name: firstName,
			surname: lastName,
			e_mail: email,
			hash_password: password
		}
	)
}

export const authorizeUser = async (
	email: string,
	password: string,
): Promise<AxiosResponse<ApiTokenDataType>> => {
	return await axios.post(
		baseUrl + `/${usersPrefix}/authorize`, {
			e_mail: email,
			hash_password: password
		}
	)
}

export const editUser = async (
	formData: userProfileSchema,
	email: string
): Promise<AxiosResponse<null>> => {
	return await axiosInstance.put(`/${usersPrefix}/update`, {
		name: formData.name,
		surname: formData.surname,
		e_mail: email
	});
}


export const getToken = async (
	email: string,
	password: string,
): Promise<AxiosResponse<userTokenSchema>> => {
	return await axios.post(
		baseUrl + `/${usersPrefix}/token`, {
			e_mail: email,
			hash_password: password
		}
	)
}