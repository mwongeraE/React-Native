import React from 'react'
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import HomeScreen from "..screens/index"
import ProfileScreen from "..screens/profile"
import SettingsScreen from "..screens/settings"

const AppNavigator = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Settings: SettingsScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: 'red'
      }
    }
  }
)

export default createAppContainer(AppNavigator);
