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
  TextInput,
} = React;

var Button = require('react-native-button');
var { Icon, } = require('react-native-icons');

var AnswerView = React.createClass({
  
  getInitialState(): Object {
    return {
      text: '',
    }
  },

  render(): $jsx {
    return (
      <View style={styles.container}>
        <Text>Comments:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          multiline={true}
          value={this.state.text}
        />
        <View style={styles.row}>
          <View style={styles.buttonWrap}>
            <Button onPress={this.submitQuestion}>
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

  submitQuestion(): void {

  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },
  input: {
    fontSize: 20,
    padding: 10,
    height: 250,
    borderColor: 'gray', 
    borderWidth: 1,
  },

  row: {
    alignItems: 'center',
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

module.exports = AnswerView;