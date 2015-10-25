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
var CameraView = require('../components/CameraView');
var UploadImage = require('../utils/camera_upload');

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

  getInitialState(): object {
    return {
      text: '',
      cameraType: Camera.constants.Type.back,
      imageUri: '',
      subject: 'Geometry',
      level: 'high school',
    };
  },

  _submit()  {
    console.log(this.state);
    if (this.state.submitting || !this.state.imageUri ) {
      return;
    }

    this.setState({submitting: true});
    UploadImage(this.state.imageUri, (external_image_url) => {

      ParseReact.Mutation.Create('questions', {
        text: this.state.text,
        image_url: external_image_url,
        subject: this.state.subject,
        levels: this.state.level,
        user: 'spchuang',
      }).dispatch()
      .done(this._onSuccess)
      .fail(this._onError);
    })
  },

  _reset(): void {
    var state = this.state;
    state.imageUri="";
    this.setState(state);
  },

  _onCameraImageTaken(uri): void {
    this.setState({imageUri: uri});
  },

  render(): $jsx {

    var buttonContent = this.state.submitting
      ? <ActivityIndicatorIOS
          animating={true}
          style={styles.buttonIcon}
          size="small"
        />
      : <Text style={styles.buttonText}>Ask!</Text> ;
     

    return (
      <View style={styles.container}>
        <ScrollView>
          <CameraView onImageTaken={this._onCameraImageTaken}/>
         
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

          <View style={[styles.section, {flexDirection: 'row',}]}>
            <View style={{flex: 1}}>
              <View style={styles.center}>
                <Text>What subject is it?</Text>
              </View>
              {this._renderSubjectPicker()}
            </View>
            <View style={{flex: 1}}>
              <View style={styles.center}>
                <Text>What level is it?</Text>
              </View>
              {this._renderLevelPicker()}
            </View>
          </View>

        </ScrollView>
        <View style={[styles.center, styles.footer]}>
          <View style={styles.row}>
            <View style={[styles.buttonWrap, this._disabledStyle(this.state.loading)]}>
              <Button onPress={this._submit}
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
    flexDirection: 'column',
    backgroundColor: '#F5FCFF', //F5FCFF
    paddingTop: 30, //64,
  },
  camera: {
    flex: 4,
    height : 300,
    flexDirection : 'column',
    alignItems : 'flex-end',
    backgroundColor: 'transparent'
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
    paddingTop: 20,
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
