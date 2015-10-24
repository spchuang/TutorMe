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
  TabBarIOS,
  TouchableHighlight,
} = React;

var Footer = React.createClass({


  getInitialState(): Object {
    return {
      selectedTab: 'home',
      notifCount: 0,
      presses: 0,
      //rotation: Animated.Value(0)
    };
  },

  render(): $jsx {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'welcome'}
          icon={{uri:'featured'}}
          onPress={() => {
              this.setState({
                  selectedTab: 'welcome',
              });
          }}>
          TEST
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'more'}
          icon={{uri:'contacts'}}
          onPress={() => {
                this.setState({
                    selectedTab: 'more',
                });
          }}>
          TEST
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

  select(): void {
    // call parent on select
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: .5,
    backgroundColor: 'green',
    height: 32,
  },
});

module.exports = Footer;