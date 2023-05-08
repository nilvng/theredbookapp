import React from 'react';
import Chat from './views/Chat';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Archive from './views/archive';
import IncomingCall, { testData } from './views/incomingCall';
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import CreateModal from './Symposium/Views/CreateModal';
import { useState, useCallback, useEffect } from 'react';
import { createTable, getAll } from './Symposium/Models/symposium-db';
import Home from './views/home';

const Stack = createStackNavigator();

export default function App() {
  const [spaces, setSpace] = useState([])

  const loadData = useCallback(async () => {
    try {
      await createTable()
      getAll().then((data) => {
        console.log(data);
        setSpace(data);
      })
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="Home"
          component={Home} />
        <Stack.Screen
          name="Call"
          component={IncomingCall}
        />
        <Stack.Screen
          name="Archive"
          component={Archive}
        />
        <Stack.Screen
          name="Chat"
          component={Chat} />
        <Stack.Screen
          name='Create'
          options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, presentation: "transparentModal" }}>
          {props => <CreateModal {...props} space={testData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
