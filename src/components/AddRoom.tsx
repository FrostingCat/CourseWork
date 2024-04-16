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
			<div className="card-content">
				<div className="input-field col s6">
					<input id="name" type="text" className="validate" onChange={handleForm}/>
					<label htmlFor="name" className="purple-text text-darken-4">Название</label>
				</div>

				<div className="buttons">
					<a className="waves-effect purple darken-1 btn-large button" onClick={(e) => saveRoom(e, formData)}>
						Добавить
					</a>
				</div>
			</div>
		</div>
	)
}

export default AddRoom