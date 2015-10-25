/**
 *
 * @flow
 */

'use strict';

var React = require('react-native');
var QuestionView = require('./QuestionView');
var Button = require('react-native-button');
var Camera = require('react-native-camera');

var {
  ActivityIndicatorIOS,
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableHighlight,
  NativeModules,
} = React;

var Ask = React.createClass({

  getInitialState(): $jsx {
    return {
	    text: "",
	    cameraType: Camera.constants.Type.back,
	    imageData: "",
    };
  },

  _send(imageData): void {
    var URL = "http://162.243.138.173:32771/upload";
    var form = new FormData();
    form.append('file', imageData)
    fetch(URL,
      {body: form,
       method: "post"
      })
          .then((response) => {console.log(JSON.stringify(response));})
          .done();
  },

  _saveImage()  {
      this.refs.cam.capture((err, uri) =>
      {
        console.log(uri);
        NativeModules.ReadImageData.readImage(uri, (data) => {
          console.log(data);
          this._send(data);
        });
      });
  },

  _captureView(): $jsx {
    return (
      <View style={styles.container}>
	     <Camera
        ref="cam"
        style={styles.camera}
       />
       <TouchableHighlight onPress={this._saveImage}>
          <Text>Capture</Text>
        </TouchableHighlight>
      </View>
    );
  },

  _previewView(): $jsx {
    return (
      <View style={styles.container}>
	     <Camera>
	      <TouchableHighlight onPress={this._onPressButton}>
          <Text>
            Capture
          </Text>
	      </TouchableHighlight>
      </Camera>
     </View>
    );
  },

  render(): $jsx {
    return (
      <View style={styles.container}>

      <TextInput
        style={{height: 50, borderColor: 'gray', borderWidth: 1}}
        onChangeText={
          (text) => {
            state = this.state
            state.text = text
            this.setState(state)
          }
        }
        value={this.state.text}
      />

      {this._captureView()}


      <Button style={{color: 'green'}} onPress={this._handlePress}>
        Submit!
      </Button>

      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 64,
  },
  camera: {
    width : 350,
    height : 350,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
});

module.exports = Ask;
