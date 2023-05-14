import { View, StyleSheet } from "react-native";
import React from 'react';
import { Button, HStack, VStack } from "@react-native-material/core";

function Home({ navigation }) {
    return (
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
        </VStack>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        borderRadius: 90,
        width: "70%",
        padding: 4
    },
})

export default Home;