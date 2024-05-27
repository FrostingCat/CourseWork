import '../css/devicespage.css'
import '../css/roomspage.css'
import '../css/materialize.css'
import M from 'materialize-css'
import React, {useEffect, useState} from 'react';
import {addRoom, deleteRoom, editRoom, getDevicesByRoomId, getRooms} from '../Api/ApiRooms'
import {motion} from "framer-motion";
import {Button} from '@material-ui/core'
import Modal from "../components/modal";
import AddRoom from '../components/AddRoom';
import {getDateTime} from '../components/DateUtil';
import {addDevice, deleteDevice, editDevice} from '../Api/ApiDevices';
import DeviceItem from '../components/DeviceItem'
import SlideBar from "../components/Slidebar";
import EditRoom from "../components/EditRoom";
import AddDeviceToRoom from "../components/AddDeviceToRoom";

enum type {
    LAMP = 'Лампа',
    LIGHT = 'Лента',
    CAMERA = 'Камера'
}

function RoomsPage() {
    const [rooms, setRooms] = useState<roomSchema[]>([])
    const [isModalActive, setModalActive] = useState(false);
    const [isModalAddActive, setModalAddActive] = useState(false);
    const [isModalDeviceAddActive, setModalDeviceAddActive] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<roomSchema | null>(null);
    const [roomElements, setRoomElements] = useState<devicesByRoom[]>([]);

    const checkFormData = (formData: roomSchema): boolean => {
        if (!formData.name) {
            alert("Fill in all the fields");
            return false
        }
        return true
    }

    const checkFormDeviceData = (formData: deviceAddSchema): boolean => {
        if (!formData.name || !formData.type || !formData.ip) {
            alert("Заполните все поля");
            return false
        }
        return true
    }

    const handleSaveRoom = (e: React.FormEvent, formData: roomSchema): void => {
        e.preventDefault()
        if (checkFormData(formData)) {
            addRoom(formData.name)
                .then(({status}) => {
                    if (status !== 201) {
                        alert("Error! Room not saved")
                    }
                    fetchRooms()
                })
                .catch(err => console.log(err))
        }
        console.log("error")
    }

    const handleEditRoom = (e: React.FormEvent, id: string, formData: roomSchema): void => {
        e.preventDefault()
        editRoom(id, formData)
            .then(({status}) => {
                if (status !== 200) {
                    throw new Error("Error! Room not edited")
                }
                fetchRooms()
            })
            .catch(err => console.log(err))
    }

    const handleDeleteRoom = (id: string): void => {
        deleteRoom(id)
            .then(({status}) => {
                if (status !== 200) {
                    throw new Error("Error! Room not deleted")
                }
                fetchRooms()
                setRoomElements([])
                setSelectedRoom(null)
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

    const handleModalDeviceAddOpen = () => {
        setModalDeviceAddActive(true);
    };
    const handleModalDeviceAddClose = () => {
        setModalDeviceAddActive(false);
    };

    const handleRoomClick = (room: roomSchema) => {
        setSelectedRoom(room);
        fetchDevicesById(room.id);
    };

    const fetchDevicesById = (id: string): void => {
        getDevicesByRoomId(id)
            .then(({data}: devicesByRoom[] | any) => {
                setRoomElements(data)
            })
            .catch((err: Error) => console.log(err))
    }

    const handleSaveDevice = (e: React.FormEvent, formData: deviceAddSchema): void => {
        e.preventDefault()
        formData.room_id = parseInt(selectedRoom!!.id)
        if (checkFormDeviceData(formData)) {
            addDevice(formData)
                .then(({status}) => {
                    if (status !== 201) {
                        alert("Error! Device not saved")
                    }
                    fetchDevicesById(selectedRoom!!.id)
                })
                .catch(err => console.log(err))
        }
    }

    const handleEditDevice = (e: React.FormEvent, formData: deviceSchema): void => {
        e.preventDefault()
        editDevice(formData)
            .then(({status}) => {
                if (status !== 200) {
                    throw new Error("Error! Device not edited")
                }
                fetchDevicesById(selectedRoom!!.id)
            })
            .catch(err => console.log(err))
    }

    const handleDeleteDevice = (id: number): void => {
        deleteDevice(id)
            .then(({status}) => {
                if (status !== 200) {
                    throw new Error("Error! Device not deleted")
                }
                fetchDevicesById(selectedRoom!!.id)
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

                <h4 className='devices-label'>Мои Комнаты</h4>
                <div className="fixed-action-btn plus-btn">
                    <a className="btn-floating btn waves-effect purple darken-1">
                        <i className="large material-icons" onClick={handleModalAddOpen}>add</i>
                    </a>
                </div>
                <div>
                    {isModalAddActive && (
                        <Modal title="Добавление комнаты" onClose={handleModalAddClose}>
                            <AddRoom saveRoom={handleSaveRoom}/>
                        </Modal>
                    )}
                </div>

                <div className="room-container">
                    {rooms
                        ?.map((room: roomSchema) => (
                            <div className="room-item">
                                <Button key={room.id} onClick={() => handleRoomClick(room)}
                                        className="people-room purple darken-3"
                                        style={{
                                            borderRadius: 25,
                                            fontSize: 17,
                                            color: "white",
                                            boxShadow: '0.5px 0.5px 8px 1px rgba(255, 255, 255, 0.6)'
                                        }}>
                                    {room.name}<br></br>
                                </Button>
                            </div>
                        ))}
                </div>

                {selectedRoom && (
                    <div>
                        <div className='room'>
                            <h4 className='devices-label'>{selectedRoom.name}</h4>
                            <button className="material-icons delete-button delete" style={{backgroundColor: "#AB243E"}}
                                    onClick={() => handleDeleteRoom(selectedRoom.id)}>delete
                            </button>
                            <button className="material-icons delete-button edit" style={{backgroundColor: "#8722A2"}}
                                    onClick={handleModalOpen}>edit
                            </button>
                            <button className="material-icons delete-button edit" style={{backgroundColor: "#6124AB"}}
                                    onClick={handleModalDeviceAddOpen}>add
                            </button>
                        </div>
                        {isModalActive && (
                            <Modal title="Изменить комнату" onClose={handleModalClose}>
                                <EditRoom editRoom={handleEditRoom} room={selectedRoom}/>
                            </Modal>
                        )}
                        {isModalDeviceAddActive && (
                            <Modal title="Добавление устройства" onClose={handleModalDeviceAddClose}>
                                <AddDeviceToRoom saveDevice={handleSaveDevice}/>
                            </Modal>
                        )}
                        {roomElements?.map((device) => {
                            const transformedDevice: deviceSchema = {
                                id: String(device.device_id),
                                room_id: selectedRoom.id,
                                name: device.name,
                                type: device.type as type,
                                state: device.state
                            };

                            return (
                                <div key={device.device_id}>
                                    <DeviceItem
                                        deleteDevice={handleDeleteDevice}
                                        editDevice={handleEditDevice}
                                        device={transformedDevice}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default RoomsPage;