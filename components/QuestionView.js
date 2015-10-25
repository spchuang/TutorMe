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
  ScrollView,
  ActivityIndicatorIOS,
} = React;

var Button = require('react-native-button');
var ImageView = require('../components/ImageView');
var AnswerView = require('../components/AnswerView');
var Swiper = require('react-native-swiper');

var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var { Icon, } = require('react-native-icons');


var QuestionView = React.createClass({

  propTypes: {
    question: PropTypes.object.isRequired,
  },

  render(): $jsx {
    var question = this.props.question;
    return (
      <View>
        <View style={styles.title}>
          <Text style={styles.text}>{question.user} - {question.subject}</Text>
        </View>
        <ImageView source={question.image.url()}/>

        <View style={[styles.center, styles.description]}>
          <Text style={styles.text}> 
            Facebook is an open-source framework allowing you
            to ... The vertical position of each child is determined from a combination 
            Facebook is an open-source framework allowing you
            to ... The vertical position of each child is determined from a combination 
            Facebook is an open-source framework allowing you
          </Text>
        </View>
      </View>
    );
  },  
});

var styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  description: {
    padding: 10,
    backgroundColor: '#28ABE3',
  },
  title: {
    backgroundColor: '#28ABE3',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});

module.exports = QuestionView;