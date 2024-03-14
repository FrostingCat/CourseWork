import '../css/profilepage.css'
import '../css/materialize.css'
import lamp from "../images/lamp.jpg"

function Profile() {
	return (
		<div>
			<div className="card deep-purple lighten-4">
				<div className="card-header">
					<img src={lamp} />
				</div>
				<div className="card-content">
					<span className="card-title">Профиль</span>
					<p>Имя Фамилия</p>
					<p>Почта</p>
				</div>
				<div className="card-action">
					<a href="/" className="waves-effect pink darken-3 btn-large button but-1">Выйти</a>
					<a href="/edit" className="waves-effect purple darken-1 btn-large button">Редактировать</a>
				</div>
			</div>
		</div>
	)
}

export default Profile;