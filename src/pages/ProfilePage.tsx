import {getDateTime} from '../components/DateUtil';
import Profile from '../components/Profile';
import '../css/materialize.css';
import '../css/profilepage.css';
import lamp from "../images/lamp.jpg";
import SlideBar from "../components/Slidebar";

function ProfilePage() {
	setInterval(function () {
		document.getElementById("digital-clock")!!.innerHTML = getDateTime();
	}, 1000);

	return (
		<div>
			<SlideBar/>

			<ul id="slide-out" className="sidenav sidenav-fixed small">
				<li><div className="user-view">
					<div className="background">
						<img src={lamp} />
					</div>
					<a><img className="circle" src={lamp} /></a>
					<a><div id="digital-clock"></div></a>
				</div></li>
			</ul>

			<div className="row profile-row">
				<Profile />
			</div>
		</div>
	)
}

export default ProfilePage;