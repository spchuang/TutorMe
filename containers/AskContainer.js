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
} = React;

var PickerItemIOS = PickerIOS.Item;

var SUBJECTS = [
  {
    'name': 'Geometry',
  },
  {
    'name': 'Chemistry',
  },
  {
    'name': 'Calculus',
  },
  {
    'name': 'Algebra',
  },
  {
    'name': 'Probability',
  },
  {
    'name': 'Trigonometry',
  }
];

var LEVELS = [
  {
    'name': 'high school',
  },
  {
    'name': 'college',
  },
  {
    'name': 'middle school',
  }
];

var Ask = React.createClass({

  getInitialState(): $jsx {
    return {
	    text: "",
	    cameraType: Camera.constants.Type.back,
	    imageData: "",
      imageURL: "",
      captureMode: true,
      subject: 'Geometry',
      level: 'high school',
    };
  },

  _updateImage(imageData): void {
    var URL = "http://162.243.138.173:32771/upload";
    var form = new FormData();
    form.append('file', imageData)
    fetch(URL,
      {body: form,
       method: "post"
      })
        .then(_onImageSaveSuccess)
        .done();
  },

  _saveImage()  {
    this.refs.cam.capture((err, uri) =>
    {
      NativeModules.ReadImageData.readImage(uri, (data) => {
        this._updateImage(data);
      });
    });
  },

  _onImageSaveSuccess(response: object): void {
    this.setState({
      imageURL : response.imge_urlm,
      captureMode: false
    });
  },

  _renderCaptureView(): $jsx {
    return (
      <View>
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

  _renderImagePreview(): $jsx {
    return (
      <View>
        <ImageView source={this.state.imageURL}/>
      </View>
    );
  },

  render(): $jsx {

    var camera = this.state.captureMode
      ? this._renderCaptureView()
      : this._renderImagePreview();

    var buttonContent = this.state.submitting
      ? <ActivityIndicatorIOS
          animating={true}
          style={styles.buttonIcon}
          size="small"
        />
      : <Text style={styles.buttonText}>Ask!</Text> ;

    return (
      <View style={styles.container}>
        <ScrollView >
          {camera}
          <View style={styles.section}>
            <View style={styles.center}>
              <Text>What subject is it?</Text>
            </View>
            {this._renderSubjectPicker()}
          </View>

          <View style={styles.section}>
            <View style={styles.center}>
              <Text>What level is it?</Text>
            </View>
            {this._renderLevelPicker()}
          </View>
          <View style={styles.section}>
            <View style={styles.center}>
              <Text>Comments</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({text})}
              multiline={true}
              value={this.state.text}
            />
          </View>

        </ScrollView>
        <View style={[styles.center, styles.footer]}>
          <View style={styles.row}>
            <View style={[styles.buttonWrap, this._disabledStyle(this.state.loading)]}>
              <Button onPress={this._submitQuestion}
                disabled={this.state.submitting}
                style={styles.button}>
                {buttonContent}
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  },

  _disabledStyle(disabled: bool): Object {
    if (!disabled) {
      return {};
    }
    return {opacity: 0.8};
  },

  _renderSubjectPicker(): $jsx {
    var items = [];
    for (var i = 0; i < SUBJECTS.length; i++) {
      var subject = SUBJECTS[i];
      items.push(
        <PickerItemIOS
          key={subject.name}
          value={subject.name}
          label={subject.name}
          style={styles.pickerItem}
        />
      );
    }
    return (
      <View style={styles.pickerWrap}> 
        <PickerIOS
          selectedValue={this.state.subject}
          onValueChange={(subject) => this.setState({subject})}>
          {items}
        </PickerIOS>
      </View>
    );
  },

  _renderLevelPicker(): $jsx {
    var items = [];
    for (var i = 0; i < LEVELS.length; i++) {
      var level = LEVELS[i];
      items.push(
        <PickerItemIOS
          key={level.name}
          value={level.name}
          label={level.name}
          style={styles.pickerItem}
        />
      );
    }
    return (
      <View style={styles.pickerWrap}> 
        <PickerIOS
          selectedValue={this.state.level}
          onValueChange={(level) => this.setState({level})}>
          {items}
        </PickerIOS>
      </View>
    );
  },

  _submitQuestion(): void{
    console.log(this.state);
    if (this.state.submitting || 
      this.state.subject === '' || 
      this.state.level === '' ||
      (this.state.imageURL === '' && this.state.text === '' )) {
      return;
    }
    this.setState({submitting: true});

    ParseReact.Mutation.Create('questions', {
      text: this.state.text,
      image_url: this.state.imageURL,
      subject: this.state.subject,
      level: this.state.level,
      user: 'spchuang',
    }).dispatch()
    .done(this._onSuccess)
    .fail(this._onError);
  },

  _onSuccess(newQuestion: object): void {
    this.setState({submitting: false, text: ''});
    this.props.navigator.replace({
      title: 'Question',
      component: QuestionView,
      passProps: {question: newQuestion, load: true, style: {paddingTop: 40}},
    });
  },

  _onError(): void {
    this.setState({submitting: false});
  },
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF', //F5FCFF
    paddingTop: 30, //64,
  },
  camera: {
    flex: 1,
    height : 330,
  },
  picker: {
    flex: 1,
  },
  pickerWrap: {
    height: 40,
    overflow: 'hidden',
    justifyContent: 'space-around',
  },
  pickerItem: {
    flex: 1,
    height: 30,
  },

  center: {
    alignItems: 'center',
  },
  buttonWrap: {
    borderRadius: 8,
    padding: 10,

    width: 200,
    backgroundColor: '#DB3340',
    alignItems: 'center',
  },
  section: {
    paddingTop: 7,
  },
  row: {
    alignItems: 'center',
  },

  button: {
    width: 200,
    flex: 1,
  },

  buttonText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'HelveticaNeue-Medium',
  },

  input: {
    fontSize: 16,
    padding: 5,
    height: 80,
    borderColor: 'gray', 
    borderWidth: 1,
  },

  footer: {
    backgroundColor: 'transparent',
    marginBottom: 50,
  },
});

module.exports = Ask;
