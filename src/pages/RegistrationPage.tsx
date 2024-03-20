import bcrypt from 'bcryptjs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { checkCodeUser } from '../Api/ApiUser';
import { addCode, addEmail, addFirstName, addLastName, addPassword } from '../components/codeSlice';
import '../css/registration.css';
import lamp from "../images/lampLogin.jpg";

function RegistrationPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleRegistration = () => {
		const firstNameInput = document.getElementById('first_name') as HTMLInputElement;
		const lastNameInput = document.getElementById('last_name') as HTMLInputElement;
		const emailInput = document.getElementById('email') as HTMLInputElement;
		const passwordInput = document.getElementById('password_inline') as HTMLInputElement;

		const firstName = firstNameInput.value;
		const lastName = lastNameInput.value;
		const email = emailInput.value;
		const password = passwordInput.value;

		dispatch(addFirstName(firstName));
		dispatch(addLastName(lastName));
		dispatch(addEmail(email));

		const salt = bcrypt.genSaltSync(10);

		const hashedPassword = bcrypt.hashSync(password, salt);
		dispatch(addPassword(hashedPassword));

		console.log(hashedPassword);

		checkCodeUser(email)
			.then(({ status, data }) => {
				if (status === 502) {
					throw new Error("Error! User is not registered")
				}
				dispatch(addCode(data.code.code));
				//
			})
			.catch(err => console.log(err))

		navigate('/code');
	}

	return (
		<div className="login">
			<div className="image">
				<img className="login-image" src={lamp} />
			</div>
			<div className="col s12 m6">
				<div className="card white reg">
					<div className="card-content">
						<span className="card-title">Регистрация</span>
						<div className="input-field col s6">
							<input id="first_name" type="text" className="validate" />
							<label htmlFor="first_name" className="purple-text text-darken-4">Имя</label>
						</div>
						<div className="input-field col s6">
							<input id="last_name" type="text" className="validate" />
							<label htmlFor="last_name" className="purple-text text-darken-4">Фамилия</label>
						</div>
						<div className="input-field col s12">
							<input id="email" type="email" className="validate" />
							<label htmlFor="email" className="purple-text text-darken-4">Email</label>
						</div>
						<div className="input-field inline">
							<input id="password_inline" type="password" className="validate" />
							<label htmlFor="password_inline" className="purple-text text-darken-4">Password</label>
							<span className="helper-text" data-error="злой пароль" data-success="хороший пароль"></span>
						</div>
					</div>
					<div className="buttons">
						<a className="waves-effect purple darken-1 btn-large button" onClick={handleRegistration}>
							Регистрация
						</a>
					</div>
					{/* <div className="card-action">
						<a href="#" className="black-text">Войти</a>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default RegistrationPage;