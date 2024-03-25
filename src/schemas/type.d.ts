interface deviceSchema {
	id: string
	room_id: string
	name: string
	type: type
	state: boolean
}

interface deviceGetSchema {
	id: string
	name: string
	room_id: string
	state: boolean
	type: type
	time: string | null
	alarm_lamp: boolean
	alarm_time: string | null
}

interface deviceEditSchema {
	e_mail: string,
	hash_password: string,
	id: number
	room_id: string
	name: string
	type: type
}

type ApiSimpleDeviceDataType = deviceGetSchema[]

interface deviceAddSchema {
	room_id: number
	name: string
	type: type,
	ip: string
}

interface deviceDeleteSchema {
	e_mail: string
	hash_password: string
	device_id: number
}

enum type {
	LAMP = 'Лампа',
	LIGHT = 'Лента',
	CAMERA = 'Камера'
}

interface deviceProps {
	device: deviceSchema
}

type ApiDeviceDataType = {
	message: string
	status: string
	device?: deviceSchema[]
}

interface roomSchema {
	id: string
	name: string
}

interface roomProps {
	room: roomSchema
}

type ApiRoomDataType = {
	message: string
	status: string
	room?: roomSchema[]
}

type ApiSimpleRoomDataType = roomSchema[]

interface roomAddSchema {
	name: string
}