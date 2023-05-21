import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import { default as styles } from '../styles/Authentication';
import { auth } from '../firebase.config';

export default function AuthenticationScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onRegisterPress = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((response) => {
                console.log("Registration response: " + response.user)
                navigation.navigate('Archive')
            })
    }

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <Image
                style={styles.logo}
                source={require('../assets/redbook_logo.png')}
            />
            <TextInput
                style={styles.input}
                placeholder='E-mail'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder='Password'
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => onRegisterPress()}>
                <Text style={styles.buttonTitle}>Register account</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign in</Text></Text>
                <Button title="Go home (Dev)" onPress={() => navigation.navigate('Home')} />
            </View>
        </View>
    )
}