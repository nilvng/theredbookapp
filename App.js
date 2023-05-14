import React from 'react';
import Chat from './views/Chat';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Archive from './views/archive';
import IncomingCall, { testData } from './views/incomingCall';
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CardStyleInterpolators } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateModal from './Symposium/Views/CreateModal';
import Home from './views/home';

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {

  function HomeScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={Home} />
        <HomeStack.Screen
          name="Call"
          component={IncomingCall}
        />
        <HomeStack.Screen
          name="Archive"
          component={Archive}
        />
        <HomeStack.Screen
          name="Chat"
          component={Chat} />
        <HomeStack.Screen
          name='Create'
          options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, presentation: "transparentModal" }}>
          {props => <CreateModal {...props} space={testData} />}
        </HomeStack.Screen>
      </HomeStack.Navigator>
    );
  }

  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            let color;
            if (route.name === 'Symposiums') {
              iconName = focused ? 'ios-headset' : 'headset-outline';
              color = focused ? '#B43138' : '#1E1E1E';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
              color = focused ? '#B43138' : '#1E1E1E';
            }
            return <Ionicons name={iconName} size={25} color={color} />;
          },

          tabBarActiveTintColor: '#B43138',
          tabBarInactiveTintColor: '#1E1E1E',
        })}
      >
        <Tab.Screen name="Symposiums" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
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
