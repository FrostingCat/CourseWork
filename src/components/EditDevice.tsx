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
		name: device.name,
		deviceType: device.deviceType
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
			<div className='Add-Form'>
				<FormControl>
					<InputLabel htmlFor='name'>Название</InputLabel>
					<Input onChange={handleForm} type='text' id='name' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='deviceType'>Тип устройства</InputLabel>
					<Select id='deviceType' name='deviceType'>
						<option value='lamp'>Лампа</option>
						<option value='light'>Лента</option>
						<option value='camera'>Камера</option>
					</Select>
					<Input onChange={handleForm} type='text' id='material' />
				</FormControl>
			</div>
			<Button disabled={formData === undefined ? true : false} onClick={(e) =>
				editDevice(e, device._id, formData)}>
				Изменить
			</Button>
		</div>
	)
}

export default EditDevice