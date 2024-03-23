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
				<div className="input-field col s6">
					<input id="name" type="text" className="validate" onChange={(e) => setNewRoom(e.target.value)} />
					<label htmlFor="name" className="purple-text text-darken-4">Новая комната</label>
				</div>
				<div className="buttons">
					<a className="waves-effect purple darken-1 btn-large button" onClick={handleAddRoom}>
						Добавить
					</a>
				</div>
				<div className="input-field col s6">
					<select onChange={handleForm} id='roomNumber' name='roomNumber' className='purple-text text-darken-4 select last'>
						<option value="" disabled selected>Выберите комнату</option>
						{rooms.map((room, index) => (
							<option key={index} value={room}>{room}</option>
						))}
					</select>
				</div>
			</div>
			{formData === undefined && (
				<div className="buttons">
					<a className="waves-effect purple darken-1 btn-large button disabled">
						Добавить
					</a>
				</div>
			)}
			{formData !== undefined && (
				<div className="buttons" onClick={(e) => saveDevice(e, formData)}>
					<a className="waves-effect purple darken-1 btn-large button">
						Добавить
					</a>
				</div>
			)}
		</div>
	)
}

export default AddDevice