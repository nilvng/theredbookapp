/**
 * Authentication Screen
 * 
 * This view is used to present the user a form to login or create an account.
 * This view also handles the authentication process along with the firebase helper.
 */

// React Imports
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Box, Button, Spacer, Surface, TextInput, VStack } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

// Project Imports
import { UserContext } from '../Contexts';
import { createUser, loginUser } from '../Symposium/Models/firestore-helper';


export default function AuthenticationScreen({ navigation }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState("")
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [user, setUser] = useContext(UserContext);

  // Event handler for the login and register buttons
  const handleLogin = () => {
    let authPassword = password;
    setError("");
    // Check if the user is creating an account or logging in
    if (!isLogin) {
      createUser(email, authPassword, name, (result) => {
        if (result.firebaseUser) {
          setUser(result.userData);
          navigation.navigate('Home');
        } else {
          setError(result.message);
          console.log(result);
        }
      });
    } else {
      loginUser(email, authPassword, (result) => {
        if (result.firebaseUser) {
          setUser(result.userData);
          navigation.navigate('Home');
        } else {
          setError(result.message);
          console.log(result);
        }
      });
    }
  }

  // Event handler for switching between login and register
  const handleSwitch = () => {
    setIsLogin(!isLogin);
  }

  // Render
  return (
    <View style={styles.container}>
      {/* Spacer to push the form down to the centre */}
      <Spacer />
      <Surface style={styles.surface}
        elevation={4}
        category="medium"
      >
        <VStack>
          <Text style={styles.title}>Redbook</Text>
          <Box>
            {/* Add name textbox with the tag icon when crating an account */}
            {isLogin ? null : (
              <TextInput style={styles.textBox}
                placeholder="Name" value={name} onChangeText={text => setName(text)} leading={props => <Icon name="tag" {...props} />} />
            )}
            {/* Email input. Account Icon */}
            <TextInput style={styles.textBox}
              autoCapitalize='none'
              placeholder="Email" value={email} onChangeText={text => setEmail(text)} leading={props => <Icon name="account" {...props} />} />
            {/* Password input. Lock Icon */}
            <TextInput style={styles.textBox}
              secureTextEntry={secureTextEntry}
              textContentType="password"
              placeholder='Password'
              onChangeText={text => setPassword(text)}
              leading={props => <Icon name="lock" {...props} />}
              trailing={props => <Icon name={secureTextEntry ? "eye" : "eye-off"} {...props} onPress={() => setSecureTextEntry(!secureTextEntry)} />} />
            {/* Display error message if exists */}
            {error != "" ? <Text style={{ color: "red" }}>{error}</Text> : null}
            
            {/* Login and register buttons */}
            <Button style={styles.button} title={isLogin ? "Login" : "Register"} color="pink" onPress={handleLogin} />
            <Button variant="text" title={isLogin ? "Register" : "Login"} color="white" onPress={handleSwitch} />
          </Box>
        </VStack>
      </Surface>
      <Spacer />
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  surface: {
    backgroundColor: "#4353535",
    color: '#FFFFFF',
    alignSelf: 'stretch',
    paddingHorizontal: 16,
    paddingVertical: 36,
    marginHorizontal: 16,
  },
  textBox: {
    marginTop: 16,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingBottom: 16,
  },
  button: {
    padding: 2,
    marginTop: 24,
  },
  platform: {
    backgroundColor: "transparent",
    alignSelf: 'stretch',
    borderColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#404040",
    borderLeftWidth: 20,
    borderRightWidth: 20,
    marginHorizontal: 5,
    marginTop: 28,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#303030',
    color: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 50,
  },
});
