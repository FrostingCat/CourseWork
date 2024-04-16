import {getDateTime} from '../components/DateUtil';
import Profile from '../components/Profile';
import '../css/materialize.css';
import '../css/profilepage.css';
import SlideBar from "../components/Slidebar";
import {useEffect} from "react";

function ProfilePage() {
	useEffect(() => {
		const timer = setInterval(() => {
			const clockElement = document.getElementById("digital-clock");
			if (clockElement) {
				clockElement.innerHTML = getDateTime();
			}
		}, 1000);

		// Очистка таймера при размонтировании компонента
		return () => clearInterval(timer);
	}, []);

	return (
		<div>
			<SlideBar/>
			<div className="row profile-row">
				<Profile />
			</div>
		</div>
	)
}

export default ProfilePage;