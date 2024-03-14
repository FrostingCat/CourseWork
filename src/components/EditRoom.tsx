import React, { useState, useLayoutEffect } from 'react'
import { useNavigate, Navigate } from "react-router-dom";
import { Button, FormControl, InputLabel, Input, Select } from '@material-ui/core'

type Props = roomProps & {
	editRoom: (e: React.FormEvent, _id: string, formData: roomSchema) => void
}

const EditRoom: React.FC<Props> = ({ room, editRoom }) => {
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const [formData, setFormData] = useState<roomSchema>({
		_id: room._id,
		name: room.name
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
			</div>
			<Button disabled={formData === undefined ? true : false} onClick={(e) =>
				editRoom(e, room._id, formData)}>
				Изменить
			</Button>
		</div>
	)
}

export default EditRoom