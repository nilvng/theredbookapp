import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IncomingCall from './views/incomingCall';
import Archive from './views/archive';

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
        <Navigator initialRouteName='IncomingCall'>
            <Screen name='IncomingCall' component={IncomingCall}></Screen>
            <Screen name='Archive' component={Archive}></Screen>
        </Navigator>
}

export default AppNavigator;