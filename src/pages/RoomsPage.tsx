import '../css/devicespage.css'
import '../css/materialize.css'
import M from 'materialize-css'
import lamp from "../images/lamp.jpg"
import React, {useEffect, useState} from 'react';
import {addRoom, deleteRoom, editRoom, getRooms} from '../Api/ApiRooms'
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import {Button} from '@material-ui/core'
import Modal from "../components/modal";
import AddRoom from '../components/AddRoom';
import {getDateTime} from '../components/DateUtil';
import {deleteDevice, editDevice, getDevicesByRoomId} from '../Api/ApiDevices';
import DeviceItem from '../components/DeviceItem'
import {useSelector} from 'react-redux';
import {RootState} from '../components/store';

enum type {
	LAMP = 'Лампа',
	LIGHT = 'Лента',
	CAMERA = 'Камера'
}

const e_mail = "julia@mail.ru"
const hash_password = "$2b$10$AAOFrjbRj8B5t6JVkUWNdu5.LiEB4cXCaJ6s6TcWqE8SH5FzlfmPy"

function RoomsPage() {
	var navigate = useNavigate();
	const data = useSelector((state: RootState) => state.user);
	const [rooms, setRooms] = useState<roomSchema[]>([])
	const [isModalActive, setModalActive] = useState(false);
	const [isModalAddActive, setModalAddActive] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState('');
	const [devices, setDevices] = useState<deviceSchema[]>([]);
	const [roomElements, setRoomElements] = useState<deviceSchema[]>([]);

	const checkFormData = (formData: roomSchema): boolean => {
		if (!formData.name) {
			alert("Fill in all the fields");
			return false
		}
		return true
	}

	const handleSaveRoom = (e: React.FormEvent, formData: roomSchema): void => {
		e.preventDefault()
		if (checkFormData(formData)) {
			addRoom(e_mail, hash_password, formData.name)
				.then(({ status, data }) => {
					if (status !== 200) {
						alert("Error! Room not saved")
					}
					console.log(data.room, { data })
					setRooms(data.room as roomSchema[])
				})
				.catch(err => console.log(err))
		}
		console.log("error")
	}

	const handleEditRoom = (e: React.FormEvent, id: string, formData: roomSchema): void => {
		e.preventDefault()
		editRoom(id, formData)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Room not edited")
				}
				console.log(data.room, { data })
				setRooms(data.room as roomSchema[])
			})
			.catch(err => console.log(err))
	}

	const handleDeleteRoom = (id: string): void => {
		deleteRoom(id)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Room not deleted")
				}
				setRooms(data.room as roomSchema[])
			})
			.catch(err => console.log(err))
	}

	const handleModalOpen = () => {
		setModalActive(true);
	};
	const handleModalClose = () => {
		setModalActive(false);
	};

	const handleModalAddOpen = () => {
		setModalAddActive(true);
	};
	const handleModalAddClose = () => {
		setModalAddActive(false);
	};

	const handleRoomClick = (room_id: string) => {
		setSelectedRoom(room_id);
		fetchDevicesById(room_id);
	};

	const fetchDevicesById = (id: string): void => {
		getDevicesByRoomId(id)
			.then(({ data: { data } }: deviceSchema[] | any) => {
				setRoomElements(data)
			})
			.catch((err: Error) => console.log(err))
	}

	const handleEditDevice = (e: React.FormEvent, id: string, formData: deviceSchema): void => {
		e.preventDefault()
		editDevice(id, formData)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Device not edited")
				}
				console.log(data.device, { data })
				setDevices(data.device as deviceSchema[])
			})
			.catch(err => console.log(err))
	}

	const handleDeleteDevice = (id: number): void => {
		deleteDevice(id)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Device not deleted")
				}
				setDevices(data.device as deviceSchema[])
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		let elements = document.querySelectorAll(".sidenav");
		M.Sidenav.init(elements[0]);
		M.Sidenav.init(elements[1], {
			edge: "right"
		});
		var elems = document.querySelectorAll('.fixed-action-btn');
		M.FloatingActionButton.init(elems);
		fetchRooms()
	}, []);

	const fetchRooms = (): void => {
		getRooms()
			.then(({ data: { data } }: roomSchema[] | any) => {
				setRooms(data)
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
			<div className="device-image"
					style={{ backgroundImage: 'url(' + lamp + ')' }}
				>
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

				<h4 className='devices-label'>Мои Комнаты</h4>

				<div className="fixed-action-btn plus-btn">
					<a className="btn-floating btn waves-effect purple darken-1">
						<i className="large material-icons" onClick={handleModalAddOpen}>add</i>
					</a>
				</div>
				<div>
					{isModalAddActive && (
						<Modal title="Добавление" onClose={handleModalAddClose}>
							<AddRoom saveRoom={handleSaveRoom} />
						</Modal>
					)}
				</div>

				<div className="room-container">
					{rooms
						?.map((room: roomSchema) => (
							<div className="room-item">
								<Button key={room.id} onClick={() => handleRoomClick(room.id)} className="people-room white" style={{ border: '1px solid #000', borderRadius: 20, background: '' }}>
									{room.name}<br></br>
								</Button>
								{/* <Button className="button" type="button" onClick={handleModalOpen}>
										Edit
									</Button>
									<div>
										{isModalActive && (
											<Modal title="Editing" onClose={handleModalClose}>
												<EditRoom editRoom={handleEditRoom} room={room} />
											</Modal>
										)}
									</div> */}
							</div>
						))}
				</div>

				{selectedRoom && (
					<div>
						<h4 className='devices-label'>Комната {selectedRoom}</h4>
						<Button className="button" type="button" onClick={handleModalOpen}>
							Edit
						</Button>
						{/* <div>
							{isModalActive && (
								<Modal title="Editing" onClose={handleModalClose}>
									<EditRoom editRoom={handleEditRoom} room={room} />
								</Modal>
							)}
						</div> */}
						{roomElements.map((device) => (
							<div>
								<DeviceItem
									key={device.id}
									deleteDevice={handleDeleteDevice}
									editDevice={handleEditDevice}
									device={device}
								/>
							</div>
						))}
					</div>
				)}


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

export default RoomsPage;