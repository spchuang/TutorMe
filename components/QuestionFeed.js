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

var TimerMixin = require('react-timer-mixin');

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

var QuestionFeed = React.createClass({
  render(): $jsx {
    var movie = MOCKED_MOVIES_DATA[0];
    return (
      <View style={styles.container}>
        <Text>{movie.title}</Text>
        <Text>{movie.year}</Text>
        <TouchableHighlight onPress={() => this.selectQuestion()}>
          <Image source={{uri: movie.posters.thumbnail}} 
            style={styles.thumbnail}/>
        </TouchableHighlight>
      </View>
    );
  },

  selectQuestion(): void {
    this.props.navigator.push({
      title: 'New',
      component: QuestionFeed,
    });
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

module.exports = QuestionFeed;