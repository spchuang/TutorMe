/**
 *
 * @flow
 */

'use strict';

var React = require('react-native');
var QuestionView = require('./../components/QuestionView');
var Button = require('react-native-button');
var Camera = require('react-native-camera');
var ImageView = require('../components/ImageView');
var {Icon, } = require('react-native-icons');

var ParseReact = require('parse-react/react-native');
var QuestionView = require('../components/QuestionView');

var {
  ActivityIndicatorIOS,
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableHighlight,
  NativeModules,
  PickerIOS,
  ScrollView,
  PropTypes,
} = React;


var CameraView =  React.createClass({
  propTypes: {
    onImageTaken: PropTypes.func,
  },

  getInitialState(): object {
    return {
      cameraType: Camera.constants.Type.back,
      imageUri: "",
    };
  },

  _previewImage()  {
    this.refs.cam.capture((err, uri) =>{
      this.setState({imageUri: uri});
      this.props.onImageTaken(uri);
    });
  },

  render(): $jsx {
    if (this.state.imageUri === "") {
      return this._renderCaptureView();
    } else {
      return this._renderImagePreview();
    }
  },

   _renderCaptureView(): $jsx {
    return (
      <View>
       <Camera
        ref="cam"
        style={styles.camera}
        captureTarget={Camera.constants.CaptureTarget.disk}
       >
       <TouchableHighlight style={{flex:1, height:50, justifyContent:'center'}} onPress={this._previewImage}>
          <Icon
            name='ion|ios-camera-outline'
            size={40}
            color='#887700'
            style={{width:40, height:40}}
          />
        </TouchableHighlight>
       </Camera>
      </View>
    );
  },
  _renderImagePreview(): $jsx {
    return (
      <View>
        <ImageView source={this.state.imageUri}/>
        <TouchableHighlight onPress={this._reset}>
          <Text>Re Capture</Text>
        </TouchableHighlight>
      </View>
    );
  },

  _uploadImage(imageData): void {
    var URL = "http://162.243.138.173:32771/upload";
    var form = new FormData();
    form.append('file', imageData)
    fetch(URL,
      {body: form,
       method: "post"
      })
        .then(this._onImageSaveSuccess)
        .done();
  },
});

var styles = StyleSheet.create({
  
  camera: {
    flex: 4,
    height : 300,
    flexDirection : 'column',
    alignItems : 'flex-end',
    backgroundColor: 'transparent'
  },
});

module.exports = CameraView;