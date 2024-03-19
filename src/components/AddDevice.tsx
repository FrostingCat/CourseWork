import React, { useState, useEffect } from 'react'
import { useNavigate, Navigate } from "react-router-dom";
import { Button, FormControl, Select, InputLabel, Input } from '@material-ui/core'
import '../css/adddevice.css'
import { getRooms } from '../Api/ApiRooms';

type Props = {
	saveDevice: (e: React.FormEvent, formData: deviceSchema) => void
}

enum DeviceType {
	LAMP = 'Лампа',
	LIGHT = 'Лента',
	CAMERA = 'Камера'
}

const AddDevice: React.FC<Props> = ({ saveDevice }) => {
	const [rooms, setRooms] = useState<string[]>(["Комната 1", "Комната 2", "Комната 3"]);
	const [newRoom, setNewRoom] = useState("");
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const [formData, setFormData] = useState<deviceSchema>({
		_id: '',
		room_id: '',
		name: "",
		deviceType: DeviceType.CAMERA,
		state: false
	});

	useEffect(() => {
		//fetchRooms()
	}, []);

	const fetchRooms = (): void => {
		getRooms()
			.then(({ data: { data } }: roomSchema[] | any) => {
				setRooms(data)
			})
			.catch((err: Error) => console.log(err))
	}

	function handleForm(e: any): void {
		const key = e.currentTarget.id;

		setFormData({
			...formData,
			[e.currentTarget.id]: e.currentTarget.value,
		})
	}

	const handleAddRoom = () => {
		if (newRoom.trim() !== "") {
			//handleSaveRoom()
			setRooms([...rooms, newRoom.trim()]);
			setNewRoom("");
		}
	};

	// const handleSaveRoom = (e: React.FormEvent, formData: roomSchema): void => {
	// 	e.preventDefault()
	// 	if (checkFormData(formData)) {
	// 		addRoom(formData)
	// 			.then(({ status, data }) => {
	// 				if (status !== 200) {
	// 					alert("Error! Room not saved")
	// 				}
	// 				console.log(data.room, { data })
	// 				setRooms(data.room)
	// 			})
	// 			.catch(err => console.log(err))
	// 	}
	// 	console.log("error")
	// }

	return (
		<div>
			<div className='Add-Form'>
				<FormControl>
					<InputLabel htmlFor='name'>Название</InputLabel>
					<Input onChange={handleForm} type='text' id='name' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='deviceType'>Тип устройства</InputLabel>
					<Select onChange={handleForm} id='deviceType' name='deviceType'>
						<option value={DeviceType.LAMP}>Лампа</option>
						<option value={DeviceType.LIGHT}>Лента</option>
						<option value={DeviceType.CAMERA}>Камера</option>
					</Select>
				</FormControl>
				<Input placeholder="Новая комната" value={newRoom} onChange={(e) => setNewRoom(e.target.value)} />
				<Button onClick={handleAddRoom}>Добавить</Button>
				<FormControl>
					<InputLabel htmlFor='roomNumber'>Выберите комнату</InputLabel>
					<Select onChange={handleForm} id='roomNumber' name='roomNumber'>
						{rooms.map((room, index) => (
							<option key={index} value={room}>{room}</option>
						))}
					</Select>
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
			<Button disabled={formData === undefined ? true : false} onClick={(e) => saveDevice(e, formData)}>Добавить</Button>
		</div>
	)
}

export default AddDevice