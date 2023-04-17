import { StyleSheet, Text, View } from 'react-native';
import { VStack, Box, Divider, Avatar, HStack, Button, Spacer } from "@react-native-material/core";


export default function Archive({ navigation }) {
    return (
        <View style={styles.container}>
            <VStack m={4} spacing={2}>
                <Button style={styles.button} title="Go back" color="blue"
                    onPress={() => navigation.navigate('Call')} />

            </VStack>
        </View>
    )

}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 1,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    button: {
        padding: 4
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