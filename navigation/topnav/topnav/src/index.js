import React, {Component} from 'react'
import {StyleSheet, Text, View, StatusBar} from 'react-native'
import {createAppContainer} from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import AppNavigator from './lib/router'
const AppIndex = createAppContainer(AppNavigator)

export default class App extends Component {
  render() {
    return(
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor='red'
          barStyle='light-content'
        />
        <View style = {styles.header}>
          <Icon name='ios-camera' size={28} color='white'/>
          <Icon name='ios-menu' size={28} color='white'/>
        </View>
        <AppIndex />
      </View>
    )
  }
}
