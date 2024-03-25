import React, {useEffect, useState} from 'react';
import {Card} from '@material-ui/core';
import '../css/deviceitem.css';
import lamp from "../images/lamp.jpg";
import camera from "../images/camera.jpg";
import led from "../images/room.jpg";
import Modal from "../components/modal";
import {manageCamera, manageLamp, manageLed} from '../Api/ApiDevices';
import ColorPicker from './ColorPicker';
import AlarmTime from './AlarmTime';
import Time from './Time';

type Props = deviceProps & {
	deleteDevice: (id: number) => void;
	editDevice: (e: React.FormEvent, formData: deviceSchema) => void;
};

enum type {
	LAMP = 'Лампа',
	LIGHT = 'Лента',
	CAMERA = 'Камера'
}

const Item: React.FC<Props> = ({ device, deleteDevice, editDevice }) => {
	const [picture, setPicture] = useState("");
	const [isModalActive, setModalActive] = useState(false);
	const [isColorPickerActive, setColorPickerActive] = useState(false);
	const [isClockAlarmPickerActive, setClockAlarmPickerActive] = useState(false);
	const [isClockTimePickerActive, setClockTimePickerActive] = useState(false);
	const [formData, setFormData] = useState<deviceSchema>({
		id: device.id,
		room_id: device.room_id,
		name: device.name,
		type: device.type,
		state: false
	});

	useEffect(() => {
		checkPicture();
	}, [device.type]);

	function handleForm(e: any) {
		setFormData({
			...formData,
			[e.currentTarget.id]: e.currentTarget.value,
		})
	}

	function checkPicture() {
		switch (device.type) {
			case type.CAMERA:
				setPicture(camera);
				break;
			case type.LIGHT:
				setPicture(led);
				break;
			default:
				setPicture(lamp);
		}
	}

	function handleManageLight() {
		var id = device.id
		var color = !device.state ? '000000' : '446AD9'
		manageLed(id, color, device.state)
			.then(({ status }) => {
				if (status !== 200) {
					throw new Error("Error! Light can't be managed")
				}
				device.state = !device.state
			})
			.catch(err => console.log(err))
	}

	function handleManageCamera() {
		var id = device.id
		manageCamera(id, !device.state)
			.then(({ status }) => {
				if (status !== 200) {
					throw new Error("Error! Light can't be managed")
				}
				device.state = !device.state
			})
			.catch(err => console.log(err))
	}

	function handleManageLamp() {
		var id = device.id
		manageLamp(id, !device.state)
			.then(({ status }) => {
				if (status !== 200) {
					throw new Error("Error! Lamp can't be managed")
				}
				device.state = !device.state
			})
			.catch(err => console.log(err))
	}

	const handleModalOpen = () => {
		setModalActive(true);
	};
	const handleModalClose = () => {
		setModalActive(false);
	};

	const handleColorPickerOpen = () => {
		setColorPickerActive(true);
	};

	const handleColorPickerClose = () => {
		setColorPickerActive(false);
	};

	const handleManageClockAlarmPickerOpen = () => {
		setClockAlarmPickerActive(true);
	}

	const handleManageClockAlarmPickerClose = () => {
		setClockAlarmPickerActive(false);
	}

	const handleManageClockTimePickerOpen = () => {
		setClockTimePickerActive(true);
	}

	const handleManageClockTimePickerClose = () => {
		setClockTimePickerActive(false);
	}

	return (
		<div className="grid-container">
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
			<Card className="card-admin" style={{ borderRadius: '20px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.8)' }}>
				<img src={picture} alt="Device" className="small-rectangle-image" />
				<p className="people">
					{device.name}<br />
					{device.type}<br />
					{device.type === type.CAMERA && (
						<div>
							<div className="switch">
								<label>
									Off
									<input type="checkbox" onChange={handleManageCamera} />
									<span className="lever"></span>
									On
								</label>
							</div>
						</div>
					)}
					{device.type === type.LIGHT && (
						<div>
							<button className="material-icons change-color-button purple darken-1" onClick={handleColorPickerOpen}>color_lens</button>
							{isColorPickerActive && (
								<Modal title="Выберите цвет" onClose={handleColorPickerClose}>
									<ColorPicker device={device} />
								</Modal>
							)}
							<div className="switch">
								<label>
									Off
									<input type="checkbox" onChange={handleManageLight} />
									<span className="lever"></span>
									On
								</label>
							</div>
						</div>
					)}
					{device.type === type.LAMP && (
						<div>
							<button className="material-icons alarm-button purple darken-1" onClick={handleManageClockAlarmPickerOpen}>access_alarm</button>
							{isClockAlarmPickerActive && (
								<Modal title="Выберите время" onClose={handleManageClockAlarmPickerClose}>
									<AlarmTime device={device} />
								</Modal>
							)}
							<button className="material-icons alarm-button purple darken-1" onClick={handleManageClockTimePickerOpen}>access_time</button>
							{isClockTimePickerActive && (
								<Modal title="Выберите время" onClose={handleManageClockTimePickerClose}>
									<Time device={device} />
								</Modal>
							)}
							<div className="switch">
								<label>
									Off
									<input type="checkbox" onChange={handleManageLamp} />
									<span className="lever"></span>
									On
								</label>
							</div>
						</div>
					)}
					<button className="material-icons delete-button pink darken-3" onClick={() => deleteDevice(parseInt(device.id))}>delete</button>
					<button className="material-icons delete-button purple darken-1" onClick={handleModalOpen}>edit</button>
				</p>
				{isModalActive && (
					<Modal title="Изменить устройство" onClose={handleModalClose}>
						<div className="card-content">
							<div className="input-field col s6">
								<input id="name" type="text" className="validate" onChange={handleForm} />
								<label htmlFor="name" className="purple-text text-darken-4">Название</label>
							</div>
							<div className="input-field col s6">
								<select onChange={handleForm} id='type' name='type' className="purple-text text-darken-4 select">
									<option value="" disabled selected>Тип устройства</option>
									<option value={type.LAMP}>Лампа</option>
									<option value={type.LIGHT}>Лента</option>
									<option value={type.CAMERA}>Камера</option>
								</select>
							</div>
							<div className="buttons">
								<a className="waves-effect purple darken-1 btn-large button" onClick={(e) =>
									editDevice(e, formData)}>
									Изменить
								</a>
							</div>
						</div>
					</Modal>
				)}
			</Card >
		</div >
	);
};

export default Item;