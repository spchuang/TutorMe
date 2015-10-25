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
    height: PropTypes.number,
  },

  getDefaultProps(): Object {
    return {
      height: 300,
    }
  },

  render(): $jsx {
    return (
      <Image style={[styles.image], {height: this.props.height}} 
        resizeMode={Image.resizeMode.contain}
        source={{uri: this.props.source}} />
    );
  },
});

var styles = StyleSheet.create({
  image: {
    alignSelf: 'stretch'
  },
});

module.exports = ImageView;