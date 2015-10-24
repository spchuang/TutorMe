/**
 *
 * @flow
 */

 'use strict';

var React = require('react-native');

var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var Swiper = require('react-native-swiper')
var TimerMixin = require('react-timer-mixin');
var ImageView = require('../components/ImageView');

var { Icon, } = require('react-native-icons');

var MOCK_DATA = [
  {user: 'Mike', subject: 'Chemistry', image: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa49a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg'},
  {user: 'Sam', subject: 'Calculus', image: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa49a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg'},
  {user: 'John', subject: 'Chemistry', image: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa49a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg'},
  {user: 'Jason', subject: 'Algebra', image: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa49a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg'},
  {user: 'Jack', subject: 'Chemistry', image: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa49a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg'},
  {user: 'Mike', subject: 'Chemistry', image: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa49a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg'},
  {user: 'Jordan', subject: 'Physics', image: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa49a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg'},
  {user: 'Andrew', subject: 'Chemistry', image: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa49a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg'},
  {user: 'Amy', subject: 'Chemistry', image: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa49a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg'},
];

var QuestionFeedContainer = React.createClass({
  render(): $jsx {
    var questions = [];
    for (var i = 0; i < MOCK_DATA.length; i++) {
      questions.push(this._renderQuestion(i));
    }
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} 
          showsButtons={false} 
          showsPagination={false}>
          {questions}
        </Swiper>
      </View>
    );
  },

  _renderQuestion(i: num): $jsx {
    return (
      <View style={styles.slide}>
        <View style={styles.header}>
          <Text style={styles.text}>{MOCK_DATA[i].user} - {MOCK_DATA[i].subject}</Text>
        </View>
        <ImageView source={MOCK_DATA[i].image}/>

        <View style={styles.description}>
          <Text style={styles.text}> TEST</Text>
        </View>

        <View style={styles.row}>
          
          <TouchableHighlight 
            onPress={() => this.answerQuestion()}
            underlayColor="#E25C66"
            style={styles.buttonWrap}
            >
            <View style={styles.button}>
              <Icon
                name='ion|android-send'
                size={30}
                color='white'
                style={styles.buttonIcon}
                />
              <Text style={styles.buttonText}>Answer</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  },

  answerQuestion(): void {
    this.props.navigator.push({
      title: 'New',
      component: QuestionFeed,
    });
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },

  description: {

  },

  slide: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    backgroundColor: '#28ABE3',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  row: {
    alignItems: 'center',
  },

  buttonWrap: {
    marginTop: 15,
    borderRadius: 8,
    padding: 10,
    width: 200,
    backgroundColor: 'DB3340',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'HelveticaNeue-Medium',
  },
  buttonIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  }
});

module.exports = QuestionFeedContainer;