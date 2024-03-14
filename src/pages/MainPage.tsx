import '../css/style.css'
import '../css/materialize.css'
import M from 'materialize-css'
import smart from "../images/smart3.jpg"
import smart2 from "../images/smart4.jpg"
import camera from "../images/camera.jpg"
import room from "../images/room.jpg"
import lamp from "../images/lamp.jpg"
import lamp1 from "../images/lamp1.jpg"
import video from "../images/alice3.mp4"
import { useEffect } from 'react';

function MainPage() {
	useEffect(() => {
		let elements = document.querySelectorAll(".parallax");
		M.Parallax.init(elements)
		var elems = document.querySelectorAll('.carousel');
		M.Carousel.init(elems, {
			fullWidth: true,
			indicators: true
		});
	}, [])
	return (
		<div className="App">
			<div className="navbar-fixed">
				<nav className="white" role="navigation">
					<div className="nav-wrapper container">
						<a id="logo-container" href="#" className="brand-logo purple-text text-darken-4">Logo</a>
						<ul className="right hide-on-med-and-down">
							<li><a href="#"><span className="purple-text text-darken-4">Устройства</span></a></li>
							<li><a href="#"><span className="purple-text text-darken-4 center-nav">Справка</span></a></li>
							<li><a href="/registration" className="waves-effect purple darken-1 btn">Регистрация</a></li>
							<li><a href="/login" className="waves-effect purple darken-1 btn">Войти</a></li>
						</ul>
						<a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
					</div>
				</nav>
			</div>
			<div className="container-video">
				<video id="video" width="100%" autoPlay loop tabIndex={0} muted>
					<source src={video} type="video/mp4" />
				</video>
				<div className="overlayText">
					<h2 id="topText">Ваш дом, ваше управление: где технология обеспечивает комфорт.</h2>
				</div>
			</div>

			<div className="main">
				<h2 className="possibilities">О нас</h2>
				<p>Новой компании</p>
			</div>

			<div className="hero deep-purple lighten-4">
				<div className="card-content">
					<h2 className="header">Тут что-то про нас будет а ля компания.</h2>
				</div>
				<div className="parallax-container">
					<div className="parallax"><img width="900px" src={smart} /></div>
				</div>
			</div>

			<div className="main">
				<h2 className="possibilities">Возможности</h2>
				<p>Для безопасности и удобства</p>
			</div>

			<div className="carousel carousel-slider">
				<div className="carousel-item white-text">
					<div className="parallax-container">
						<div className="parallax"><img width="1000px" src={camera} /></div>
					</div>
					<h3 className="carousel-text">Наблюдайте за вашим домом с помощью видеокамеры</h3>
				</div>
				<div className="carousel-item white-text">
					<div className="parallax-container">
						<div className="parallax"><img width="1000px" src={room} /></div>
					</div>
					<h3 className="carousel-text">Меняйте цвет ленты под Ваше настроение</h3>
				</div>
				<div className="carousel-item white-text">
					<div className="parallax-container">
						<div className="parallax"><img width="1000px" src={lamp} /></div>
					</div>
					<h3 className="carousel-text">Мягко просыпайтесь с будильником-рассветом</h3>
				</div>
			</div>

			<div className="row deep-purple lighten-4 row-main">
				<div className="col s6 col-main">
					<div className="card-content">
						<h2 className="header">Умные устройства</h2>
						<h6>Объединяйте устройства в единую экосистему и управляйте с помощью мобильного или веб приложений</h6>
					</div>
				</div>
				<div className="col s6 col-main">
					<img className="name" width="100%" src={lamp1} />
					<h6 className="col-text white-text">Лампа со встроенной имитацией рассвета для более мягкого пробуждения по утрам</h6>
				</div>

				<div className="col s6 col-main">
					<img className="name" width="100%" src={lamp1} />
					<h6 className="col-text white-text">Видеокамера с возможностью наблюдать за помещением в Ваше отсутсвие</h6>
				</div>
				<div className="col s6 col-main">
					<img className="name" width="100%" src={lamp1} />
					<h6 className="col-text white-text">Светодиодная RGB-лента с управлением через мобильное или веб приложения</h6>
				</div>
			</div>
		</div>
	)
}

export default MainPage;