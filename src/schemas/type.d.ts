interface deviceSchema {
	_id: string
	name: string
	deviceType: DeviceType
}

enum DeviceType {
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
	device: deviceSchema[]
	device?: deviceSchema
}

interface roomSchema {
	_id: string
	name: string
}

interface roomProps {
	room: roomSchema
}

type ApiRoomDataType = {
	message: string
	status: string
	room: roomSchema[]
	room?: roomSchema
}

