import { StyleSheet, Text, View, SectionList } from 'react-native';
import { VStack, Button, } from "@react-native-material/core";

const dummyPodcasts = [
    'Podcast #1 - Welcome to our podcast!',
    'Podcast #2 - Heated discussion with the hosts',
    'Podcast #3 - Viewer Q&A',
]

const dummyDiscusions = [
    'Ex-Amazon workers, share you experiences!',
    'What can be done about crunch time in the game-dev industry?',
]

export default function Archive({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>ARCHIVE</Text>
            <SectionList
                sections={[
                    { title: 'Podcasts', data: dummyPodcasts },
                    { title: 'Discussions', data: dummyDiscusions },
                ]}
                renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={item => `basicListEntry-${item}`}
            />

            <VStack m={4} spacing={2}>
                <Button style={styles.button} title="Go back" color="blue"
                    onPress={() => navigation.navigate('Call')} />
            </VStack>
        </View>
    )

}

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
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
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: 'grey',
        color: 'white'
    },
    item: {
        backgroundColor: 'transparent',
        fontSize: 20,
        color: 'white',
        padding: 5,
    },
});