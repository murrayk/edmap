import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { GeoJsonLayer } from "deck.gl";
import {TerrainLayer} from '@deck.gl/geo-layers';

const FORTH_ROAD_BRIDGE_URL = 'forth-road-bridge.json';
const MAPBOX_TOKEN = 'pk.eyJ1IjoibXVycmF5aGtpbmciLCJhIjoiZVVfeGhqNCJ9.WJaoPywqu21-rgRkQJqsKQ'; 
const TERRAIN_IMAGE = `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png`;
const SURFACE_IMAGE = `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=${MAPBOX_TOKEN}`;
const ELEVATION_DECODER = {
    rScaler: 256,
    gScaler: 1,
    bScaler: 1/256,
    offset: -32768
  };
export default class LayersFactory {


    getTerrainLayer(){

        const terrainLayer = new TerrainLayer({
            id: 'terrain',
            minZoom: 0,
            maxZoom: 23,
            elevationDecoder: ELEVATION_DECODER,
            elevationData: TERRAIN_IMAGE,
            texture: SURFACE_IMAGE,
            wireframe: false,
            color: [255, 255, 255]
          });

        return terrainLayer;
        
    }


    getBridgesLayer (){

        const bridgeSceneGraph = new ScenegraphLayer({
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

        return bridgeSceneGraph;

    }

    getRosBuilding (updateSelectedBuilding, getSelectedBuildingId){

        const selectBuildingOrFloor = ({x, y, object}) => {
            console.log(object);
            if (object) {
                
              updateSelectedBuilding({selectedBuildingInfo:{ selectedBuildingId:object.properties.id, title: object.properties.title, x, y }});
            }
          }
      


        const getBuildingElevation = (data) => {
            let otherTags = data.properties.other_tags;
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

        };

        const rosBuilding = new GeoJsonLayer({
            id: 'geojson',
            data: 'edinburgh-buildings.json',
            opacity: 0.8,
            stroked: false,
            filled: true,
            extruded: true,
            wireframe: true,
            getElevation: d => getBuildingElevation(d) * 3,
            getFillColor: d => d.properties.id === getSelectedBuildingId() ? [255, 36, 0] : [55, 205, 155],
            updateTriggers: {
                getFillColor: () => console.log("check fill")
            },
            getLineColor: [255, 255, 255],
            onClick: (event) => selectBuildingOrFloor(event),
            pickable: true
        })
        return rosBuilding;
    }

}