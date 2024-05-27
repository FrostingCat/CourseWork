import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import M from "materialize-css";
import background from "../images/background.jpeg";
import lamp from "../images/lamp.jpg";
import '../css/slidebar.css';
import {WebSocketManager} from '../webSocket/WebSocketManager';
import {getSecurityPhoto} from "../Api/ApiSecurity";
import {baseIp, basePort} from "../Api/ApiEnv";

function SlideBar() {
    const [message, setMessage] = useState<string[]>(() => {
        const savedMessages = localStorage.getItem('messages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
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

        const webSocketManager = WebSocketManager.getInstance(`wss://${baseIp}:${basePort}/security/client`)

        webSocketManager.socket.onmessage = (event) => {
            handleCameraPhoto(event.data)
        };
    }, []);

    const handleCameraPhoto = (ip: string): void => {
        getSecurityPhoto(ip)
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error("Error! User not edited")
                }
				const photoUrl = URL.createObjectURL(data);
				setMessage(oldMessages => {
                    const updatedMessages = [...oldMessages, photoUrl];
                    localStorage.setItem('messages', JSON.stringify(updatedMessages));
                    return updatedMessages;
                });
                console.log(data)
            })
            .catch(err => {
                console.log("data")
                console.log(err)
            })
    }

    return (
        <div>
            <div className="device-image"
                 style={{backgroundImage: 'url(' + background + ')'}}
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
                <li><a className="waves-effect" onClick={() => navigate("/rooms")}>Комнаты</a></li>
                <li>
                    <div className="divider"></div>
                </li>
                <li><a className="waves-effect" onClick={() => navigate("/devices")}>Устройства</a></li>
                <li>
                    <div className="divider"></div>
                </li>
                <li><a className="waves-effect" onClick={() => navigate("/profile")}>Профиль</a></li>
            </ul>

            <ul id="slide-out" className="sidenav sidenav-fixed small">
                <li>
                    <div className="user-view">
                        <div className="background">
                            <img className="background-pic" src={background}/>
                        </div>
                        <a><img className="circle" src={lamp}/></a>
                        <a>
                            <div id="digital-clock"></div>
                        </a>
                        {message.map((msg, index) => (
                            <a key={index}><img className="message" src={msg}/></a>
                        ))}
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default SlideBar