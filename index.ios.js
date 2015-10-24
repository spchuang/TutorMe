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

var TabContainer = require('./components/TabContainer');

var TutorMe = React.createClass({
  render(): $jsx {
    return (
      <View style={{flex: 1}}>
        <TabContainer/>
      </View>
    );
  },
  _renderMainView(selectedState: string): $jsx {
    if (selectedState === 'home') {
      return (
        <NavigatorIOS
          style={styles.container}

        />
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <Text> TEST</Text>
        </View>
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('TutorMe', () => TutorMe);
