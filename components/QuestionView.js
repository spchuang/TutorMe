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
  ScrollView,
  View,
  ActivityIndicatorIOS,
} = React;

var Button = require('react-native-button');
var ImageView = require('../components/ImageView');

var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var QuestionView = React.createClass({

  propTypes: {
    question: PropTypes.object.isRequired,
    // if this is true, load the answers
    load: PropTypes.bool,
  },

  getInitialState(): object {
    return {
      loading: false,
      answers: [],
      loaded: false,
    }
  },

  componentWillMount(): void {
    if (this.props.load) {
      this._loadAnswersForQuestion();
    }
  },

  componentWillReceiveProps(nextProps: Object): void {
    if (nextProps.load) {
      this._loadAnswersForQuestion();
    }
  },

  render(): $jsx {
    var question = this.props.question;

    return (
      <ScrollView style={this.props.style}>
        <View style={styles.title}>
          <Text style={styles.text}>{question.get('user')} - {question.get('subject')}</Text>
        </View>
        <ImageView source={question.get('image').url()}/>

        <View style={[styles.center, styles.description]}>
          <Text style={styles.text}> 
            Facebook is an open-source framework allowing you
            to ... The vertical position of each child is determined from a combination 
            Facebook is an open-source framework allowing you
            to ... The vertical position of each child is determined from a combination 
            Facebook is an open-source framework allowing you
          </Text>
        </View>

        {this._renderAnswers()}
      </ScrollView>
    );
  }, 

  _loadAnswersForQuestion(): void {
    if (this.state.loading || this.state.loaded) {
      return;
    }

    this.setState({loading: true});

    var query =  (new Parse.Query('answers'))
      .ascending("updatedAt")
      .equalTo("question", this.props.question);
    query.find({
      success: this._onSuccess,
      error: this._onError,
    });
  },

  _onSuccess(answers): void {
    /*
    if (answers.length) {
        var answersCache = this.state.answersCache;
        answersCache[question.id.objectId] = answers;

        this.setState({
          answersCache: answersCache,
        })
      }
    */

    this.setState({loading: false, loaded: true, answers: answers});
  },

  _onError(): void {
    this.setState({loading: false});
  },

  _renderAnswers(): $jx {
    console.log(this.state.answers);
    var answers = [];
    for (var i = 0; i < this.state.answers.length; i++) {
      answers.push(this._renderAnswer(i));
    }
    return answers;
  },

  _renderAnswer(i: number): $jsx {
    var answer = this.state.answers[i];
    
    var image = answer.get('image')
      ? <ImageView 
          source={answer.get('image').url()} 
          height={200}/>
      : null;
    return (
      <View>
        <View style={styles.answerTitle}>
          <Text style={styles.text}>{answer.get('user')} answered</Text>
        </View>
        {image}

        <View style={[styles.center, styles.answerDescription]}>
          <Text style={styles.text}> 
            {answer.get('text')}
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

  answerTitle: {
    backgroundColor: '#E8B71A',
    padding: 10,
  },
  answerDescription: {
    padding: 10,
    backgroundColor: '#E8B71A',
  }
});

module.exports = QuestionView;