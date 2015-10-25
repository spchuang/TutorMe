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
	    imageUri: "",
    };
  },

  _send(): void {
    NativeModules.ReadImageData.readImage(this.state.imageUri, (data) => {
      console.log(data);
      var URL = "http://162.243.138.173:32771/upload";
      var form = new FormData();
      form.append('file', data);
      fetch(URL,
        {
          body: form,
          method: "post",
          headers: {"Content-Type": "multipart/FormData"}
        })
          .then((response) => {console.log(JSON.stringify(response));})
          .done();
    });
  },

  _previewImage()  {
      this.refs.cam.capture((err, uri) =>
      {
        console.log(uri);
        var state = this.state;
        state.imageUri=uri;
        this.setState(state);
      });
  },

  _captureView(): $jsx {
    return (
      <View style={styles.container}>
	     <Camera
        ref="cam"
        style={styles.camera}
        captureTarget={Camera.constants.CaptureTarget.disk}
       />
       <TouchableHighlight onPress={this._previewImage}>
          <Text>Capture</Text>
        </TouchableHighlight>
      </View>
    );
  },

  _reset(): void {
    var state = this.state;
    state.imageUri="";
    this.setState(state);
  },

  _previewView(): $jsx {
    return (
      <View style={styles.container}>
        <Image style={styles.camera}
          source={{uri: this.state.imageUri}}/>
        <TouchableHighlight onPress={this._reset}>
          <Text>Re Capture</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this._send}>
          <Text>Submit</Text>
        </TouchableHighlight>

     </View>
    );
  },

  _renderPicture(): $jsx {
    if (this.state.imageUri ==="") {
      return this._captureView();
    } else {
      return this._previewView(this.state.imageUri);
    }
  },

  render(): $jsx {

    return (
      <View style={styles.container}>
      {this._renderPicture()}
      <TextInput
        style={{height: 50, borderBottomColor: 'gray', borderBottomWidth: 1}}
        onChangeText={
          (text) => {
            this.state.text = text;
          }
        }
      />
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
    width : 380,
    height : 350,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
});

module.exports = Ask;
