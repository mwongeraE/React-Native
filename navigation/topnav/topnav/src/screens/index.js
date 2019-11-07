import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text> Home Screen </Text>
      </View>
    )
  }
}

HomeScreen.navigationOptions={
  tabBarIcon:({tintColor, focused}) => (
    <Icon
      name={focused ? 'Ios home': 'md-home'}
      color={tintColor}
      size{25}
    />
  )
}
