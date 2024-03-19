import axios, { AxiosResponse } from "axios"

const baseUrl = "todo"

export const getDevices = async (): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const devices: AxiosResponse<ApiDeviceDataType> = await axios.get(
		baseUrl + "/device"
	)
	return devices
}

export const getDevicesByRoomId = async (_id: string,): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const devices: AxiosResponse<ApiDeviceDataType> = await axios.get(
		`${baseUrl}/device/room/${_id}`,
	)
	return devices
}

export const addDevice = async (
	formData: deviceSchema
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const device: Omit<deviceSchema, "_id"> = {
		room_id: formData.room_id,
		name: formData.name,
		deviceType: formData.deviceType,
		state: false
	}
	console.table(device)
	const saveDevice: AxiosResponse<ApiDeviceDataType> = await axios.post(
		baseUrl + "/device",
		device
	)
	return saveDevice
}

export const manageLight = async (
	_id: string,
	color: string
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const managedLight: AxiosResponse<ApiDeviceDataType> = await axios.post(
		`${baseUrl}/device/manage_led/${_id}`
	)
	console.log(_id, color);
	return managedLight
}

export const manageLamp = async (
	_id: string,
	state: boolean
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const message: lampSchema = {
		_id: _id,
		state: state
	}
	const managedLight: AxiosResponse<ApiDeviceDataType> = await axios.post(
		`${baseUrl}/device/manage_clock_lamp`,
		message
	)
	console.log(_id, state);
	return managedLight
}

export const manageAlarm = async (
	_id: string,
	state: boolean,
	time: string
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const message: alarmSchema = {
		_id: _id,
		state: state,
		time: time
	}
	const managedAlarm: AxiosResponse<ApiDeviceDataType> = await axios.post(
		`${baseUrl}/device/manage_clock_alarm`,
		message
	)
	console.log(_id, state, time);
	return managedAlarm
}

export const manageTime = async (
	_id: string,
	time: string
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const message: timeSchema = {
		_id: _id,
		time: time
	}
	const managedTime: AxiosResponse<ApiDeviceDataType> = await axios.post(
		`${baseUrl}/device/manage_clock_time`,
		message
	)
	console.log(_id, time);
	return managedTime
}

export const editDevice = async (
	_id: string,
	formData: deviceSchema
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	console.log({ formData })
	const device: Omit<deviceSchema, "_id"> = {
		room_id: formData.room_id,
		name: formData.name,
		deviceType: formData.deviceType,
		state: false,
	}
	console.table(device)
	const editDevice: AxiosResponse<ApiDeviceDataType> = await axios.put(
		`${baseUrl}/device/${_id}`,
		device
	)
	return editDevice
}

export const deleteDevice = async (
	_id: string
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const deletedDevice: AxiosResponse<ApiDeviceDataType> = await axios.delete(
		`${baseUrl}/device/${_id}`
	)
	return deletedDevice
}

export const manageDevice = async (
	_id: string
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const managedDevice: AxiosResponse<ApiDeviceDataType> = await axios.post(
		`${baseUrl}/device/manage/${_id}`
	)
	console.log(_id)
	return managedDevice
}