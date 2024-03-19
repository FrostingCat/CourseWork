import './App.css';
import { BrowserRouter as Router, Routes, Route }
	from "react-router-dom";

import MainPage from "./pages/MainPage"
import LoginPage from "./pages/LoginPage"
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import CodePage from './pages/CodePage';
import ProfilePage from './pages/ProfilePage';
import DevicesPage from './pages/DevicesPage';
import RoomsPage from './pages/RoomsPage';

function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/registration" element={<RegistrationPage />} />
					<Route path="/code" element={<CodePage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/devices" element={<DevicesPage />} />
					<Route path="/rooms" element={<RoomsPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
