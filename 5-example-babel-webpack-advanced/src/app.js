import $ from 'jquery';
import { makeRequest } from './request';

import '../style/common.css';

export default class DomStuff {
  constructor(props) {
    this.name = props;
  }

  addImages(images) {
    images.splice(7, 0, $(`<img src="http://i0.wp.com/geeklynewsgazette.net/wp-content/uploads/2015/10/Screenshot-50.png" height="300px" />`));
    $('#photos').append(images);
  }
}

const api = {
  getStuff: (e) => {
    $('#photos').empty();
    const request = makeRequest({
      url: `https://mars-photos.herokuapp.com/api/v1/rovers/Curiosity/photos?sol=${$('#input').val()}&camera=MAST`
    });

    request.then(response => {
      $('#output').val(JSON.stringify(response, null, 2));

      // Create img elements
      const imageElements = response.photos.map((photo) => {
        return $(`<img src=${photo.img_src} height="300px" />`);
      });

      const domStuff = new DomStuff('My DOM Helper');
      domStuff.addImages(imageElements);
    }, error => {
      $('#output').val(error);
    });
  }
};

export { api };
