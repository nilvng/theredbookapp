import React, { useState } from 'react';
import { StyleSheet, Text, View, SectionList, ScrollView, Pressable, Modal } from 'react-native';
import { VStack, Button, } from "@react-native-material/core";

const dummyPodcasts = [
    'Podcast #1 - Welcome to our podcast!',
    'Podcast #2 - Heated discussion with the hosts',
    'Podcast #3 - Viewer Q&A',
    'Dummy Podcast 1',
    'Dummy Podcast 2',
    'Dummy Podcast 3',
    'Dummy Podcast 4',
    'Dummy Podcast 5',
    'Dummy Podcast 6',
    'Dummy Podcast 7',
    'Dummy Podcast 8',
    'Dummy Podcast 9',
    'Dummy Podcast 10',
]

const dummyDiscusions = [
    'Ex-Amazon workers, share you experiences!',
    'What can be done about crunch time in the game-dev industry?',
]

export default function Archive({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentData, setData] = useState("asdasd")

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.container}>
                    <Text style={styles.modalTitle}>{currentData}</Text>
                </View>

                <View style={styles.container}>
                    <Button style={styles.button} title="Back" color="purple"
                        onPress={() => setModalVisible(!modalVisible)} />
                </View>
            </Modal>


            <Text style={styles.title}>Archive</Text>
            <SectionList
                sections={[
                    { title: 'Podcasts', data: dummyPodcasts },
                    { title: 'Discussions', data: dummyDiscusions },
                ]}

                renderItem={({ item }) =>
                    <Pressable
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            setData(item);
                        }}
                        style={({ pressed }) => [{
                            backgroundColor: pressed ? 'grey' : 'transparent',
                        },
                        ]}>
                        <Text style={styles.item}>{item}</Text>
                    </Pressable>}

                renderSectionHeader={({ section }) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                )}


                keyExtractor={item => `basicListEntry-${item}`}
            />

            <View>
                <Button style={styles.button} title="Go back" color="purple"
                    onPress={() => navigation.navigate('Call')} />
            </View>


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
        paddingVertical: 25,
    },
    // Headers in the list view
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
    // Items in the list view
    item: {
        backgroundColor: 'transparent',
        fontSize: 20,
        color: 'white',
        padding: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});