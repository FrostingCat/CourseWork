import {AnimatePresence, motion} from "framer-motion";
import M from 'materialize-css';
import React, {useEffect, useState} from 'react';
import {addDevice, deleteDevice, editDevice, getDevices} from '../Api/ApiDevices';
import AddDevice from '../components/AddDevice';
import {getDateTime} from '../components/DateUtil';
import DeviceItem from '../components/DeviceItem';
import Modal from "../components/modal";
import '../css/devicespage.css';
import '../css/materialize.css';
import lamp from "../images/lamp.jpg";
import SlideBar from "../components/Slidebar";

enum type {
	LAMP = 'Лампа',
	LIGHT = 'Лента',
	CAMERA = 'Камера'
}

function DevicesPage() {
	const [devices, setDevices] = useState<deviceGetSchema[]>([])
	const [isModalAddActive, setModalAddActive] = useState(false);

	const checkFormData = (formData: deviceAddSchema): boolean => {
		if (!formData.name || !formData.type || !formData.ip) {
			alert("Fill in all the fields");
			return false
		}
		return true
	}

	const handleSaveDevice = (e: React.FormEvent, formData: deviceAddSchema): void => {
		e.preventDefault()
		if (checkFormData(formData)) {
			addDevice(formData)
				.then(({ status, data }) => {
					if (status !== 201) {
						alert("Error! Device not saved")
					}
					fetchDevices()
				})
				.catch(err => console.log(err))
		}
	}

	const handleEditDevice = (e: React.FormEvent, formData: deviceSchema): void => {
		e.preventDefault()
		editDevice(formData)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Device not edited")
				}
				fetchDevices()
			})
			.catch(err => console.log(err))
	}

	const handleDeleteDevice = (id: number): void => {
		deleteDevice(id)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Device not deleted")
				}
				fetchDevices()
			})
			.catch(err => console.log(err))
	}

	const handleModalAddOpen = () => {
		setModalAddActive(true);
	};
	const handleModalAddClose = () => {
		setModalAddActive(false);
	};

	useEffect(() => {
		const elems = document.querySelectorAll('.fixed-action-btn');
		M.FloatingActionButton.init(elems);
		fetchDevices()
	}, []);

	const fetchDevices = (): void => {
		getDevices()
			.then(( response) => {
				console.log(response.data)
				setDevices(response.data)
			})
			.catch((err: Error) => console.log(err))
	}

	setInterval(function () {
		document.getElementById("digital-clock")!!.innerHTML = getDateTime();
	}, 1000);

	return (
		<motion.div>
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
			<div>
				<SlideBar/>

				<ul id="slide-out" className="sidenav sidenav-fixed small">
					<li><div className="user-view">
						<div className="background">
							<img src={lamp} />
						</div>
						<a><img className="circle" src={lamp} /></a>
						<a><div id="digital-clock"></div></a>
					</div></li>
				</ul>
				<h4 className='devices-label'>Мои Устройства</h4>

				<div className="fixed-action-btn plus-btn">
					<a className="btn-floating btn waves-effect purple darken-1">
						<i className="large material-icons" onClick={handleModalAddOpen}>add</i>
					</a>
				</div>
				<div>
					{isModalAddActive && (
						<Modal title="Добавление устройства" onClose={handleModalAddClose}>
							<AddDevice saveDevice={handleSaveDevice} />
						</Modal>
					)}
				</div>

				<AnimatePresence>
					{devices
						?.map((device: deviceSchema) => (
							<div>
								<DeviceItem
									key={device.id}
									deleteDevice={handleDeleteDevice}
									editDevice={handleEditDevice}
									device={device}
								/>
							</div>
						))}
				</AnimatePresence>

			</div>
		</motion.div>
	)
}

export default DevicesPage;