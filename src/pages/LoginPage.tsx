import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authorizeUser } from '../Api/ApiUser';
import { addEmail, addFirstName, addLastName } from '../components/codeSlice';
import '../css/login.css';
import lamp from "../images/lampLogin.jpg";

function LoginPage() {
	const [errorMessage, setErrorMessage] = useState<string>("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const checkUser = () => {
		const emailInput = document.getElementById('email') as HTMLInputElement;
		const passwordInput = document.getElementById('password_inline') as HTMLInputElement;
		const email = emailInput.value;
		const password = passwordInput.value;

		authorizeUser(email, password)
			.then(({ status, data }) => {
				if (status !== 201) {
					setErrorMessage("Неправильная почта или пароль");
					throw new Error("Error! User is not registered")
				}
				dispatch(addFirstName(data.name));
				dispatch(addLastName(data.surname));
				dispatch(addEmail(email));
				navigate('/home');
			})
			.catch(err => console.log(err))
	}
	return (
		<div className="login">
			<div className="image">
				<img className="login-image" src={lamp} />
			</div>
			<div className="col s12 m6">
				<div className="card white log">
					<div className="card-content">
						<span className="card-title">Вход</span>
						<div className="input-field col s12">
							<input id="email" type="email" className="validate" />
							<label htmlFor="email" className="purple-text text-darken-4">Email</label>
						</div>
						<div className="input-field inline">
							<input id="password_inline" type="password" className="validate" />
							<label htmlFor="password_inline" className="purple-text text-darken-4">Password</label>
							<span className="helper-text" ></span>
						</div>
						{errorMessage && <p className="error-message">{errorMessage}</p>}
					</div>
					<div className="buttons">
						<a className="waves-effect purple darken-1 btn-large button" onClick={checkUser}>
							Войти
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

export default LoginPage;