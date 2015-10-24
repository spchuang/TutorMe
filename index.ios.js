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

<<<<<<< HEAD
var TabContainer = require('./containers/TabContainer');
=======
var TabContainer = require('./components/TabContainer');
>>>>>>> 5146bac10ada4d46eae9da55913e942a841d6502

var TutorMe = React.createClass({
  render(): $jsx {
    return (
      <View style={{flex: 1}}>
        <TabContainer />
      </View>
    );
  },
<<<<<<< HEAD
=======
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
>>>>>>> 5146bac10ada4d46eae9da55913e942a841d6502
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('TutorMe', () => TutorMe);
