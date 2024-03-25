import '../css/devicespage.css'
import '../css/materialize.css'
import M from 'materialize-css'
import lamp from "../images/lamp.jpg"
import React, {useEffect, useState} from 'react';
import {addRoom, deleteRoom, editRoom, getDevicesByRoomId, getRooms} from '../Api/ApiRooms'
import {motion} from "framer-motion";
import {Button} from '@material-ui/core'
import Modal from "../components/modal";
import AddRoom from '../components/AddRoom';
import {getDateTime} from '../components/DateUtil';
import {deleteDevice, editDevice} from '../Api/ApiDevices';
import DeviceItem from '../components/DeviceItem'
import SlideBar from "../components/Slidebar";

enum type {
    LAMP = 'Лампа',
    LIGHT = 'Лента',
    CAMERA = 'Камера'
}

function RoomsPage() {
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
            addRoom(formData.name)
                .then(({status, data}) => {
                    if (status !== 201) {
                        alert("Error! Room not saved")
                    }
                    console.log(data.room, {data})
                    fetchRooms()
                })
                .catch(err => console.log(err))
        }
        console.log("error")
    }

    const handleEditRoom = (e: React.FormEvent, id: string, formData: roomSchema): void => {
        e.preventDefault()
        editRoom(id, formData)
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error("Error! Room not edited")
                }
                console.log(data.room, {data})
                fetchRooms()
            })
            .catch(err => console.log(err))
    }

    const handleDeleteRoom = (id: string): void => {
        deleteRoom(id)
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error("Error! Room not deleted")
                }
                fetchRooms()
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
            .then(({data: {data}}: deviceSchema[] | any) => {
                setRoomElements(data)
            })
            .catch((err: Error) => console.log(err))
    }

    const handleEditDevice = (e: React.FormEvent, formData: deviceSchema): void => {
        e.preventDefault()
        editDevice(formData)
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error("Error! Device not edited")
                }
                console.log(data.device, {data})
                setDevices(data.device as deviceSchema[])
            })
            .catch(err => console.log(err))
    }

    const handleDeleteDevice = (id: number): void => {
        deleteDevice(id)
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error("Error! Device not deleted")
                }
                setDevices(data.device as deviceSchema[])
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        const elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems);
        fetchRooms()
    }, []);

    const fetchRooms = (): void => {
        getRooms()
            .then((response) => {
                setRooms(response.data)
            })
            .catch((err: Error) => console.log(err))
    }

    setInterval(function () {
        document.getElementById("digital-clock")!!.innerHTML = getDateTime();
    }, 1000);

    return (
        <motion.div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <div>
				<SlideBar/>

                <ul id="slide-out" className="sidenav sidenav-fixed small">
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img src={lamp}/>
                            </div>
                            <a><img className="circle" src={lamp}/></a>
                            <a>
                                <div id="digital-clock"></div>
                            </a>
                        </div>
                    </li>
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
                            <AddRoom saveRoom={handleSaveRoom}/>
                        </Modal>
                    )}
                </div>

                <div className="room-container">
                    {rooms
                        ?.map((room: roomSchema) => (
                            <div className="room-item">
                                <Button key={room.id} onClick={() => handleRoomClick(room.id)}
                                        className="people-room white"
                                        style={{border: '1px solid #000', borderRadius: 20, background: ''}}>
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