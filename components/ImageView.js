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
} = React;

var ImageView = React.createClass({
  propTypes: {
    source: PropTypes.string,
  },
  render(): $jsx {
    return (
      <Image style={styles.image} 
        resizeMode={Image.resizeMode.contain}
        source={{uri: this.props.source}} />
    );
  },
});

var styles = StyleSheet.create({
  image: {
    height: 300,
    alignSelf: 'stretch'
  },
});

module.exports = ImageView;