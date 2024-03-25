import React, { useEffect, useState } from 'react';
import { Card, Typography, Button } from '@material-ui/core'
import '../css/roomitem.css'
import { deleteDevice, editDevice } from '../Api/ApiDevices';
import DeviceItem from '../components/DeviceItem'

type Props = roomProps & {
	deleteRoom: (id: string) => void
}

enum type {
	LAMP = 'Лампа',
	LIGHT = 'Лента',
	CAMERA = 'Камера'
}

const Item: React.FC<Props> = ({ room, deleteRoom }) => {
	const [devices, setDevices] = useState<deviceSchema[]>([]);


	const handleEditDevice = (e: React.FormEvent, formData: deviceSchema): void => {
		e.preventDefault()
		editDevice(formData)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Device not edited")
				}
				console.log(data.device, { data })
				setDevices(data.device as deviceSchema[])
			})
			.catch(err => console.log(err))
	}

	const handleDeleteDevice = (id: number): void => {
		deleteDevice(id)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Device not deleted")
				}
				setDevices(data.device as deviceSchema[])
			})
			.catch(err => console.log(err))
	}

	return (
		<div>
			<Button className="people-room"  style={{ border: '1px solid #000', borderRadius: 20, background: '' }}>
				{room.name}<br></br>
			</Button>
			{devices
				?.map((device: deviceSchema) => (
					<div>
						<DeviceItem
							key={device.id}
							deleteDevice={handleDeleteDevice}
							editDevice={handleEditDevice}
							device={device}
						/>
					</div>
				))}
		</div>
	)
}

export default Item