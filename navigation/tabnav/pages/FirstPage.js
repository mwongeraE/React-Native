import React, { Component } from 'react';
import { Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'

export default class FirstPage extends React.Component {
    render() {
        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='rocket1' size={30} color="#900"  />

                <Text>Home Screen</Text>
            </View> 
        
            
        )   
    }
}