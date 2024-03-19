import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Card, Switch, Typography } from '@material-ui/core';
import '../css/deviceitem.css';
import lamp from "../images/lamp.jpg";
import camera from "../images/camera.jpg";
import led from "../images/room.jpg";
import Modal from "../components/modal";
import EditDevice from '../components/EditDevice';
import { Button, FormControl, InputLabel, Input, Select, MenuItem } from '@material-ui/core'
import { manageDevice, manageLamp, manageLight } from '../Api/ApiDevices';
import ColorPicker from './ColorPicker';
import { DeviceHubRounded } from '@material-ui/icons';
import AlarmTime from './AlarmTime';
import Time from './Time';

type Props = deviceProps & {
	deleteDevice: (_id: string) => void;
	editDevice: (e: React.FormEvent, _id: string, formData: deviceSchema) => void;
};

enum DeviceType {
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
		_id: device._id,
		room_id: device.room_id,
		name: device.name,
		deviceType: device.deviceType,
		state: false
	});

	useEffect(() => {
		checkPicture();
	}, [device.deviceType]);

	function handleForm(e: any) {
		setFormData({
			...formData,
			[e.currentTarget.id]: e.currentTarget.value,
		})
	}

	function checkPicture() {
		switch (device.deviceType) {
			case DeviceType.CAMERA:
				setPicture(camera);
				break;
			case DeviceType.LIGHT:
				setPicture(led);
				break;
			default:
				setPicture(lamp);
		}
	}

	function handleManageLight() {
		var _id = device._id
		var color = device.state ? '000000' : '446AD9'
		manageLight(_id, color)
			.then(({ status }) => {
				if (status !== 200) {
					throw new Error("Error! Light can't be managed")
				}
			})
			.catch(err => console.log(err))
	}

	function handleManageLamp() {
		var _id = device._id
		manageLamp(_id, !device.state)
			.then(({ status }) => {
				if (status !== 200) {
					throw new Error("Error! Lamp can't be managed")
				}
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
			<Card className="card-admin">
				<img src={picture} alt="Device" className="small-rectangle-image" />
				<p className="people">
					{device.name}<br />
					{device.deviceType}<br />
					{device.deviceType === DeviceType.LIGHT && (
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
					{device.deviceType === DeviceType.LAMP && (
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
					<button className="material-icons delete-button pink darken-3" onClick={() => deleteDevice(device._id)}>delete</button>
					<button className="material-icons delete-button purple darken-1" onClick={handleModalOpen}>edit</button>
				</p>
				{isModalActive && (
					<Modal title="Editing" onClose={handleModalClose}>
						<div className='Add-Form'>
							<FormControl>
								<InputLabel htmlFor='name'>Название</InputLabel>
								<Input onChange={handleForm} type='text' id='name' />
							</FormControl>
							<FormControl>
								<InputLabel htmlFor='deviceType'>Тип устройства</InputLabel>
								<Select id='deviceType' name='deviceType'>
									<option value='Лампа'>Лампа</option>
									<option value='Лента'>Лента</option>
									<option value='Камера'>Камера</option>
								</Select>
							</FormControl>
						</div>
						<Button disabled={formData === undefined ? true : false} onClick={(e) =>
							editDevice(e, device._id, formData)}>
							Изменить
						</Button>
					</Modal>
				)}
			</Card >
		</div >
	);
};

export default Item;