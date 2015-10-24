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

var AnswerView = React.createClass({
  
  getInitialState(): Object {
    return {
      text: '',
    }
  },

  render(): $jsx {
    return (
      <View style={styles.container}>
         <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          multiline={true}
          value={this.state.text}
        />
      </View>
    );
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
    height: 200,
    borderColor: 'gray', 
    borderWidth: 1,
  },
});

module.exports = AnswerView;