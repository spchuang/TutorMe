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
  ActivityIndicatorIOS,
} = React;

var Button = require('react-native-button');
var AnswerView = require('../components/AnswerView');
var QuestionView = require('../components/QuestionView');
var Swiper = require('react-native-swiper');

var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var { Icon, } = require('react-native-icons');

var QuestionFeedContainer = React.createClass({
  getInitialState(): Object {
    return {
      loading: false,
      questions: [],
      index: 0,
    };
  },

  componentWillMount(): void {
    this._query();
  },

  _query(): void {
    if (this.state.loading) {
      return;
    }

    this.setState({loading: true});

    var query = (new Parse.Query('questions'))
      .descending("updatedAt");
    query.find({
      success: this._onSuccess,
      error: ()=> {
        console.log("ERROR!");
      },
    });
  },

  _onSuccess(questions: array): void {
    this.setState({
      loading: false ,
      questions: questions,
    });
  },

  render(): $jsx {
    if (this.state.loading) {
      return (
        <View style={[styles.center, styles.container]}>
          <ActivityIndicatorIOS
            animating={true}
            style={styles.spinner}
            size="large"
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper}
          showsButtons={false}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          showsPagination={false}>
          {this._renderQuestions()}
        </Swiper>
      </View>
    );
  },

  _onMomentumScrollEnd(e, state, context): void {
    var newIndex = state.index;
    if (newIndex !== this.state.index) {
      this.setState({index: newIndex});
    }
  },

  _renderQuestions(): $jsx {
    var questions = [];
    for (var i = 0; i < this.state.questions.length; i++) {
      questions.push(this._renderQuestion(i));
    }
    return questions;
  },

  _renderQuestion(i: num): $jsx {
    var question = this.state.questions[i];

    return (
      <View style={styles.slide}>
        <QuestionView
          question={question}
          load={this.state.index === i}
          styles={styles.scroll}
          />
        <View style={[styles.center, styles.footer]}>
          <View style={styles.buttonWrap}>
            <Button onPress={this._onAnswerQuestionClick}>
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

  _onAnswerQuestionClick(): void {
    this.props.navigator.push({
      title: 'Answer',
      component: AnswerView,
      passProps: {question: this.state.questions[this.state.index]},
    });
  },
});

var styles = StyleSheet.create({
  spinner: {
    marginTop: 100,
  },
  center: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 64,
  },
  scroll: {
    height: 450,
  },
  footer: {
    backgroundColor: 'transparent',
    marginBottom: 120,
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
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
