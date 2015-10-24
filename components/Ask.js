/**
 *
 * @flow
 */

 'use strict';

var React = require('react-native');
var QuestionView = require('./QuestionView');
var Button = require('react-native-button');
var {
  ActivityIndicatorIOS,
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableHighlight,
} = React;

var Ask = React.createClass({
  getInitialState(): $jsx {
    return {text: ""};
  },
  render(): $jsx {
    return (
      <View style={styles.container}>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <Button style={{color: 'green'}} onPress={this._handlePress}>
        Press Me!
      </Button>
      </View>
    );
  },
  _handlePress(event) {
    console.log('Pressed!');
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
  thumbnail: {
    width: 53,
    height: 81,
  },
});

module.exports = Ask;
