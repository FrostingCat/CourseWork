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
import {WebSocketManager} from "../webSocket/WebSocketManager";

enum type {
    LAMP = 'Лампа',
    LIGHT = 'Лента',
    CAMERA = 'Камера'
}

function DevicesPage() {
    const [devices, setDevices] = useState<deviceGetSchema[]>([])
    const [isModalAddActive, setModalAddActive] = useState(false);

    const checkFormData = (formData: deviceAddSchema): boolean => {
        if (!formData.name || !formData.type || !formData.ip || !formData.room_id) {
            alert("Заполните все поля");
            return false
        }
        return true
    }

    const handleSaveDevice = (e: React.FormEvent, formData: deviceAddSchema): void => {
        e.preventDefault()
        const webSocketManager = WebSocketManager.getInstance("ws://192.168.65.168:8000/security/client")
        webSocketManager.sendMessage(formData.ip)
        if (checkFormData(formData)) {
            addDevice(formData)
                .then(({status, data}) => {
                    if (status !== 201) {
                        alert("Error! Device not saved")
                    }
                    fetchDevices()
                })
                .catch(err => {
                    alert("Device with such IP does not exist")
                    console.log(err)
                })
        }
    }

    const handleEditDevice = (e: React.FormEvent, formData: deviceSchema): void => {
        e.preventDefault()
        editDevice(formData)
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error("Error! Device not edited")
                }
                fetchDevices()
            })
            .catch(err => console.log(err))
    }

    const handleDeleteDevice = (id: number): void => {
        deleteDevice(id)
            .then(({status, data}) => {
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
            .then((response) => {
                setDevices(response.data)
            })
            .catch((err: Error) => console.log(err))
    }

    setInterval(function () {
        document.getElementById("digital-clock")!!.innerHTML = getDateTime();
    }, 1000);

    return (
        <motion.div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <SlideBar/>

            <h4 className='devices-label'>Мои Устройства</h4>

            <div className="fixed-action-btn plus-btn">
                <a className="btn-floating btn waves-effect purple darken-1">
                    <i className="large material-icons" onClick={handleModalAddOpen}>add</i>
                </a>
            </div>
            <div>
                {isModalAddActive && (
                    <Modal title="Добавление устройства" onClose={handleModalAddClose}>
                        <AddDevice saveDevice={handleSaveDevice}/>
                    </Modal>
                )}
            </div>

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

        </motion.div>
    )
}

export default DevicesPage;