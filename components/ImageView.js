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
    console.log(this.props);
    return (
      <Image style={styles.image} 
        source={{uri: this.props.source}} />
    );
  },
});

var styles = StyleSheet.create({
  image: {
    height: 300,
  },
});

module.exports = ImageView;