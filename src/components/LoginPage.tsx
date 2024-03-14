import '../css/login.css'
import lamp from "../images/lampLogin.jpg"

function LoginPage() {
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
							<span className="helper-text" data-error="злой пароль" data-success="хороший пароль"></span>
						</div>
					</div>
					<div className="buttons">
						<a href="/home" className="waves-effect purple darken-1 btn-large button">Войти</a>
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