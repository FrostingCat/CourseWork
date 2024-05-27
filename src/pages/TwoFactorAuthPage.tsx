import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {checkTwoFactorAuth} from '../Api/ApiUser';
import '../css/login.css';
import lamp from "../images/lampLogin.jpg";

function TwoFactorAuthPage() {
	const [errorMessage, setErrorMessage] = useState<string>("");
    const [otp, setOtp] = useState<string>('');
	const [messageSent, setMessageSent] = useState<boolean>(false);
	
    const navigate = useNavigate();
	const email = localStorage.getItem('email')

    const handleVerifyOtp = async () => {
		setMessageSent(true);
		checkTwoFactorAuth(otp)
		.then(({status, data}) => {
			if (status !== 200) {
				setErrorMessage("неправильный код");
				throw new Error("Error! User typed in wrong message")
			}
			localStorage.setItem('token', data.token)
			localStorage.removeItem('2fa-token');
			navigate('/profile');
		})
		.catch(err => {
			alert("Неверный код")
			console.log(err)
		})
    };

    return (
		<div className="login">
            <div className="image">
                <img className="login-image" src={lamp}/>
            </div>
            <div className="col s12 m6">
                <div className="card white log">
                    <div className="card-content">
                        <span className="card-title">Аутентификация</span>
                        <div className="input-field col s12">
                            <input id="code" type="text" className="validate" onChange={(e) => setOtp(e.target.value)}/>
                            <label htmlFor="text" className="purple-text text-darken-4">Код</label>
                        </div>
						{messageSent && <p className="success-message">Вам отправлен код на почту {email}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                    <div className="buttons">
                        <a className="waves-effect purple darken-1 btn-large button" 
						onClick={handleVerifyOtp}>
                            Войти
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TwoFactorAuthPage;