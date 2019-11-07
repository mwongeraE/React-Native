import React from 'react';
import { Image } from 'react-native';

import OnBoarding from 'react-native-onboarding-swiper'

const Simple = () => (
  <OnBoarding
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image source={require('./images/circle.png')} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={require('./images/square.png')} />,
        title: 'The Title',
        subtitle: 'This is the subtitle that sumplements the title.',
      },
      {
        backgroundColor: '#999',
        image: <Image source={require('./images/triangle.png')} />,
        title: 'Triangle',
        subtitle: "Beautiful, isn't it?",
      },
    ]}
  />
);

export default class App extends React.Component {
  render() {
    return (
      <Simple />
    )
  }
}
