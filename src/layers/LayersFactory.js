import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { GeoJsonLayer } from "deck.gl";

const FORTH_ROAD_BRIDGE_URL = 'forth-road-bridge.json';
export default class LayersFactory {


    getBridgesLayer = () => {

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

    getRosBuilding = (updateSelectedBuilding, getSelectedBuildingId) => {


        const selectBuildingOrFloor = ({ object }) => {
            console.log(object);
            if (object) {
              updateSelectedBuilding({ selectedBuildingId: object.properties.id, title: object.properties.info });
            }
          }
      


        const getBuildingElevation = (data) => {
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

        };
        let i =100;
        const rosBuilding = new GeoJsonLayer({
            id: 'geojson',
            data: 'edinburgh-buildings.json',
            opacity: 0.8,
            stroked: false,
            filled: true,
            extruded: true,
            wireframe: true,
            getElevation: d => {
                return getBuildingElevation(d) * 3;
            },
            getFillColor: d => {

                return d.properties.id === getSelectedBuildingId() ? [255, 36, 0] : [55, 205, 155]
            },
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