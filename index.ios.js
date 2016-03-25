/**
 * TutorMe
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

var React = require('react-native');
var Parse = require('parse/react-native').Parse;

Parse.initialize(
  '',
  '',
);

var {
  AppRegistry,
  Text,
  View,
  NavigatorIOS,
  StyleSheet,
} = React;

var TabContainer = require('./containers/TabContainer');

var TutorMe = React.createClass({
  render(): $jsx {
    return (
      <View style={{flex: 1}}>
        <TabContainer />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('TutorMe', () => TutorMe);
