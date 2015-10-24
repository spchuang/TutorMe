/**
 *
 * @flow
 */

 'use strict';

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var QuestionView = React.createClass({
  render(): $jsx {
    return (
      <View style={styles.container}>
        <Text>
          {this.props.text}
        </Text>
        <Image source={{uri: this.props.image}}
          style={styles.image}/>
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
  thumbnail: {
    width: 53,
    height: 81,
  },
});

module.exports = QuestionView;
