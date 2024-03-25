import '../css/homepage.css'
import '../css/materialize.css'
import lamp from "../images/lamp.jpg"
import React from 'react';
import {getDateTime} from '../components/DateUtil';
import SlideBar from "../components/Slidebar";

function HomePage() {

    setInterval(function () {
        document.getElementById("digital-clock")!!.innerHTML = getDateTime();
    }, 1000);

    return (
        <div>
            <SlideBar/>

            <ul id="slide-out" className="sidenav sidenav-fixed small">
                <li>
                    <div className="user-view">
                        <div className="background">
                            <img src={lamp}/>
                        </div>
                        <a><img className="circle" src={lamp}/></a>
                        <a>
                            <div id="digital-clock"></div>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default HomePage;