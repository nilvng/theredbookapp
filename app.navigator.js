import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IncomingCall from './views/incomingCall';
import Archive from './views/archive';
import Login from './views/login';

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
    <Navigator initialRouteName='Login'>
        <Screen name='Login' component={Login}></Screen>
        <Screen name='IncomingCall' component={IncomingCall}></Screen>
        <Screen name='Archive' component={Archive}></Screen>
    </Navigator>
}

export default AppNavigator;