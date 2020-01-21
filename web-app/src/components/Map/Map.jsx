import React, { Component, Fragment } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer, PolygonLayer } from '@deck.gl/layers';
import Overlay from '../Overlays/Overlay'
import { HeatmapLayer } from '@deck.gl/aggregation-layers'
import { extent, scaleLinear } from 'd3';
import DelayedPointLayer from './DelayedPointLayer';
import anime from 'animejs'
