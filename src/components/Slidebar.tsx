import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import M from "materialize-css";
import lamp from "../images/lamp.jpg";

function SlideBar() {
    const navigate = useNavigate();
    const name = localStorage.getItem('name')
    const surname = localStorage.getItem('surname')
    const email = localStorage.getItem('email')
    useEffect(() => {
        let elements = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elements[0]);
        M.Sidenav.init(elements[1], {
            edge: "right"
        });

    }, []);

    return (
        <div>
            <div className="device-image"
                 style={{backgroundImage: 'url(' + lamp + ')'}}
            >
            </div>
            <ul id="slide-out" className="sidenav sidenav-fixed big">
                <li>
                    <div className="user-view">
                        <div className="background">
                            <img src={lamp}/>
                        </div>
                        <a><img className="circle" src={lamp}/></a>
                        <a><span className="white-text name">{name} {surname}</span></a>
                        <a><span className="white-text email">{email}</span></a>
                    </div>
                </li>
                <li><a className="waves-effect" onClick={() => navigate("/home")}> Дом</a></li>
                <li>
                    <div className="divider"></div>
                </li>
                <li><a className="waves-effect" onClick={() => navigate("/rooms")}>Комнаты</a></li>
                <li>
                    <div className="divider"></div>
                </li>
                <li><a className="waves-effect" onClick={() => navigate("/devices")}>Устройства</a></li>
                <li>
                    <div className="divider"></div></li>
                <li><a className="waves-effect" onClick={() => navigate("/profile")}>Профиль</a></li>
            </ul>
        </div>
    )
}

export default SlideBar