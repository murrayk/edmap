import React from "react";
import '../App.css';

const InfoBox = ( {info}) => {

    return(
        <div className="ui container">
        <div className="ui segment">
        Hello Murray 2{info.title}
        </div>
        </div>
    )
};

export default InfoBox;