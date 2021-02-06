import React, { useContext, setState, Component } from 'react';
import DeckGL from '@deck.gl/react';
import AboutBox from './components/AboutBox'
import MapGL from 'react-map-gl';

import { registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import { FlyToInterpolator } from 'deck.gl';
import LayersFactory from "./layers/LayersFactory"


registerLoaders(GLTFLoader);

const MAPBOX_TOKEN = ''; // not require all opensource
// mapbox style file path

export default class App extends Component {
  layersFactory = new LayersFactory();
  state = {
    title: "Click on coloured buildings for info...",
    selectedBuildingInfo: null,
    initialViewState: {
      longitude: -3.1517904,
      latitude: 55.9557288,
      zoom: 16,
      pitch: 60,
      bearing: 0,
      maxPitch: 89
    },
    layers: []
  };



  _renderPopup() {
    return (
      this.state.selectedBuildingInfo && (
        <div className="ui card" style={{
          position: 'absolute', background: 'white',
          left: this.state.selectedBuildingInfo.x, top: this.state.selectedBuildingInfo.y, zIndex: 100
        }}>


          <div className="image">
            <img src="./building-icon.png" />
          </div>
          <div className="content">
            <div className="header">{this.state.selectedBuildingInfo.title}</div>
            <div className="description">
              What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
              printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the
            </div>
          </div>
          <div className="ui two bottom attached buttons">
            <div className="ui primary button" onClick={() => this.setState({ selectedBuildingInfo: null })}>
              <i className="close icon"></i>
              Close
            </div>
          </div>
        </div>
      )
    );

  }


  render() {

    console.log("environment");
    console.log(process.env);
    let mapStyle = process.env.NODE_ENV === "development" ? 'dev-style-edinburgh.json' : 'style-edinburgh.json';
    console.log("map style" + mapStyle)
    const goToBridges = () => {
      this.setState({
        selectedBuildingInfo: null,
        initialViewState: {
          longitude: -3.3878494935,
          latitude: 55.9981315604,
          zoom: 14,
          pitch: 60,
          bearing: 80,
          transitionDuration: 5000,
          transitionInterpolator: new FlyToInterpolator(),
        },
        layers: [this.layersFactory.getBridgesLayer()]
      })
    };

    const terrainMap = () => {
      this.setState({
        initialViewState: {
          longitude: -3.1517904,
          latitude: 55.9557288,
          zoom: 14,
          pitch: 70,
          bearing: 0,
          maxPitch: 89,
          transitionDuration: 5000,
          transitionInterpolator: new FlyToInterpolator()
        },
        layers: this.layersFactory.getTerrainLayer()
      });

    }


    const goToRos = () => {

      const getSelectedBuildingId = () => {
        return this.state.selectedBuildingInfo && this.state.selectedBuildingInfo.selectedBuildingId;
      }
      const updateSelectedBuilding = (buildingDetails) => {
        this.setState(buildingDetails);
        this.setState({ layers: this.layersFactory.getRosBuilding(updateSelectedBuilding, getSelectedBuildingId) });

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
        <AboutBox goToBridges={goToBridges} goToRos={goToRos} terrainMap={terrainMap} />
        {this._renderPopup()}
        <DeckGL
          initialViewState={this.state.initialViewState}
          controller={true}
          layers={[this.state.layers]}
        >
          <MapGL
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          >
          </MapGL>
        </DeckGL>
      </div>
    );

  }
}




