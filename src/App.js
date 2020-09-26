import React from 'react';
import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';
import {GeoJsonLayer, PolygonLayer} from "deck.gl";
import {StaticMap} from 'react-map-gl';

const DATA_URL = 'http://localhost:3000/map.json'; 

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibXVycmF5aGtpbmciLCJhIjoiZVVfeGhqNCJ9.WJaoPywqu21-rgRkQJqsKQ';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -3.1543883,
  latitude:  55.9556674,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
const data = [
  {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
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

function getTooltip(object) {
  console.log(object);
  return (
    object && {
      html: `\
  <div><b>Average Property Value</b></div>
  `
    }
  );
}

function getBuildingElevation(data) {
  let otherTags = data.properties.other_tags;

  if(otherTags) {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(data.properties.other_tags);
    const extractBuildingHeight = /building:levels"=>"([0-9]+)/;
    const match = otherTags.match(extractBuildingHeight);
    if(match) {
      return Number(match[1]);
    } else {
      return 1;
    }
  }

}

function App({data = DATA_URL, mapStyle = 'mapbox://styles/mapbox/light-v9'}) {

  const LAYER_POLY = new PolygonLayer({
    id: "poly-layers",
    data: polygonData,
    stroked: true,
    filled: true,
    extruded: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getPolygon: d => d.contours,
    getLineColor: [80, 80, 80],
    getFillColor: [80, 80, 80],
    getElevation:10,
    getLineWidth: 250
  });

  const GEO_JSON_LAYER = new GeoJsonLayer({
    id: 'geojson',
    data,
    opacity: 0.8,
    stroked: false,
    filled: true,
    extruded: true,
    wireframe: true,
    getElevation: d => {
      return getBuildingElevation(d) * 3;
        } ,
    getFillColor: f => [255, 255, 255],
    getLineColor: [255, 255, 255],
    pickable: true
  })

  console.log()


  const layers = [
    new LineLayer({id: 'line-layer', data: data}),
    LAYER_POLY,
    GEO_JSON_LAYER
  ];



  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      getTooltip={getTooltip}
      mapStyle={mapStyle}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}


export default App;
