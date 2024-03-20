import { AnimatePresence, motion } from "framer-motion";
import M from 'materialize-css';
import React, { useEffect, useState } from 'react';
import { addDevice, deleteDevice, editDevice, getDevices } from '../Api/ApiDevices';
import AddDevice from '../components/AddDevice';
import { getDateTime } from '../components/DateUtil';
import DeviceItem from '../components/DeviceItem';
import Modal from "../components/modal";
import '../css/devicespage.css';
import '../css/materialize.css';
import lamp from "../images/lamp.jpg";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../components/store";

enum DeviceType {
	LAMP = 'Лампа',
	LIGHT = 'Лента',
	CAMERA = 'Камера'
}

function DevicesPage() {
	const navigate = useNavigate();
	const data = useSelector((state: RootState) => state.user);
	//const [devices, setDevices] = useState<deviceSchema[]>([])

	const [devices, setDevices] = useState<deviceSchema[]>([
		{
			_id: '1',
			room_id: '1',
			name: "Устройство 1",
			deviceType: DeviceType.CAMERA,
			state: false
		},
		{
			_id: '2',
			room_id: '1',
			name: "Устройство 2",
			deviceType: DeviceType.LAMP,
			state: false
		},
		{
			_id: '3',
			room_id: '2',
			name: "Устройство 3",
			deviceType: DeviceType.LIGHT,
			state: false
		}
	]);
	const [isModalAddActive, setModalAddActive] = useState(false);

	const checkFormData = (formData: deviceSchema): boolean => {
		if (!formData.name || !formData.deviceType) {
			alert("Fill in all the fields");
			return false
		}
		return true
	}

	const handleSaveDevice = (e: React.FormEvent, formData: deviceSchema): void => {
		e.preventDefault()
		if (checkFormData(formData)) {
			addDevice(formData)
				.then(({ status, data }) => {
					if (status !== 200) {
						alert("Error! Device not saved")
					}
					console.log(data.device, { data })
					setDevices(data.device)
				})
				.catch(err => console.log(err))
		}
		console.log("error")
	}

	const handleEditDevice = (e: React.FormEvent, _id: string, formData: deviceSchema): void => {
		e.preventDefault()
		editDevice(_id, formData)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Device not edited")
				}
				console.log(data.device, { data })
				setDevices(data.device)
			})
			.catch(err => console.log(err))
	}

	const handleDeleteDevice = (_id: string): void => {
		deleteDevice(_id)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Device not deleted")
				}
				setDevices(data.device)
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
		let elements = document.querySelectorAll(".sidenav");
		M.Sidenav.init(elements[0]);
		M.Sidenav.init(elements[1], {
			edge: "right"
		});
		var elems = document.querySelectorAll('.fixed-action-btn');
		M.FloatingActionButton.init(elems);
		//fetchDevices()
	}, []);

	const fetchDevices = (): void => {
		getDevices()
			.then(({ data: { data } }: deviceSchema[] | any) => {
				setDevices(data)
			})
			.catch((err: Error) => console.log(err))
	}

	setInterval(function () {
		var currentTime = getDateTime();
		document.getElementById("digital-clock")!!.innerHTML = currentTime;
	}, 1000);

	return (
		<motion.div>
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
			<div>
				<div className="image">
					<img className="login-image" src={lamp} />
				</div>
				<ul id="slide-out" className="sidenav sidenav-fixed big">
					<li><div className="user-view">
						<div className="background">
							<img src={lamp} />
						</div>
						<a><img className="circle" src={lamp} /></a>
						<a><span className="white-text name">{data.firstName} {data.lastName}</span></a>
						<a><span className="white-text email">{data.email}</span></a>
					</div></li>
					<li><a className="waves-effect" onClick={() => navigate("/home")}> Дом</a></li>
					<li><div className="divider"></div></li>
					<li><a className="waves-effect" onClick={() => navigate("/rooms")}>Комнаты</a></li>
					<li><div className="divider"></div></li>
					<li><a className="waves-effect" onClick={() => navigate("/devices")}>Устройства</a></li>
					<li><div className="divider"></div></li>
					<li><a className="waves-effect" onClick={() => navigate("/profile")}>Профиль</a></li>
				</ul>

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
						<Modal title="Добавление" onClose={handleModalAddClose}>
							<AddDevice saveDevice={handleSaveDevice} />
						</Modal>
					)}
				</div>

				<AnimatePresence>
					{devices
						?.map((device: deviceSchema) => (
							<div>
								<DeviceItem
									key={device._id}
									deleteDevice={handleDeleteDevice}
									editDevice={handleEditDevice}
									device={device}
								/>
							</div>
						))}
				</AnimatePresence>

				{/* <div className="row device-card">
				<div className="col s12 m6">
					<div className="card deep-purple lighten-4">
						<div className="card-content">
							<span className="card-title">Профиль</span>
							<p>Имя Фамилия</p>
							<p>Почта</p>
						</div>
						<div className="card-action">
							<a href="/" className="waves-effect pink darken-3 btn-large button but-1">Выйти</a>
							<a href="/edit" className="waves-effect purple darken-1 btn-large button">Редактировать</a>
						</div>
					</div>
				</div>
			</div> */}
			</div>
		</motion.div>
	)
}

export default DevicesPage;