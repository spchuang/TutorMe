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
var ImageView = require('../components/ImageView');
var AnswerView = require('../components/AnswerView');
var QuestionView = require('../components/QuestionView');
var Swiper = require('react-native-swiper');

var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var { Icon, } = require('react-native-icons');

var QuestionFeedContainer = React.createClass({
  mixins: [ParseReact.Mixin],
  getInitialState(): Object {
    return {
      isLoading: true,
      questions: [],
      index: 0,
      loadingAnswers: false,
      answersCache: {},
    };
  },

  observe: function(props, state) {
    var query = new Parse.Query('questions');
    return state.isLoading ?  {questions: query} : null;
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevState.isLoading && (this.pendingQueries().length == 0)) {
      if (this.data.questions.length !== 0) {
        this._loadAnswersForQuestion(this.data.questions[0], 0);
      }

      this.setState({
        isLoading: false ,
        questions: this.data.questions,
      });
    }
  },

  render(): $jsx {
    if (this.state.isLoading) {
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
      this._loadAnswersForQuestion(
        this.state.questions[newIndex], 
        newIndex,
      );

      this.setState({index: newIndex});
    }
  },

  _loadAnswersForQuestion(question: Object, index: number): void {
    if (this.state.loadingAnswer) {
      return;
    }

    this.setState({loadingAnswers: true});

    var query =  new Parse.Query('answers');
    query.equalTo("question", question);
    query.find({
      success: (answers) => {
        if (answers.length) {
          var answersCache = this.state.answersCache;
          answersCache[question.id.objectId] = answers;

          this.setState({
            answersCache: answersCache,
          })
        }
        this.setState({loadingAnswers: true});
      },
      error: () => {
        console.log("ERROR");
        this.setState({loadingAnswers: true});
      }
    });
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
        <ScrollView style={styles.scroll}>
          <QuestionView question={question}/>
        </ScrollView>
        <View style={[styles.center, styles.footer]}>
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