import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";

type Props = roomProps & {
    editRoom: (e: React.FormEvent, id: string, formData: roomSchema) => void
}

const EditRoom: React.FC<Props> = ({room, editRoom}) => {
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const [formData, setFormData] = useState<roomSchema>({
        id: room.id,
        name: room.name
    });

    function handleForm(e: any) {
        const key = e.currentTarget.id;

        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        })
    }

    return (
        <div>
            <div className="card-content">
                <div className="input-field col s6">
                    <input id="name" type="text" className="validate" onChange={handleForm}/>
                    <label htmlFor="name" className="purple-text text-darken-4">Название</label>
                </div>

                <div className="buttons">
                    <a className="waves-effect purple darken-1 btn-large button"
                       onClick={(e) => editRoom(e, room.id, formData)}>
                        Изменить
                    </a>
                </div>
            </div>
        </div>
    )
}

export default EditRoom