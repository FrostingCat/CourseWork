import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../Api/ApiUser';
import { addEmail, addFirstName, addLastName } from '../components/codeSlice';
import '../css/materialize.css';
import '../css/profile.css';
import lamp from "../images/lamp.jpg";
import Modal from './modal';
import { RootState } from './store';

function Profile() {
	const data = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const [isEditProfile, setEditProfile] = useState(false);

	const [formData, setFormData] = useState<userProfileSchema>({
		name: data.firstName,
		surname: data.lastName
	});

	function handleForm(e: any) {
		setFormData({
			...formData,
			[e.currentTarget.id]: e.currentTarget.value,
		})
	}

	const handleEditUser = (e: React.FormEvent): void => {
		e.preventDefault()
		editUser(formData, data.email)
			.then(({ status }) => {
				if (status !== 200) {
					throw new Error("Error! Device not edited")
				}
				dispatch(addFirstName(formData.name));
				dispatch(addLastName(formData.surname));
				dispatch(addEmail(data.email));
			})
			.catch(err => console.log(err))
	}

	const handleEditProfileOpen = () => {
		setEditProfile(true);
	};

	const handleEditProfileClose = () => {
		setEditProfile(false);
	};

	return (
		<div>
			<div className="card deep-purple lighten-4">
				<div className="card-header">
					<img src={lamp} />
				</div>
				<div className="card-content">
					<span className="card-title">Профиль</span>
					<p>{data.firstName} {data.lastName}</p>
					<p>{data.email}</p>
				</div>
				<div className="card-action">
					<a href="/" className="waves-effect pink darken-3 btn-large button but-1">Выйти</a>
					<a className="waves-effect purple darken-1 btn-large button" onClick={handleEditProfileOpen}>
						Редактировать
					</a>
					{isEditProfile && (
						<Modal title="Изменение данных" onClose={handleEditProfileClose}>
							<div className='Add-Form'>
								<FormControl>
									<InputLabel htmlFor='name'>Имя</InputLabel>
									<Input onChange={handleForm} type='text' id='name' />
								</FormControl>
								<FormControl>
									<InputLabel htmlFor='surname'>Фамилия</InputLabel>
									<Input onChange={handleForm} type='text' id='surname' />
								</FormControl>
							</div>
							<Button disabled={formData === undefined ? true : false} onClick={(e) =>
								handleEditUser(e)}>
								Изменить
							</Button>
						</Modal>
					)}
				</div>
			</div>
		</div>
	)
}

export default Profile;