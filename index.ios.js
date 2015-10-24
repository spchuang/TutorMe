/**
 * TutorMe
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  Text,
  View,
  NavigatorIOS,
  StyleSheet,
} = React;

var QuestionFeed = require('./components/QuestionFeed');
var Footer = require('./components/Footer');

var TutorMe = React.createClass({
  render(): $jsx {
    return (
      <View style={{flex: 1}}>
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'Questions',
            component: QuestionFeed,
          }}
        />
        <Footer/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('TutorMe', () => TutorMe);
