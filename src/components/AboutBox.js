import React from "react";
import '../App.css';




const AboutBox = (props) => {

    return (

        <div className="ui three column  raised padded text container segment grid" style={{position: 'absolute', zIndex: 1}}  >
            <div className="column">
                <h4 className="ui header" >3D model of forth rail bridge</h4>
                <button className="ui primary button" onClick={props.goToBridges}>View Model</button>
            </div>
            <div className="column">
                <h4 className="ui header" >Pickable GeoJson ROS Model</h4>
                <button className="ui primary button" onClick={props.goToRos} >View Model</button>
            </div>
            <div className="column">
                <h4 className="ui header" >Terrain Map</h4>
                <button className="ui primary button" onClick={props.terrainMap} >View Model</button>
            </div>
        </div>
    )
};

export default AboutBox;