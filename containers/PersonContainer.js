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
  View,
  Text,
  ActivityIndicatorIOS,
  TextInput,
  TouchableHighlight,
  ScrollView,
} = React;


var Button = require('react-native-button');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var QuestionView = require('../components/QuestionView');
var QuestionListView = require('../components/QuestionListView');

var TABS = {
  ANSWERS: 'answers',
  QUESTIONS: 'questions',
}

var PersonContainer = React.createClass({

  getInitialState(): Object {
    return {
      selected: TABS.QUESTIONS,
      myAnswers: [],
      myQuestions: [],
      loading: false,
      loadedAnswers: false,
      laodedQuestions: false,
    }
  },

  componentWillMount(): void {
    this._query();
  },

  componentDidUpdate(prevProps: object, prevStates: object): void {
    if (prevStates.selected !== this.state.selected) {
      this._query();
    }
  },

  render(): Object {
    var list = this.state.selected === TABS.QUESTIONS
      ? this.state.myQuestions
      : this.state.myAnswers;

    var content = null;
    if (this.state.loading) {
      var content = (
        <View style={[styles.center, styles.container]}>
          <ActivityIndicatorIOS
            animating={true}
            style={styles.spinner}
            size="large"
          />
        </View>
      );
    } else {
      content = 
        <ScrollView style={styles.scroll}>
          <QuestionListView list={list} onItemClick={this._onClick}/>
        </ScrollView>;
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerWrap}>
          {this._renderTabItem(TABS.QUESTIONS, 'My Questions')}
          {this._renderTabItem(TABS.ANSWERS, 'My Answers')}
        </View>
        {content}
      </View>
    );
  },

  _renderTabItem(tab: string, text: string): $jsx {
    return (
      <TouchableHighlight 
        style={[styles.headerItem, {backgroundColor: this._getHeaderColor(tab)}]}
        onPress={() => {
          if (this.state.loading) {
            return;
          }
          this.setState({selected: tab});
        }}
        underlayColor={this._getHeaderColor(tab)}>
         <Text style={styles.text}>{text}</Text>
      </TouchableHighlight>
    );
  },


  _getHeaderColor(tab: string): object{
    return this.state.selected === tab
      ? '#1FDA9A'
      : '#E8B71A';
  },

  _onClick(question: object): void {
    console.log(question);
    this.props.navigator.push({
      title: 'Question',
      component: QuestionView,
      passProps: {question: question, load: true},
    });

  },

  _query(): void {
    if (this.state.loading) {
      return;
    }

    this.setState({loading: true});
    var query;

    if (this.state.selected === TABS.QUESTIONS) {
      query = (new Parse.Query('questions'))
        .equalTo('user', 'spchuang')
        .descending("updatedAt");

      query.find({
        success: this._onSuccess,
        error: this._onError,
      });
    } else {
      query = (new Parse.Query('answers'))
        .equalTo("user", 'spchuang');

      query.find({
        success: (answers) => {

          // filter out the question ids
          var questions = answers.map((answer) => {
            return answer.get('question');
          })
          
          questions = questions.filter(n => {return n != undefined }); 
          this._onSuccess(questions);
        },
        error: this._onError,
      });
    }
  },

  _onSuccess(list: array): void {
    if (this.state.selected === TABS.QUESTIONS) {
      this.setState({myQuestions: list});
    } else {
      this.setState({myAnswers: list});
    }

    this.setState({loading: false});
  },

  _onError(): void {

  },
});

var styles = StyleSheet.create({
  spinner: {
    marginTop: 100,
  },
  scroll: {
    flex: 1,
    marginBottom: 48,
  },
  center: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 64,
  },
  headerWrap: {
    flexDirection: "row",
  },
  headerItem: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'HelveticaNeue-Medium',
  },
});

module.exports = PersonContainer;