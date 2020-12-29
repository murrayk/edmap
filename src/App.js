import React, { useContext, setState, Component } from 'react';
import DeckGL from '@deck.gl/react';

import { StaticMap } from 'react-map-gl';
import InfoBox from './components/InfoBox'
import AboutBox from './components/AboutBox'
import { _MapContext as MapContext, NavigationControl } from 'react-map-gl';

import { registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import { useState, useCallback } from 'react';
import { FlyToInterpolator } from 'deck.gl';
import LayersFactory from "./layers/LayersFactory"


registerLoaders(GLTFLoader);

const MAPBOX_TOKEN = ''; // not require all opensource
// mapbox style file path


const MAPBOX_STYLE_EDINBURGH = 'dev-style-edinburgh.json';

export default class App extends Component {
  layersFactory = new LayersFactory();
  state = {
    title: "Click on coloured buildings for info...",
    selectedBuildingId: null,
    initialViewState: {
      longitude: -3.1517904,
      latitude: 55.9557288,
      zoom: 16,
      pitch: 60,
      bearing: 0
    },
    layers: []
  };





  render() {

    let mapStyle = MAPBOX_STYLE_EDINBURGH;

    const goToBridges = () => {
      this.setState({
        initialViewState: {
          longitude: -3.3878494935,
          latitude: 55.9981315604,
          zoom: 14,
          pitch: 60,
          bearing: 80,
          transitionDuration: 5000,
          transitionInterpolator: new FlyToInterpolator(),
        },
        layers: [this.layersFactory.getBridgesLayer() ]
      })
    };


    const goToRos = () => {

      const getSelectedBuildingId = () => {
        return this.state.selectedBuildingId;
      }
      const updateSelectedBuilding = (buildingDetails) => {
        this.setState(buildingDetails);
        this.setState({layers: this.layersFactory.getRosBuilding(updateSelectedBuilding, getSelectedBuildingId)});
  
      };
      
      this.setState({
        initialViewState: {
          longitude: -3.1517904,
          latitude: 55.9557288,
          zoom: 16,
          pitch: 60,
          bearing: 0,
          transitionDuration: 5000,
          transitionInterpolator: new FlyToInterpolator()
        },
        layers: this.layersFactory.getRosBuilding(updateSelectedBuilding, getSelectedBuildingId)
      });

      
      
    };




    return (
      <div>
        <AboutBox goToBridges={goToBridges} goToRos={goToRos} />
        <DeckGL
          initialViewState={this.state.initialViewState}
          controller={true}
          layers={[this.state.layers]}
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




