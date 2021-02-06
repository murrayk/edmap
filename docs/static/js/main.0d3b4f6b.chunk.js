(this.webpackJsonpedmap=this.webpackJsonpedmap||[]).push([[0],{120:function(e,t){},121:function(e,t){},169:function(e,t,n){e.exports=n(183)},174:function(e,t,n){},175:function(e,t,n){},178:function(e,t){},183:function(e,t,n){"use strict";n.r(t);var a=n(9),i=n.n(a),o=n(141),r=n.n(o),l=(n(174),n(74)),s=n(75),c=n(151),u=n(149),d=n(203),m=(n(175),function(e){return i.a.createElement("div",{className:"ui three column  raised padded text container segment grid",style:{position:"absolute",zIndex:1}},i.a.createElement("div",{className:"column"},i.a.createElement("h4",{className:"ui header"},"3D model of forth rail bridge"),i.a.createElement("button",{className:"ui primary button",onClick:e.goToBridges},"View Model")),i.a.createElement("div",{className:"column"},i.a.createElement("h4",{className:"ui header"},"Pickable GeoJson ROS Model"),i.a.createElement("button",{className:"ui primary button",onClick:e.goToRos},"View Model")),i.a.createElement("div",{className:"column"},i.a.createElement("h4",{className:"ui header"},"Terrain Map"),i.a.createElement("button",{className:"ui primary button",onClick:e.terrainMap},"View Model")))}),g=n(146),p=n(145),f=n(207),h=n(202),y=n(208),b=n(206),v=n(205),E="https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=".concat("pk.eyJ1IjoibXVycmF5aGtpbmciLCJhIjoiZVVfeGhqNCJ9.WJaoPywqu21-rgRkQJqsKQ"),w={rScaler:256,gScaler:1,bScaler:1/256,offset:-32768},S=function(){function e(){Object(l.a)(this,e)}return Object(s.a)(e,[{key:"getTerrainLayer",value:function(){return new v.a({id:"terrain",minZoom:0,maxZoom:23,elevationDecoder:w,elevationData:"https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",texture:E,wireframe:!1,color:[255,255,255]})}},{key:"getBridgesLayer",value:function(){return new y.a({id:"scenegraph-layer",data:"forth-road-bridge.json",pickable:!0,scenegraph:"forth-rail-bridge.glb",getPosition:function(e){return console.log(e),e.coordinates},getOrientation:function(e){return[0,105,90]},sizeScale:1.1,_lighting:"pbr",getColor:function(e){return[130,0,0,200]}})}},{key:"getRosBuilding",value:function(e,t){return new b.a({id:"geojson",data:"edinburgh-buildings.json",opacity:.8,stroked:!1,filled:!0,extruded:!0,wireframe:!0,getElevation:function(e){return 3*function(e){var t=e.properties.other_tags;if(t){console.log(e.properties.other_tags);var n=t.match(/building:levels"=>"([0-9]+)/);return n?Number(n[1]):1}}(e)},getFillColor:function(e){return e.properties.id===t()?[255,36,0]:[55,205,155]},updateTriggers:{getFillColor:function(){return console.log("check fill")}},getLineColor:[255,255,255],onClick:function(t){return function(t){var n=t.x,a=t.y,i=t.object;console.log(i),i&&e({selectedBuildingInfo:{selectedBuildingId:i.properties.id,title:i.properties.title,x:n,y:a}})}(t)},pickable:!0})}}]),e}();Object(p.b)(f.a);var k=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))).layersFactory=new S,e.state={title:"Click on coloured buildings for info...",selectedBuildingInfo:null,initialViewState:{longitude:-3.1517904,latitude:55.9557288,zoom:16,pitch:60,bearing:0,maxPitch:89},layers:[]},e}return Object(s.a)(n,[{key:"_renderPopup",value:function(){var e=this;return this.state.selectedBuildingInfo&&i.a.createElement("div",{className:"ui card",style:{position:"absolute",background:"white",left:this.state.selectedBuildingInfo.x,top:this.state.selectedBuildingInfo.y,zIndex:100}},i.a.createElement("div",{className:"image"},i.a.createElement("img",{src:"./building-icon.png"})),i.a.createElement("div",{className:"content"},i.a.createElement("div",{className:"header"},this.state.selectedBuildingInfo.title),i.a.createElement("div",{className:"description"},"What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the")),i.a.createElement("div",{className:"ui two bottom attached buttons"},i.a.createElement("div",{className:"ui primary button",onClick:function(){return e.setState({selectedBuildingInfo:null})}},i.a.createElement("i",{className:"close icon"}),"Close")))}},{key:"render",value:function(){var e=this;console.log("environment"),console.log(Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}));return i.a.createElement("div",null,i.a.createElement(m,{goToBridges:function(){e.setState({selectedBuildingInfo:null,initialViewState:{longitude:-3.3878494935,latitude:55.9981315604,zoom:14,pitch:60,bearing:80,transitionDuration:5e3,transitionInterpolator:new h.a},layers:[e.layersFactory.getBridgesLayer()]})},goToRos:function(){var t=function(){return e.state.selectedBuildingInfo&&e.state.selectedBuildingInfo.selectedBuildingId};e.setState({initialViewState:{longitude:-3.1517904,latitude:55.9557288,zoom:16,pitch:60,bearing:0,transitionDuration:5e3,transitionInterpolator:new h.a},layers:e.layersFactory.getRosBuilding((function n(a){e.setState(a),e.setState({layers:e.layersFactory.getRosBuilding(n,t)})}),t)})},terrainMap:function(){e.setState({initialViewState:{longitude:-3.1517904,latitude:55.9557288,zoom:14,pitch:70,bearing:0,maxPitch:89,transitionDuration:5e3,transitionInterpolator:new h.a},layers:e.layersFactory.getTerrainLayer()})}}),this._renderPopup(),i.a.createElement(d.a,{initialViewState:this.state.initialViewState,controller:!0,layers:[this.state.layers]},i.a.createElement(g.a,{reuseMaps:!0,mapStyle:"style-edinburgh.json",preventStyleDiffing:!0,mapboxApiAccessToken:""})))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[169,1,2]]]);
//# sourceMappingURL=main.0d3b4f6b.chunk.js.map