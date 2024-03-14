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
		_id: '',
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
			{/* если время останется */}
			{/* <div className="col s12 m6">
				<div className="card white log">
					<div className="card-content">
						<span className="card-title">Добавление устройства</span>
						<div className="input-field col s12">
							<input id="email" type="email" className="validate" />
							<label htmlFor="email" className="purple-text text-darken-4">Email</label>
						</div>
						<div className="input-field inline">
							<input id="password_inline" type="password" className="validate" />
							<label htmlFor="password_inline" className="purple-text text-darken-4">Password</label>
							<span className="helper-text" data-error="злой пароль" data-success="хороший пароль"></span>
						</div>
					</div>
					<div className="buttons">
						<a href="/home" className="waves-effect purple darken-1 btn-large button">Войти</a>
					</div>
				</div>
			</div> */}
			<Button disabled={formData === undefined ? true : false} onClick={(e) => saveRoom(e, formData)}>Добавить</Button>
		</div>
	)
}

export default AddRoom