/*eslint no-unused-vars:0*/
import config from 'app/config';
import Map from 'esri/map';

let node = document.getElementById('app-container');

let map = new Map(node, config.mapOptions);
