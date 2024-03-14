import '../css/devicespage.css'
import '../css/materialize.css'
import M from 'materialize-css'
import lamp from "../images/lamp.jpg"
import React, { useEffect, useState } from 'react';
import { getRooms, addRoom, deleteRoom, editRoom } from '../Api/ApiRooms'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button, Typography } from '@material-ui/core'
import Modal from "../components/modal";
import RoomItem from '../components/RoomsItem'
import EditRoom from '../components/EditRoom';
import AddRoom from '../components/AddRoom';
import { getDateTime } from '../components/DateUtil';

function RoomsPage() {
	const [rooms, setRooms] = useState<roomSchema[]>([])
	const [isModalActive, setModalActive] = useState(false);
	const [isModalAddActive, setModalAddActive] = useState(false);

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
			addRoom(formData)
				.then(({ status, data }) => {
					if (status !== 200) {
						alert("Error! Room not saved")
					}
					console.log(data.room, { data })
					setRooms(data.room)
				})
				.catch(err => console.log(err))
		}
		console.log("error")
	}

	const handleEditRoom = (e: React.FormEvent, _id: string, formData: roomSchema): void => {
		e.preventDefault()
		editRoom(_id, formData)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Room not edited")
				}
				console.log(data.room, { data })
				setRooms(data.room)
			})
			.catch(err => console.log(err))
	}

	const handleDeleteRoom = (_id: string): void => {
		deleteRoom(_id)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Room not deleted")
				}
				setRooms(data.room)
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

	useEffect(() => {
		let elements = document.querySelectorAll(".sidenav");
		M.Sidenav.init(elements[0]);
		M.Sidenav.init(elements[1], {
			edge: "right"
		});
		var elems = document.querySelectorAll('.fixed-action-btn');
		M.FloatingActionButton.init(elems);
		//fetchRooms()
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
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
			<div>
				<ul id="slide-out" className="sidenav sidenav-fixed big">
					<li><div className="user-view">
						<div className="background">
							<img src={lamp} />
						</div>
						<a><img className="circle" src={lamp} /></a>
						<a><span className="white-text name">Name</span></a>
						<a><span className="white-text email"></span></a>
					</div></li>
					<li><a className="waves-effect" href="/home">Дом</a></li>
					<li><div className="divider"></div></li>
					<li><a className="waves-effect" href="/rooms">Комнаты</a></li>
					<li><div className="divider"></div></li>
					<li><a className="waves-effect" href="/devices">Устройства</a></li>
					<li><div className="divider"></div></li>
					<li><a className="waves-effect" href="/profile">Профиль</a></li>
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

				{/* <button onClick={handleSaveDevice}>
					<AddIcon /> Add Device
				</button> */}

				{/* <Box className='paper'
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					'& > :not(style)': {
						m: 1,
						height: 128,
					},
				}}
			>
				<Paper elevation={3} />
			</Box> */}

				<AnimatePresence>
					{rooms
						?.map((room: roomSchema) => (
							<div>
								<RoomItem
									key={room._id}
									deleteRoom={handleDeleteRoom}
									room={room}
								/>
								<Link to={`http://localhost:3000/rooms/${room._id}`} state={{ room: room }} >
									<Button>View</Button>
								</Link>
								<Button className="button" type="button" onClick={handleModalOpen}>
									Edit
								</Button>
								<div>
									{isModalActive && (
										<Modal title="Editing" onClose={handleModalClose}>
											<EditRoom editRoom={handleEditRoom} room={room} />
										</Modal>
									)}
								</div>
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

export default RoomsPage;