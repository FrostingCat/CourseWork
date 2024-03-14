import '../css/profilepage.css'
import '../css/materialize.css'
import M from 'materialize-css'
import lamp from "../images/lamp.jpg"
import { useEffect } from 'react';
import Profile from '../components/Profile';
import { getDateTime } from '../components/DateUtil';

function ProfilePage() {
	useEffect(() => {
		let elements = document.querySelectorAll(".sidenav");
		M.Sidenav.init(elements[0]);
		M.Sidenav.init(elements[1], {
			edge: "right"
		});
	}, []);

	setInterval(function () {
		var currentTime = getDateTime();
		document.getElementById("digital-clock")!!.innerHTML = currentTime;
	}, 1000);

	return (
		<div>
			<ul id="slide-out" className="sidenav sidenav-fixed big">
				<li><div className="user-view">
					<div className="background">
						<img src={lamp} />
					</div>
					<a><img className="circle" src={lamp} /></a>
					<a><span className="white-text name">Name</span></a>
					<a><span className="white-text email"></span></a>
				</div></li>
				<li><a className="waves-effect" href="/home">Дом</a></li>
				<li><div className="divider"></div></li>
				<li><a className="waves-effect" href="/rooms">Комнаты</a></li>
				<li><div className="divider"></div></li>
				<li><a className="waves-effect" href="/devices">Устройства</a></li>
				<li><div className="divider"></div></li>
				<li><a className="waves-effect" href="/profile">Профиль</a></li>
			</ul>

			<ul id="slide-out" className="sidenav sidenav-fixed small">
				<li><div className="user-view">
					<div className="background">
						<img src={lamp} />
					</div>
					<a><img className="circle" src={lamp} /></a>
					<a><div id="digital-clock"></div></a>
				</div></li>
			</ul>

			{/* <div className="row profile-row">
				<div className="col s12 m6">
					<div className="card">
						<div className="card-image">
							<img src={lamp} />
							<span className="card-title">Профиль</span>
							<a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
						</div>
						<div className="card-content">
							<p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
						</div>
					</div>
				</div>
			</div> */}

			<div className="row profile-row">
				<div className="col s12 m6 ">
					<Profile/>
				</div>
			</div>
		</div>
	)
}

export default ProfilePage;