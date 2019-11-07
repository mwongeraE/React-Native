/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import OnBoardingComponent, { AppEntry } from 'react-native-onboarding-animate'

import {
  FirstScene,
  SecondScene,
  ThirdScene,
} from './components/ExampleScenes'

export default class OnBoardingView extends Component {

  _onBoardingCompleted = () => {
    alert('Boarding process is completed')
  }

  render() {
    let scenes = [
      {
        component: FirstScene,
        backgroundColor: '#512DA8'
      },
      {
        component: SecondScene,
        backgroundColor: '#388E3C',
      },
      {
        component: ThirdScene,
        backgroundColor: '#1976D2'
      },
    ]

    return (
      <OnBoardingComponent
        scenes={scenes}
        enableBackgroundColorTransition={true}
        onCompleted={this._onBoardingCompleted} 
        />
    )
  }
}
