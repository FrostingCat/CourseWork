import React, {useState} from 'react'
import {Button} from '@material-ui/core'

type Props = deviceProps & {
	editDevice: (e: React.FormEvent, id: string, formData: deviceSchema) => void
}

const EditDevice: React.FC<Props> = ({ device, editDevice }) => {
	const [errorMessage, setErrorMessage] = useState("")

	const [formData, setFormData] = useState<deviceSchema>({
		id: device.id,
		room_id: device.room_id,
		name: device.name,
		type: device.type,
		state: false
	});

	function handleForm(e: any) {
		setFormData({
			...formData,
			[e.currentTarget.id]: e.currentTarget.value,
		})
	}

	return (
		<div>
			<div className="card-content">
				<div className="input-field col s6">
					<input id="name" type="text" className="validate" onChange={handleForm} />
					<label htmlFor="name" className="purple-text text-darken-4">Название</label>
				</div>
				<div className="input-field col s6">
					<select onChange={handleForm} id='type' name='type' className="purple-text text-darken-4 select">
						<option value="" disabled selected>Тип устройства</option>
						<option value={type.LAMP}>Лампа</option>
						<option value={type.LIGHT}>Лента</option>
						<option value={type.CAMERA}>Камера</option>
					</select>
				</div>
				<div className="buttons">
					<a className="waves-effect purple darken-1 btn-large button" onClick={(e) =>
						editDevice(e, device.id, formData)}>
						Изменить
					</a>
				</div>
			</div>
			<Button disabled={formData === undefined} onClick={(e) =>
				editDevice(e, device.id, formData)}>
				Изменить
			</Button>
		</div>
	)
}

export default EditDevice