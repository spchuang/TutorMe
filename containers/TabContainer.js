/**
 *
 * @flow
 */

 'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  NavigatorIOS,
  Text,
} = React;

var QuestionFeedContainer = require('./QuestionFeedContainer');
var PersonContainer = require('./PersonContainer');
var Ask = require('../components/Ask');

var { Icon, TabBarIOS, Spinner} = require('react-native-icons');
var TabBarItemIOS = TabBarIOS.Item;

var TABS = {
  QUESTION_FEED: 'question_feed',
  PERSON: 'person',
  ASK: 'ask',
  NOTIFICATION: 'notification',
  SETTINGS: 'settings',
};

var TabContainer = React.createClass({
  getInitialState(): Object {
    return {
      selectedTab: TABS.QUESTION_FEED,
    };
  },

  render(): $jsx {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={'#1FDA9A'}
        barTintColor={'#000000'}
        styles={styles.tabBar}>
        {this._renderQuestionFeedTab()}
        {this._renderPersonTab()}
        {this._renderAskTab()}
        {this._renderNotificationTab()}
        {this._renderSettingsTab()}
      </TabBarIOS>
    );
  },

  _renderQuestionFeedTab(): $jsx {
    return (
      <TabBarItemIOS
        name={TABS.QUESTION_FEED}
        iconName={'ion|ios-flame'}
        title={''}
        iconSize={32}
        accessibilityLabel="Home Tab"
        selected={this.state.selectedTab === TABS.QUESTION_FEED}
        onPress={() => {this.setState({selectedTab: TABS.QUESTION_FEED})}}>
        <NavigatorIOS
          style={styles.nav}
          initialRoute={{
            title: 'Questions',
            component: QuestionFeedContainer,
          }}
        />
      </TabBarItemIOS>
    );
  },

  _renderPersonTab(): $jsx {
    return (
      <TabBarItemIOS
        name={TABS.PERSON}
        iconName={'ion|ios-person'}
        title={''}
        iconSize={32}
        accessibilityLabel="Articles Tab"
        selected={this.state.selectedTab === TABS.PERSON}
        onPress={() => {this.setState({selectedTab: TABS.PERSON})}}>
        <NavigatorIOS
          style={styles.nav}
          initialRoute={{
            title: '',
            component: PersonContainer,
          }}
        />
      </TabBarItemIOS>
    );
  },

  _renderAskTab(): $jsx {
    return (
      <TabBarItemIOS
        name={TABS.ASK}
        iconName={'ion|plus-circled'}
        title={''}
        iconSize={32}
        accessibilityLabel="Messages Tab"
        selected={this.state.selectedTab === TABS.ASK}
        onPress={() => {this.setState({selectedTab: TABS.ASK})}}>
        <Ask />
      </TabBarItemIOS>
    );
  },

  _renderNotificationTab(): $jsx {
    return (
      <TabBarItemIOS
        name={TABS.NOTIFICATION}
        iconName={'ion|earth'}
        title={''}
        iconSize={32}
        accessibilityLabel="Settings Tab"
        selected={this.state.selectedTab === TABS.NOTIFICATION}
        onPress={() => {this.setState({ selectedTab: TABS.NOTIFICATION})}}>
        <View style={styles.container}>
          <Text> WEST</Text>
        </View>
      </TabBarItemIOS>
    );
  },

  _renderSettingsTab(): $jsx {
    return (
      <TabBarItemIOS
        name={TABS.SETTINGS}
        iconName={'ion|ios-gear'}
        title={''}
        iconSize={32}
        accessibilityLabel="Settings Tab"
        selected={this.state.selectedTab === TABS.SETTINGS}
        onPress={() => {this.setState({ selectedTab: TABS.SETTINGS})}}>
        <View style={styles.container}>
          <Text> WEST</Text>
        </View>
      </TabBarItemIOS>
    );
  },

  _renderContent(): $jsx {
    return (
      <View style={styles.container}>
        <Text> TEST</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  nav: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#dfdfdf',
    flex: 1,
    color: '#ff0000',
    tintColor: '#877324'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = TabContainer;
