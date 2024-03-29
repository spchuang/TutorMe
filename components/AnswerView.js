/**
 *
 * @flow
 */

 'use strict';

var React = require('react-native');

var {
  Image,
  PropTypes,
  StyleSheet,
  View,
  Text,
  ActivityIndicatorIOS,
  TextInput,
  ScrollView,
} = React;

var Button = require('react-native-button');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var QuestionView = require('../components/QuestionView');
var CameraView = require('./CameraView');
var UploadImage = require('../utils/camera_upload');

var { Icon, } = require('react-native-icons');

var AnswerView = React.createClass({
  propTypes: {
    question: PropTypes.object.isRequired,
  },
  getInitialState(): Object {
    return {
      loading: false,
      text: '',
      imageUri: '',
    }
  },
  containerTouched(event) {
    this.refs.textInput.blur();
    return false;
  },

  render(): $jsx {
    var buttonIcon = this.state.loading
      ? <ActivityIndicatorIOS
          animating={true}
          style={styles.buttonIcon}
          size="small"
        />
      : <Icon
          name='ion|android-send'
          size={30}
          color='white'
          style={styles.buttonIcon}
        />;
    return (
      <ScrollView style={styles.container}
        onStartShouldSetResponder={this.containerTouched.bind(this)}>
        <CameraView onImageTaken={this._onCameraImageTaken}/>

        <Text>Comments:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          multiline={true}
          value={this.state.text}
          ref='textInput' 
        />
        <View style={styles.row}>
          <View style={[styles.buttonWrap, this._disabledStyle(this.state.loading)]}>
            <Button onPress={this.submitQuestion}
              disabled={this.state.loading}>
              {buttonIcon}
              <Text style={styles.buttonText}>Answer</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  },

  _onCameraImageTaken(uri): void {
    this.setState({imageUri: uri});
  },

  _disabledStyle(disabled: bool): Object {
    if (!disabled) {
      return {};
    }
    return {opacity: 0.8};
  },

  submitQuestion(): void {
    
    if (this.state.text === '' && this.state.imageUri === '') {
      return;
    }

    this.setState({loading: true});

    UploadImage(this.state.imageUri, (external_image_url) => {

      ParseReact.Mutation.Create('answers', {
        text: this.state.text,
        user: 'spchuang',
        question: this.props.question,
        image_url: external_image_url,
      }).dispatch()
      .done(this._onSuccess)
      .fail(this._onError);
    });
  },

  _onSuccess(newAnswer: object): void {
    
    this.setState({loading: false, text: ''});
    this.props.navigator.replace({
      title: 'Question',
      component: QuestionView,
      passProps: {question: this.props.question, load: true},
    });
    // go to previous page
  },

  _onError(data): void {
    this.setState({loading: false});
    console.log(data);
    console.log("BAD");
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  input: {
    fontSize: 20,
    padding: 10,
    height: 150,
    borderColor: 'gray', 
    borderWidth: 1,
  },

  buttonWrap: {
    marginTop: 5,
    borderRadius: 8,
    padding: 10,
    width: 200,
    backgroundColor: '#DB3340',
  },

  row: {
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'HelveticaNeue-Medium',
    marginRight: 50,
  },
  buttonIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  }
});

module.exports = AnswerView;