import '../css/login.css'
import lamp from "../images/lampLogin.jpg"

function CodePage() {
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
							<input id="text" type="text" className="validate" />
							<label htmlFor="text" className="purple-text text-darken-4">Код</label>
						</div>
					</div>
					<div className="buttons">
						<a href="/home" className="waves-effect purple darken-1 btn-large button">Войти</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CodePage;