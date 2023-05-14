import { View, StyleSheet } from "react-native";
import React from 'react';
import { Button, HStack, VStack } from "@react-native-material/core";
import LiveView from "../Symposium/Views/LiveView";
import { testData } from "./incomingCall";

function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <VStack style={styles.container} items="center" justify="center" spacing={12}>
                <Button style={styles.button} title="Archive" color="purple"
                    onPress={() => navigation.navigate('Archive')}
                />
                <Button style={styles.button} title="Create" color="green"
                    onPress={() => navigation.navigate('Create')}
                />
                <Button style={styles.button} title="Incoming Call" color="blue"
                    onPress={() => navigation.navigate('Call')}
                />
                <Button style={styles.button} title="Chat" color="red"
                    onPress={() => navigation.navigate('Chat')}
                />
                <Button style={styles.button} title="Authentication" color="orange"
                    onPress={() => navigation.navigate('Authentication')}
                />
            </VStack>
            <LiveView symposium={testData} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        padding: 4
    },
})

export default Home;