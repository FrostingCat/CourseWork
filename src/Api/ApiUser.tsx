import axios, { AxiosResponse } from "axios"

const baseUrl = "todo"

export const checkCodeUser = async (
	email: string
): Promise<AxiosResponse<ApiCodeDataType>> => {
	const user: checkCodeSchema = {
		email: email
	}
	console.log(email)
	const saveUser: AxiosResponse<ApiCodeDataType> = await axios.post(
		baseUrl + "/user",
		email
	)
	return saveUser
}



export const getRooms = async (): Promise<AxiosResponse<ApiRoomDataType>> => {
	const rooms: AxiosResponse<ApiRoomDataType> = await axios.get(
		baseUrl + "/rooms"
	)
	return rooms
}



export const editRoom = async (
	_id: string,
	formData: roomSchema
): Promise<AxiosResponse<ApiRoomDataType>> => {
	console.log({formData})
	const room: Omit<roomSchema, "_id"> = {
		name: formData.name
	}
	console.table(room)
	const editRoom: AxiosResponse<ApiRoomDataType> = await axios.put(
		`${baseUrl}/rooms/${_id}`,
		room
	)
	return editRoom
}

export const deleteRoom = async (
	_id: string
): Promise<AxiosResponse<ApiRoomDataType>> => {
	const deletedRoom: AxiosResponse<ApiRoomDataType> = await axios.delete(
		`${baseUrl}/rooms/${_id}`
	)
	return deletedRoom
}