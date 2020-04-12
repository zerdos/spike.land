import React from "react";

import JsVectorMap from 'jsvectormap/dist/maps/world';
// @import 'jsvectormap/dist/maps/world.js'


export const WorldMap = ()=> {

     new JsVectorMap({
        selector: '#map',
        map: 'world',
      })
      
      
return <div id="map"></div>      
}

