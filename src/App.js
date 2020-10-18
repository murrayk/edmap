import React, { useContext, setState, Component } from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import { GeoJsonLayer, PolygonLayer } from "deck.gl";
import { StaticMap } from 'react-map-gl';
import InfoBox from './components/InfoBox'
import { InfoContext } from "./providers/InfoContext";
import { getJSONData } from "./DataLoader";

const DATA_URL = 'edinburgh-buildings.json';

// Set your mapbox access token here
//const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibXVycmF5aGtpbmciLCJhIjoiZVVfeGhqNCJ9.WJaoPywqu21-rgRkQJqsKQ';
// Set your mapbox token here
const MAPBOX_TOKEN = ''; // eslint-disable-line
// mapbox style file path
const MAPBOX_STYLE =
  'https://murrayk.github.io/london3dmap/london-style.json';

const MAPBOX_STYLE_EDINBURGH =
  'style-edinburgh.json';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -3.1543883,
  latitude: 55.9556674,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

var features = {
  "type": "FeatureCollection",
  "name": "multipolygons",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
    { "type": "Feature", "properties": { id: 1, selected: false, hr01: [100, 105, 155], hr02: [55, 205, 155], "osm_way_id": "77869807", "building": "yes", "info": "Owner Joe Bloggs First Floor", "other_tags": "\"building:levels\"=>\"6\",\"wikidata\"=>\"Q7309422\"" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[-3.1517904, 55.9557288], [-3.1517529, 55.9557268], [-3.1517617, 55.9556757], [-3.1512664, 55.9556491], [-3.1512644, 55.9556612], [-3.1510791, 55.9556513], [-3.1511316, 55.9553431], [-3.1511237, 55.9553195], [-3.1510771, 55.955317], [-3.1510304, 55.9553145], [-3.1510263, 55.9553384], [-3.1509417, 55.9553339], [-3.1508914, 55.9556274], [-3.1505404, 55.9556086], [-3.1505378, 55.9556236], [-3.1505032, 55.9556218], [-3.1504952, 55.9556689], [-3.1505297, 55.9556707], [-3.1505213, 55.9557201], [-3.1508698, 55.9557388], [-3.1508566, 55.9558156], [-3.1508205, 55.9560265], [-3.1508188, 55.9560369], [-3.1508441, 55.9560383], [-3.1508419, 55.956051], [-3.150903, 55.9560543], [-3.150905, 55.9560429], [-3.1509171, 55.9560436], [-3.1509191, 55.9560314], [-3.1510083, 55.9560362], [-3.1510571, 55.9557515], [-3.1517465, 55.9557885], [-3.1517482, 55.9557786], [-3.1517642, 55.9557794], [-3.151766, 55.9557688], [-3.1517834, 55.9557697], [-3.1517904, 55.9557288]]]] } },
    { "type": "Feature", "properties": { id: 2, selected: false, hr01: [100, 105, 155], hr02: [55, 205, 155], "osm_way_id": "477670604", "building": "yes", "other_tags": "\"building:levels\"=>\"3\"" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[-3.1513162, 55.9553529, 100], [-3.1512742, 55.9553507, 100], [-3.1511316, 55.9553431, 100], [-3.1510791, 55.9556513, 100], [-3.1512644, 55.9556612, 100], [-3.1512664, 55.9556491, 100], [-3.1513162, 55.9553529, 100]]]] } }

  ]
};


// Data to be used by the LineLayer
const data = [
  { sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781] }
];

const polygonData = [
  {
    contours: [
      [-91.72307036099997, 31.814196736000035],
      [-122.41669, 37.781],
      [-95.52274057225983, 30.131426214982195],
      [-91.72307036099997, 31.814196736000035]
    ],
    name: "firstPolygon",
    elevation: 10000
  }
];


function getBuildingElevation(data) {
  let otherTags = data.properties.other_tags;
  console.log(process.env);
  if (otherTags) {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(data.properties.other_tags);
    const extractBuildingHeight = /building:levels"=>"([0-9]+)/;
    const match = otherTags.match(extractBuildingHeight);
    if (match) {
      return Number(match[1]);
    } else {
      return 1;
    }
  }

}

export default class App extends Component {
  state = {
    title: "aaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    features: features,
    geoJsonValue: "hr01"
  };


  render() {
    let data = DATA_URL;
    let mapStyle = MAPBOX_STYLE_EDINBURGH;

    const getInfo = ({ object }) => {
      console.log(object);
      if (object) {
        if (this.state.geoJsonValue === "hr01") {
          this.setState({
            geoJsonValue: "hr02"
          });
        } else {
          this.setState({
            geoJsonValue: "hr01"
          });
          console.log("setting state to hr01")
        }
      }

    }


    // console.log(object);
    // console.log("PROCESS");
    // console.log(this);

    // setInfo(before => { 
    //   console.log("before");
    //   console.log(before);
    //   return {title: title};
    // });

  const GEO_JSON_LAYER = new GeoJsonLayer({
    id: 'geojson',
    data: this.state.features,
    opacity: 0.8,
    stroked: false,
    filled: true,
    extruded: true,
    wireframe: true,
    getElevation: d => {
      return getBuildingElevation(d) * 3;
    },
    getFillColor: d => {
      //console.log(this.state.geoJsonValue);
      //console.log("selected " + d.properties.selected);
      return d.properties[this.state.geoJsonValue]
    },
    updateTriggers: {
      getFillColor: [this.state.geoJsonValue]
    },
    getLineColor: [255, 255, 255],
    onClick: (event) => getInfo(event),
    pickable: true
  })


  const layers = [
    GEO_JSON_LAYER
  ];



  return(
      <DeckGL
        initialViewState = { INITIAL_VIEW_STATE }
        controller = { true}
        layers = { layers }
      >

      <StaticMap
        reuseMaps
        mapStyle={mapStyle}
        preventStyleDiffing={true}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <InfoBox info={this.state} /></StaticMap>

      </DeckGL>
    );
  }
}




