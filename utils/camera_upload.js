/**
 *
 * @flow
 */

'use strict';
var React = require('react-native');

var {
  NativeModules,
} = React;

var DOMAIN = 'http://162.243.138.173:32771';
var UPLOAD_URI = DOMAIN + '/upload';

// upload image to our flask server
var UploadImage = function(uri, callback) {
  // uri is local path of the file

  NativeModules.ReadImageData.readImage(uri, (imageData) => {

    var form = new FormData();
    form.append('file', imageData)
    fetch(UPLOAD_URI,
      {body: form,
       method: "post"
      })
      .then((response) => {
        var body = JSON.parse(response._bodyInit);
        var external_url = DOMAIN + body.imge_url
        callback(external_url);
      })
      .done();
  });
};

module.exports = UploadImage;