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
        </div>
    )
}

export default HomePage;