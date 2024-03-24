import axios, {AxiosResponse} from "axios"

const baseUrl = "http://127.0.0.1:8000"


const e_mail = "julia@mail.ru"
const hash_password = "$2b$10$AAOFrjbRj8B5t6JVkUWNdu5.LiEB4cXCaJ6s6TcWqE8SH5FzlfmPy"

export const getRooms = async (): Promise<AxiosResponse<ApiSimpleRoomDataType>> => {
	const user: userAuthorizeSchema = {
		e_mail: e_mail,
		hash_password: hash_password
	}
	return await axios.patch(
		baseUrl + "/rooms/get_rooms",
		user
	)
}

export const addRoom = async (
	e_mail: string,
	hash_password: string,
	roomName: string
): Promise<AxiosResponse<ApiRoomDataType>> => {
	const room: roomAddSchema = {
		e_mail: e_mail,
		hash_password: hash_password,
		name: roomName
	}
	console.log(room)
	const saveRoom: AxiosResponse<ApiRoomDataType> = await axios.post(
		baseUrl + "/rooms/create",
		room
	)
	return saveRoom
}

export const editRoom = async (
	id: string,
	formData: roomSchema
): Promise<AxiosResponse<ApiRoomDataType>> => {
	console.log({formData})
	const room: Omit<roomSchema, "id"> = {
		name: formData.name
	}
	console.table(room)
	const editRoom: AxiosResponse<ApiRoomDataType> = await axios.put(
		`${baseUrl}/rooms/${id}`,
		room
	)
	return editRoom
}

export const deleteRoom = async (
	id: string
): Promise<AxiosResponse<ApiRoomDataType>> => {
	const deletedRoom: AxiosResponse<ApiRoomDataType> = await axios.delete(
		`${baseUrl}/rooms/${id}`
	)
	return deletedRoom
}