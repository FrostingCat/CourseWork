import React, { useState, useLayoutEffect } from 'react'
import { useNavigate, Navigate } from "react-router-dom";
import { Button, FormControl, Select, InputLabel, Input } from '@material-ui/core'
import '../css/adddevice.css'

type Props = {
	saveRoom: (e: React.FormEvent, formData: roomSchema) => void
}

const AddRoom: React.FC<Props> = ({ saveRoom }) => {
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const [formData, setFormData] = useState<roomSchema>({
		id: '',
		name: ""
	});

	function handleForm(e: any): void {
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
			<Button disabled={formData === undefined ? true : false} onClick={(e) => saveRoom(e, formData)}>Добавить</Button>
		</div>
	)
}

export default AddRoom