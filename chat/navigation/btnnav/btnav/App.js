import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, YellowBox } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeActivity from './component/activity/HomeActivity';
import ProfileActivity from './component/activity/ProfileActivity';


const RootStack = createStackNavigator(
  {
    Home: { screen: HomeActivity },
    Profile: { screen: ProfileActivity },
  },
  {
  initialRouteName: 'Home',
  }
)

const App = createAppContainer(RootStack)

export default App;

YellowBox.ignoreWarnings(
  ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']
)
