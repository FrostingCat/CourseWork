import axios, { AxiosResponse } from "axios"

const baseUrl = "todo"

export const getDevices = async (): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const devices: AxiosResponse<ApiDeviceDataType> = await axios.get(
		baseUrl + "/devices"
	)
	return devices
}

export const addDevice = async (
	formData: deviceSchema
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const device: Omit<deviceSchema, "_id"> = {
		name: formData.name,
		deviceType: formData.deviceType
	}
	console.log(device)
	console.table(device)
	const saveDevice: AxiosResponse<ApiDeviceDataType> = await axios.post(
		baseUrl + "/devices",
		device
	)
	return saveDevice
}

export const editDevice = async (
	_id: string,
	formData: deviceSchema
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	console.log({formData})
	const device: Omit<deviceSchema, "_id"> = {
		name: formData.name,
		deviceType: formData.deviceType
	}
	console.table(device)
	const editDevice: AxiosResponse<ApiDeviceDataType> = await axios.put(
		`${baseUrl}/devices/${_id}`,
		device
	)
	return editDevice
}

export const deleteDevice = async (
	_id: string
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const deletedDevice: AxiosResponse<ApiDeviceDataType> = await axios.delete(
		`${baseUrl}/devices/${_id}`
	)
	return deletedDevice
}

export const manageDevice = async (
	_id: string
): Promise<AxiosResponse<ApiDeviceDataType>> => {
	const managedDevice: AxiosResponse<ApiDeviceDataType> = await axios.post(
		`${baseUrl}/devices/manage/${_id}`
	)
	console.log(_id)
	return managedDevice
}