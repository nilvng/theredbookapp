import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { auth, db } from '../firebase.config';
import { Box, Button, Spacer, Surface, TextInput, VStack } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { UserContext } from '../Contexts';


export default function AuthenticationScreen({ navigation }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState("")
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [user, setUser] = useContext(UserContext);

  const handleLogin = () => {
    let authPassword = password;
    setError("")
    //if (authPassword == "") {
    //  authPassword = "TestPassword123*";
    //}
    if (!isLogin) {
      setUser(auth.createUserWithEmailAndPassword(email, authPassword)
        .then((response) => {
          console.log("Register response: " + JSON.stringify(response.user))
          db.collection("users").doc(response.user.uid).set({
            name: name,
          }).then(() => {
            setUser({firebaseUser: response.user, userData: {name: name, image: null}});
            navigation.navigate('Home');
          }).catch((error) => {
            console.log("Error setting document:", error);
          });
        }));
    } else {
      setUser(auth.signInWithEmailAndPassword(email, authPassword)
        .catch((error) => {
          setError(error.message)
          console.log("Login error: " + JSON.stringify(error))
        }).then((response) => {
          console.log("Login response: " + JSON.stringify(response.user));
          db.collection("users").doc(response.user.uid).get().then((doc) => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              setUser({firebaseUser: response.user, userData: doc.data()});
            } else {
              setUser({firebaseUser: response.user, userData: {name: email}});
            }
            navigation.navigate('Home');
          }).catch((error) => {
            console.log("Error getting document:", error);
          });
        }));
    }
  }

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  }

  return (
    <View style={styles.container}>
      <Spacer />
      <Surface style={styles.surface}
        elevation={4}
        category="medium"
      >
        <VStack>
          <Text style={styles.title}>Redbook</Text>
          <Box>
          {isLogin ? null : (
            <TextInput style={styles.textBox}
              placeholder="Name" value={name} onChangeText={text => setName(text)} leading={props => <Icon name="tag" {...props} />} />
          )}
            <TextInput style={styles.textBox}
              autoCapitalize='none'
              placeholder="Email" value={email} onChangeText={text => setEmail(text)} leading={props => <Icon name="account" {...props} />} />
            <TextInput style={styles.textBox}
              secureTextEntry={secureTextEntry}
              textContentType="password"
              placeholder='Password'
              onChangeText={text => setPassword(text)}
              leading={props => <Icon name="lock" {...props} />}
              trailing={props => <Icon name={secureTextEntry ? "eye" : "eye-off"} {...props} onPress={() => setSecureTextEntry(!secureTextEntry)} />} />
            {error != "" ? <Text style={{ color: "red" }}>{error}</Text> : null}
            <Button style={styles.button} title={isLogin ? "Login" : "Register"} color="pink" onPress={handleLogin} />
            <Button variant="text" title={isLogin ? "Register" : "Login"} color="white" onPress={handleSwitch} />
          </Box>
        </VStack>
      </Surface>
      <Spacer />
    </View>
  )
}

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
