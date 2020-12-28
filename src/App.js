import React, { useContext, setState, Component } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PolygonLayer } from "deck.gl";
import { StaticMap } from 'react-map-gl';
import InfoBox from './components/InfoBox'
import AboutBox from './components/AboutBox'
import { _MapContext as MapContext, NavigationControl } from 'react-map-gl';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import { useState, useCallback } from 'react';
import { FlyToInterpolator } from 'deck.gl';


registerLoaders(GLTFLoader);
const DATA_URL = 'edinburgh-buildings.json';
const FORTH_ROAD_BRIDGE_URL = 'forth-road-bridge.json';

const MAPBOX_TOKEN = ''; // eslint-disable-line
// mapbox style file path
const MAPBOX_STYLE =
  'https://murrayk.github.io/london3dmap/london-style.json';

const MAPBOX_STYLE_EDINBURGH =
  'dev-style-edinburgh.json';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -3.1517904,
  latitude: 55.9557288,
  zoom: 16,
  pitch: 60,
  bearing: 0
};


let lastSelectedBuilding = { hoveredObject: null };

/**
 * Data format:
 * [
 *   {name: 'Colma (COLM)', address: '365 D Street, Colma CA 94014', exits: 4214, coordinates: [-122.466233, 37.684638]},
 *   ...
 * ]
 */


const forthRoadPosition = [
  {
    coordinates: [-3.1517904, 55.9557288]
  }
];


function getBuildingElevation(data) {
  let otherTags = data.properties.other_tags;
  console.log("environment");
  console.log(process.env);
  if (otherTags) {
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
    title: "Click on coloured buildings for info...",
    hoveredObject: null,
    initialViewState: {
      longitude: -3.1517904,
      latitude: 55.9557288,
      zoom: 16,
      pitch: 60,
      bearing: 0
    }
  };


  render() {
    let data = DATA_URL;
    let mapStyle = MAPBOX_STYLE_EDINBURGH;

    const getInfo = ({ object }) => {
      console.log(object);
      if (object) {
        if (object.properties.selected === false) {
          if (lastSelectedBuilding.hoveredObject !== null) {
            lastSelectedBuilding.hoveredObject.properties.selected = false;
          }
          object.properties.selected = true;
          lastSelectedBuilding.hoveredObject = object;
        } else {
          object.properties.selected = false;
        }
        this.setState({ hoveredObject: object, title: object.properties.info });
      }

    }

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
      },
      getFillColor: d => {
        console.log("updating fill color for id " + d.properties.id);
        console.log("selected " + d.properties.selected);
        return d.properties.selected ? [255, 36, 0] : [55, 205, 155]
      },
      updateTriggers: {
        getFillColor: [
          this.state.hoveredObject
            ? this.state.hoveredObject.properties.id
            : null
        ]
      },
      getLineColor: [255, 255, 255],
      onClick: (event) => getInfo(event),
      pickable: true
    })

    const scenegraph = new ScenegraphLayer({
      id: 'scenegraph-layer',
      data: FORTH_ROAD_BRIDGE_URL,
      pickable: true,
      scenegraph: 'forth-rail-bridge.glb',
      getPosition: d => {
        console.log(d);
        return d.coordinates;
      },
      getOrientation: d => [0, 105, 90],
      sizeScale: 1.1,
      _lighting: 'pbr',
      getColor: c => [130, 0, 0, 200]
    });

    console.log(scenegraph);
    const layers = [
      scenegraph
    ];

    const goToBridges = () => {
      console.log("HEllo");
      this.setState({
        initialViewState: {
          longitude:  -3.3878494935,
          latitude: 55.9981315604,
          zoom: 14,
          pitch: 60,
          bearing: 80,
          transitionDuration: 8000,
          transitionInterpolator: new FlyToInterpolator()
        }
      })
    };



    return (
      <div>
        <AboutBox goToBridges={goToBridges} />
        <DeckGL
          initialViewState={this.state.initialViewState}
          controller={true}
          layers={layers}
        >

          <StaticMap
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          >

            <InfoBox info={this.state} /></StaticMap>
        </DeckGL>
      </div>
    );

  }
}




