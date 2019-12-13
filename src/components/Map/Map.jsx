import React from 'react';
import DeckGL from 'deck.gl';
import {LineLayer} from '@deck.gl/layers';
// Load component from package
import {StaticMap} from 'react-map-gl';

// @see https://deck.gl/#/documentation/getting-started/using-with-react?section=the-deckgl-react-component

const viewState = {
    longitude:7.5922197 ,
    latitude: 51.9688129,
    zoom: 13,
    pitch: 0,
    bearing: 0
  };
  
  // Data to be used by the LineLayer
  const data = [{sourcePosition: [51.9688129,7.5922197], targetPosition: [51.9688129,7.5922197]}];

  
const layers = [
    new LineLayer({id: 'line-layer', data})
  ];
function Map() {

    return (
            <DeckGL controller={true} viewState={viewState} layers={layers}>
                <StaticMap mapboxApiAccessToken={'pk.eyJ1IjoiZXRoaWUxMCIsImEiOiJjazQyeXlxNGcwMjk3M2VvYmw2NHU4MDRvIn0.nYOmVGARhLOULQ550LyUYA'} />
            </DeckGL>    
    )
}

export default Map;
