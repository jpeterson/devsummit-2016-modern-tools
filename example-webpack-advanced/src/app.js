import $ from 'jquery';
import { makeRequest } from './request';

import '../style/common.css';

export default class App {
  constructor(props) {
    this.name = props;
  }

  sayHello(person) {
    return `Whats up ${person}! My name is ${this.name}`;
  }
}

const api = {
  addText: () => {
    const myApp = new App('Future');
    const name = $('#input').value;
    const text = document.createTextNode(myApp.sayHello(name));
    document.body.appendChild(text);
  },

  getInfo: () => {
    const request = makeRequest({
      url: 'http://dcdev.esri.com/arcgis/rest/services/SAMHSA/StdGeo_test/MapServer/2?f=pjson'
    });

    request.then(response => {
      console.log(response);
      $('#output').val(JSON.stringify(response, null, 2));
    });
  }
};

export { api };
