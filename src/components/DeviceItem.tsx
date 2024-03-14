import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Card, Switch, Typography } from '@material-ui/core';
import '../css/deviceitem.css';
import lamp from "../images/lamp.jpg";
import camera from "../images/camera.jpg";
import led from "../images/room.jpg";
import Modal from "../components/modal";
import EditDevice from '../components/EditDevice';
import { Button, FormControl, InputLabel, Input, Select } from '@material-ui/core'
import { manageDevice } from '../Api/ApiDevices';

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
	const [formData, setFormData] = useState<deviceSchema>({
		_id: device._id,
		name: device.name,
		deviceType: device.deviceType
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

	function handleManageDevice(e: any) {
		var _id = device._id
		manageDevice(_id)
			.then(({ status }) => {
				if (status !== 200) {
					throw new Error("Error! Device can't be managed")
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

	return (
		<div className="grid-container">
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
			<Card className="card-admin">
				<img src={picture} alt="Device" className="small-rectangle-image" />
				<p className="people">
					{device.name}<br />
					{device.deviceType}<br />
					<div className="switch">
						<label>
							Off
							<input type="checkbox" onChange={handleManageDevice}/>
								<span className="lever"></span>
								On
						</label>
					</div>
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