import React from "react";
import '../App.css';

const InfoBox = ( {info}) => {

    return(
        <div className="info-box">Hello Murray 2{info.title}</div>
    )
};

export default InfoBox;