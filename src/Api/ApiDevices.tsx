import axios, {AxiosResponse} from "axios"

const baseUrl = "http://127.0.0.1:8000"


const e_mail = "julia@mail.ru"
const hash_password = "$2b$10$AAOFrjbRj8B5t6JVkUWNdu5.LiEB4cXCaJ6s6TcWqE8SH5FzlfmPy"

export const getDevices = async (): Promise<AxiosResponse<ApiSimpleDeviceDataType>> => {
	const user: userAuthorizeSchema = {
		e_mail: e_mail,
		hash_password: hash_password
	}
	return await axios.patch(
		baseUrl + "/devices/get_all",
		user
	)
}

export const getDevicesByRoomId = async (id: string,): Promise<AxiosResponse<ApiDeviceDataType>> => {
	return await axios.get(
		`${baseUrl}/devices/room/${id}`,
	)
}

export const addDevice = async (
	formData: deviceAddSchema
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const device: deviceAddSchema = {
		e_mail: e_mail,
		hash_password: hash_password,
		room_id: formData.room_id,
		name: formData.name,
		type: formData.type,
		ip: formData.ip
	}
	console.table(device)
	return await axios.post(
		baseUrl + "/devices/create",
		device
	)
}

export const manageLight = async (
	id: string,
	color: string,
	state: boolean
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const light: lightSchema = {
		id: id,
		color: color,
		state: state
	}
	return await axios.put(
		`${baseUrl}/devices/manage_led`,
		light
	)
}

export const manageCamera = async (
	id: string,
	state: boolean
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const managedLight: AxiosResponse<ApiDeviceDataType> = await axios.post(
		`${baseUrl}/devices/manage_security/${id}`
	)
	console.log(id);
	return managedLight
}

export const manageLamp = async (
	id: string,
	state: boolean
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const message: lampSchema = {
		id: id,
		state: state
	}
	const managedLight: AxiosResponse<ApiDeviceDataType> = await axios.post(
		`${baseUrl}/devices/manage_clock_lamp`,
		message
	)
	console.log(id, state);
	return managedLight
}

export const manageAlarm = async (
	id: string,
	state: boolean,
	time: string
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const message: alarmSchema = {
		id: id,
		state: state,
		time: time
	}
	const managedAlarm: AxiosResponse<ApiDeviceDataType> = await axios.post(
		`${baseUrl}/devices/manage_clock_alarm`,
		message
	)
	console.log(id, state, time);
	return managedAlarm
}

export const manageTime = async (
	id: string,
	time: string
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const message: timeSchema = {
		id: id,
		time: time
	}
	const managedTime: AxiosResponse<ApiDeviceDataType> = await axios.post(
		`${baseUrl}/devices/manage_clock_time`,
		message
	)
	console.log(id, time);
	return managedTime
}

export const editDevice = async (
	id: string,
	formData: deviceSchema
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const device: deviceEditSchema = {
		e_mail: e_mail,
		hash_password: hash_password,
		id: parseInt(id),
		room_id: formData.room_id,
		name: formData.name,
		type: formData.type
	}
	console.table(device)
	return await axios.put(
		`${baseUrl}/devices/update`,
		device
	)
}

export const deleteDevice = async (
	id: number
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const deleteDevice: deviceDeleteSchema = {
		e_mail: e_mail,
		hash_password: hash_password,
		device_id: id
	}
	return await axios.patch(
		`${baseUrl}/devices/delete`,
		deleteDevice
	)
}

export const manageDevice = async (
	id: string
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const managedDevice: AxiosResponse<ApiDeviceDataType> = await axios.post(
		`${baseUrl}/devices/manage/${id}`
	)
	console.log(id)
	return managedDevice
}