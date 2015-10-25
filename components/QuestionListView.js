/**
 *
 * @flow
 */

 'use strict';

var React = require('react-native');

var {
  Image,
  StyleSheet,
  PropTypes,
  Text,
  View,
  ActivityIndicatorIOS,
  TouchableHighlight,
} = React;

var Button = require('react-native-button');
var ImageView = require('./ImageView');

var { Icon, } = require('react-native-icons');

var QuestionListView = React.createClass({
  propTypes: {
    list: PropTypes.array.isRequired,
    onItemClick: PropTypes.func,
  },

  render(): $jsx {
    var items = [];
    for (var i = 0; i < this.props.list.length; i++) {
      items.push(this._renderItem(i));
    }

    return (
      <View style={styles.container}>
        {items}
      </View>
    );
  },

  _renderItem(i: number): $jsx {
    var item = this.props.list[i];
    return (
      <TouchableHighlight
        underlayColor='CCFFFF'>
        <View style={styles.itemRow}>
          <Image
            source={{uri: item.get('image').url()}}
            style={styles.thumbnail}
            resizeMode={Image.resizeMode.contain}/>
          <View style={styles.rightContainer}>
            <Text style={styles.subject}>{item.get('subject')}</Text>
            <Text style={styles.title}>TEST</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
  spinner: {
    marginTop: 100,
  },
  container: {
    flex: 1,
  },
  itemRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  thumbnail: {
    width: 90,
    height: 90,
    marginLeft: 25,
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
  },
  subject: {

  }
});

module.exports = QuestionListView;