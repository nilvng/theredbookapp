import { View, StyleSheet } from "react-native";
import LiveView from "../Symposium/Views/LiveView";
import { testData } from "../helpers/formatSelection";
import React, { useContext } from 'react';
import { Button, Text, VStack } from "@react-native-material/core";
import { UserContext } from "../Contexts";
import { auth } from "../firebase.config";

function Home({ navigation }) {
    const [user, setUser] = useContext(UserContext);

    return (
        <View style={styles.container}>
            <VStack style={styles.container} items="center" justify="center" spacing={12}>
                <Text>Welcome {user?.providerData[0].displayName ?? user?.email}</Text>

                <Button style={styles.button} title="Archive" color="purple"
                    onPress={() => navigation.navigate('Archive')}
                />
                <Button style={styles.button} title="Create" color="green"
                    onPress={() => navigation.navigate('Create')}
                />
                <Button style={styles.button} title="Logout" color="pink"
                    onPress={() => {
                        setUser(null)
                        auth.signOut()
                        navigation.navigate('Authentication')
                    }}
                />
            </VStack>

            <LiveView style={{ width: "80%" }} symposium={testData} />
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        width: "80%",
        height: 50,
        justifyContent: "center",
    },
})

export default Home;