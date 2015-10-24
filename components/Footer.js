/**
 *
 * @flow
 */

 'use strict';

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var { Icon, TabBarIOS, Spinner} = require('react-native-icons');
var TabBarItemIOS = TabBarIOS.Item;

var Footer = React.createClass({


  getInitialState(): Object {
    return {
      selectedTab: 'home',
    };
  },

  render(): $jsx {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={'#c1d82f'}
        barTintColor={'#000000'}
        styles={styles.tabBar}>
        <TabBarItemIOS
          name="home"
          iconName={'ion|ios-home-outline'}
          title={''}
          badgeValue={'3'}
          iconSize={32}
          accessibilityLabel="Home Tab"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}>
          {this._renderContent()}
        </TabBarItemIOS>
        <TabBarItemIOS
          name="articles"
          iconName={'ion|ios-paper-outline'}
          title={''}
          iconSize={32}
          accessibilityLabel="Articles Tab"
          selected={this.state.selectedTab === 'articles'}
          onPress={() => {
            this.setState({
              selectedTab: 'articles',
            });
          }}>
          {this._renderContent()}
        </TabBarItemIOS>
        <TabBarItemIOS
          name="messages"
          iconName={'ion|chatboxes'}
          title={''}
          iconSize={32}
          accessibilityLabel="Messages Tab"
          selected={this.state.selectedTab === 'messages'}
          onPress={() => {
            this.setState({
              selectedTab: 'messages',
            });
          }}>
          {this._renderContent()}
        </TabBarItemIOS>
        <TabBarItemIOS
          name="settings"
          iconName={'ion|ios-gear'}
          title={''}
          iconSize={32}
          accessibilityLabel="Settings Tab"
          selected={this.state.selectedTab === 'settings'}
          onPress={() => {
            this.setState({
              selectedTab: 'settings',
            });
          }}>
          <View style={styles.container}>
            <Text> WHAT</Text>
          </View>
        </TabBarItemIOS>
      </TabBarIOS>
    );
  },

  select(): void {
    // call parent on select
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

module.exports = Footer;