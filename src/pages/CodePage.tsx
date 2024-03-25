import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {createUser} from '../Api/ApiUser';
import {RootState} from '../components/store';
import '../css/login.css';
import lamp from "../images/lampLogin.jpg";
import {useSelector} from 'react-redux';

function CodePage() {
	const [errorMessage, setErrorMessage] = useState<string>("");
	const navigate = useNavigate();

	const data = useSelector((state: RootState) => state.user);
	console.table(data);

	const checkCode = () => {
		const codeInput = document.getElementById('code') as HTMLInputElement;
		const code = codeInput.value;
		
		if (code === data.code) {
			createUser(data.firstName, data.lastName, data.email, data.password)
			.then(({ status, data }) => {
				if (status !== 201) {
					throw new Error("Error! User is not registered")
				}
				localStorage.setItem('token', data.token)
				navigate('/home');
			})
			.catch(err => console.log(err))
		} else {
			setErrorMessage("Введен неверный код");
		}
	}

	return (
		<div className="login">
			<div className="image">
				<img className="login-image" src={lamp} />
			</div>
			<div className="col s12 m6">
				<div className="card white log">
					<div className="card-content">
						<span className="card-title">Ввод одноразового кода</span>
						<div className="input-field col s12">
							<input id="code" type="text" className="validate" />
							<label htmlFor="text" className="purple-text text-darken-4">Код</label>
						</div>
						{errorMessage && <p className="error-message">{errorMessage}</p>}
					</div>
					<div className="buttons">
						<a className="waves-effect purple darken-1 btn-large button" onClick={checkCode}>
							Войти
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CodePage;