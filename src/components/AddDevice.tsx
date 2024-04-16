import React, {useEffect, useState} from 'react'
import '../css/adddevice.css'
import {addRoom, getRooms} from '../Api/ApiRooms';

type Props = {
    saveDevice: (e: React.FormEvent, formData: deviceAddSchema) => void
}

enum type {
    LAMP = 'Лампа',
    LIGHT = 'Лента',
    CAMERA = 'Камера'
}

const AddDevice: React.FC<Props> = ({saveDevice}) => {
    const [rooms, setRooms] = useState<roomSchema[]>([]);
    const [errorMessage, setErrorMessage] = useState("")
    const [formData, setFormData] = useState<deviceAddSchema>({
        name: '',
        type: type.CAMERA,
        room_id: 0,
        ip: ''
    });

    useEffect(() => {
        fetchRooms()
    }, []);

    const fetchRooms = (): void => {
        getRooms()
            .then((response) => {
                setRooms(response.data)
            })
            .catch((err: Error) => console.log(err))
    }

    function handleForm(e: any): void {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    const handleSaveRoom = (): void => {
        const roomInput = document.getElementById('room') as HTMLInputElement;
        const room = roomInput.value;
        addRoom(room)
            .then(({status, data}) => {
                if (status !== 201) {
                    alert("Error! Room not saved")
                }
                console.log(data.room, {data})
                fetchRooms()
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className="card-content">
                <div className="input-field col s6">
                    <input id="name" type="text" className="validate" onChange={handleForm}/>
                    <label htmlFor="name" className="purple-text text-darken-4">Название</label>
                </div>
                <div className="input-field col s6">
                    <select onChange={handleForm} id='type' name='type'
                            className="purple-text text-darken-4 select">
                        <option value="" disabled selected>Тип устройства</option>
                        <option value={type.LAMP}>Лампа</option>
                        <option value={type.LIGHT}>Лента</option>
                        <option value={type.CAMERA}>Камера</option>
                    </select>
                </div>
                <div className="input-field col s6">
                    <input id="room" type="text" className="validate"/>
                    <label htmlFor="room" className="purple-text text-darken-4">Новая комната</label>
                </div>
                <div className="buttons">
                    <a className="waves-effect purple darken-1 btn-large button" onClick={handleSaveRoom}>
                        Добавить
                    </a>
                </div>
                <div className="input-field col s6">
                    <select onChange={handleForm} id='room_id' name='room_id'
                            className='purple-text text-darken-4 select last'>
                        <option value="" disabled selected>Выберите комнату</option>
                        {rooms.map((room, index) => (
                            <option key={index} value={room.id}>{room.name}</option>
                        ))}
                    </select>
                </div>
                <div className="input-field col s6">
                    <input id="ip" type="text" className="validate" onChange={handleForm}/>
                    <label htmlFor="ip" className="purple-text text-darken-4">IP</label>
                </div>
            </div>
            <div className="buttons" onClick={(e) => saveDevice(e, formData)}>
                <a className="waves-effect purple darken-1 btn-large button">
                    Добавить
                </a>
            </div>
        </div>
    )
}

export default AddDevice