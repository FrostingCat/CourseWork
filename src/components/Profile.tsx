import React, {useState} from 'react';
import {editUser} from '../Api/ApiUser';
import '../css/materialize.css';
import '../css/profile.css';
import lamp from "../images/lamp.jpg";
import Modal from './modal';
import {useNavigate} from "react-router-dom";

function Profile() {
	const [isEditProfile, setEditProfile] = useState(false);
	const name = localStorage.getItem('name');
	const surname = localStorage.getItem('surname');
	const email = localStorage.getItem('email')
	const [formData, setFormData] = useState<userProfileSchema>({
		name: name!!,
		surname: surname!!
	});
	const navigate = useNavigate()

	function handleForm(e: any) {
		setFormData({
			...formData,
			[e.currentTarget.id]: e.currentTarget.value,
		})
	}

	const handleEditUser = (e: React.FormEvent): void => {
		e.preventDefault()
		editUser(formData, email!!)
			.then(({ status }) => {
				if (status !== 200) {
					throw new Error("Error! User not edited")
				}
				localStorage.setItem('name', formData.name)
				localStorage.setItem('surname', formData.surname)
			})
			.catch(err => console.log(err))
	}

	const handleExit = () => {
		localStorage.clear()
		navigate('/')
	}

	const handleEditProfileOpen = () => {
		setEditProfile(true);
	};

	const handleEditProfileClose = () => {
		setEditProfile(false);
	};

	return (
		<div className='profile-card'>
			<div style={{ borderRadius: '20px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.8)' }} className="card">
				<div className="card-header">
					<img src={lamp} />
				</div>
				<div className="card-content">
					<span className="card-title">Профиль</span>
					<p>{name} {surname}</p>
					<p>{email}</p>
				</div>
				<div className="card-action"
					style={{ backgroundColor: 'rgba(255,255,255,0)' }}
				>
					<a className="waves-effect btn-large button but-1" onClick={handleExit}  style={{backgroundColor: "#AB243E", width: "45%"}}>Выйти</a>
					<a className="waves-effect btn-large button" onClick={handleEditProfileOpen}  style={{backgroundColor: "#8722A2", width: "48%"}}>
						Редактировать
					</a>
					{isEditProfile && (
						<Modal title="Изменение данных" onClose={handleEditProfileClose}>
							<div className="card-content">
								<div className="input-field col s6">
									<input id="name" type="text" className="validate" onChange={handleForm}/>
									<label htmlFor="name" className="purple-text text-darken-4">Имя</label>
								</div>
								<div className="input-field col s6">
									<input id="surname" type="text" className="validate" onChange={handleForm}/>
									<label htmlFor="surname" className="purple-text text-darken-4">Фамилия</label>
								</div>
							</div>
							<div className="buttons">
								<a className="waves-effect purple darken-1 btn-large button" onClick={handleEditUser}>
									Изменить
								</a>
							</div>
						</Modal>
					)}
				</div>
			</div>
		</div>
	)
}

export default Profile;