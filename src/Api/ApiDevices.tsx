import axios, { AxiosResponse } from "axios";

const baseUrl = "http://127.0.0.1:8000";

function getToken() {
	return localStorage.getItem('token');
}

const axiosInstance = axios.create({
	baseURL: baseUrl,
});

axiosInstance.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers['Authorization'] = token;
	}
	return config;
}, (error) => {
	return Promise.reject(error);
});

export const getDevices = async (): Promise<AxiosResponse<ApiSimpleDeviceDataType>> => {
	return await axiosInstance.get("/devices/get_all");
}

export const addDevice = async (
	formData: deviceAddSchema
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	return await axiosInstance.post("/devices/create", formData);
}

export const manageLed = async (
	id: string,
	color: string,
	state: boolean
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	return await axiosInstance.put(`/devices/manage_led`, {
		id, color, state
	});
}

export const manageCamera = async (
	id: string,
	state: boolean
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	return await axiosInstance.put(`/devices/manage_security`, {
		id: id,
		state: state
	});
}

export const manageLamp = async (
	id: string,
	state: boolean
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	return await axiosInstance.put(`/devices/manage_clock_lamp`, {
		id, state
	});
}

export const manageAlarm = async (
	id: string,
	state: boolean,
	time: string
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	return await axiosInstance.put(`/devices/manage_alarm`, {
		id, state, time
	});
}

export const manageTime = async (
	id: string,
	time: string
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	return await axiosInstance.put(`/devices/manage_clock_time`, {
		id, time
	});
}

export const editDevice = async (
	formData: deviceSchema
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	return await axiosInstance.put(`/devices/update`, {
		room_id: formData.room_id,
		name: formData.name,
		type: formData.type,
		id: formData.id
	});
}

export const deleteDevice = async (
	device_id: number
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	return await axiosInstance.delete(`/devices/delete/${device_id}`);
}

export const manageDevice = async (
	id: string
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	return await axiosInstance.post(`/devices/manage/${id}`);
}
