import React, { useState, useLayoutEffect } from 'react'
import { useNavigate, Navigate } from "react-router-dom";
import { Button, FormControl, InputLabel, Input, Select } from '@material-ui/core'

type Props = deviceProps & {
	editDevice: (e: React.FormEvent, _id: string, formData: deviceSchema) => void
}

const EditDevice: React.FC<Props> = ({ device, editDevice }) => {
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const [formData, setFormData] = useState<deviceSchema>({
		_id: device._id,
		room_id: device.room_id,
		name: device.name,
		deviceType: device.deviceType,
		state: false
	});

	function handleForm(e: any) {
		const key = e.currentTarget.id;

		setFormData({
			...formData,
			[e.currentTarget.id]: e.currentTarget.value,
		})
	}

	return (
		<div>
			<div className="card-content">
				<div className="input-field col s6">
					<input id="name" type="text" className="validate" onChange={handleForm} />
					<label htmlFor="name" className="purple-text text-darken-4">Название</label>
				</div>
				<div className="input-field col s6">
					<select onChange={handleForm} id='deviceType' name='deviceType' className="purple-text text-darken-4 select">
						<option value="" disabled selected>Тип устройства</option>
						<option value={DeviceType.LAMP}>Лампа</option>
						<option value={DeviceType.LIGHT}>Лента</option>
						<option value={DeviceType.CAMERA}>Камера</option>
					</select>
				</div>
				<div className="buttons">
					<a className="waves-effect purple darken-1 btn-large button" onClick={(e) =>
						editDevice(e, device._id, formData)}>
						Изменить
					</a>
				</div>
			</div>
			<Button disabled={formData === undefined ? true : false} onClick={(e) =>
				editDevice(e, device._id, formData)}>
				Изменить
			</Button>
		</div>
	)
}

export default EditDevice