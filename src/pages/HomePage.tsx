import '../css/homepage.css'
import '../css/materialize.css'
import M from 'materialize-css'
import lamp from "../images/lamp.jpg"
import { useEffect } from 'react';
import { getDateTime } from '../components/DateUtil';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../components/store';

function HomePage() {
	var navigate = useNavigate();
	const data = useSelector((state: RootState) => state.user);
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
			<div className="image">
				<img className="login-image" src={lamp} />
			</div>
			<ul id="slide-out" className="sidenav sidenav-fixed big">
				<li><div className="user-view">
					<div className="background">
						<img src={lamp} />
					</div>
					<a><img className="circle" src={lamp} /></a>
					<a><span className="white-text name">{data.firstName} {data.lastName}</span></a>
					<a><span className="white-text email">{data.email}</span></a>
				</div></li>
				<li><a className="waves-effect" onClick={() => navigate("/home")}> Дом</a></li>
				<li><div className="divider"></div></li>
				<li><a className="waves-effect" onClick={() => navigate("/rooms")}>Комнаты</a></li>
				<li><div className="divider"></div></li>
				<li><a className="waves-effect" onClick={() => navigate("/devices")}>Устройства</a></li>
				<li><div className="divider"></div></li>
				<li><a className="waves-effect" onClick={() => navigate("/profile")}>Профиль</a></li>
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
		</div>
	)
}

export default HomePage;