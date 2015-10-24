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
  ScrollView,
} = React;

var Button = require('react-native-button');
var ImageView = require('../components/ImageView');
var Swiper = require('react-native-swiper')
var TimerMixin = require('react-timer-mixin');

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
        <ScrollView style={styles.scroll}>
          <View style={styles.title}>
            <Text style={styles.text}>{MOCK_DATA[i].user} - {MOCK_DATA[i].subject}</Text>
          </View>
          <ImageView source={MOCK_DATA[i].image}/>

          <View style={styles.description}>
            <Text style={styles.text}> 
              Facebook is an open-source framework allowing you
              to ... The vertical position of each child is determined from a combination 
              Facebook is an open-source framework allowing you
              to ... The vertical position of each child is determined from a combination 
              Facebook is an open-source framework allowing you
              to ... The vertical position of each child is determined from a combination 
            </Text>

          </View>

        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.buttonWrap}>
            <Button onPress={this.answerQuestion}>
              <Icon
                name='ion|android-send'
                size={30}
                color='white'
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Answer</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  },

  answerQuestion(): void {
    this.props.navigator.push({
      title: 'New',
      component: QuestionFeedContainer,
    });
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    
  },
  scroll: {
    height: 450,
  },
  description: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#28ABE3',
  },
  footer: {
    backgroundColor: 'transparent',
    marginBottom: 120,
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
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

  buttonWrap: {
    marginTop: 5,
    borderRadius: 8,
    padding: 10,
    width: 200,
    backgroundColor: 'DB3340',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'HelveticaNeue-Medium',
    marginRight: 50,
  },
  buttonIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  }
});

module.exports = QuestionFeedContainer;