import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { VStack, Button, HStack } from "@react-native-material/core";
import { StackActions } from '@react-navigation/native';
import Card from '../components/card';


const dummyPodcasts = [
    { title: 'Podcast #1', description: 'Welcome to our podcast!', host: 'Nick' },
    { title: 'Podcast #2', description: 'Heated discussion with the hosts', host: 'Nick' },
    { title: 'Podcast #3', description: 'Viewer Q&A', host: 'Nick' },
    { title: 'Dummy Podcast 1', description: 'Dummy podcast', host: 'Nick' },
    { title: 'Dummy Podcast 2', description: 'Dummy podcast', host: 'Nick' },
    { title: 'Dummy Podcast 3', description: 'Dummy podcast', host: 'Nick' },
    { title: 'Dummy Podcast 4', description: 'Dummy podcast', host: 'Nick' },
    { title: 'Dummy Podcast 5', description: 'Dummy podcast', host: 'Nick' },
    { title: 'Dummy Podcast 6', description: 'Dummy podcast', host: 'Nick' },
    { title: 'Dummy Podcast 7', description: 'Dummy podcast', host: 'Nick' },
    { title: 'Dummy Podcast 8', description: 'Dummy podcast', host: 'Nick' },
    { title: 'Dummy Podcast 9', description: 'Dummy podcast', host: 'Nick' },
    { title: 'Dummy Podcast 10', description: 'Dummy podcast', host: 'Nick' }
]

const dummyDiscussions = [
    { title: 'Ex-Amazon workers, share you experiences!', description: 'Discussion on prior experiences of amazon warehouse workers', host: 'Beja' },
    { title: 'Crunch time in the game-dev industry?', description: 'Discussion on what can be done about crunch time in the game development industry', host: 'Beja' },
]

const symposiums = [
    { category: 'Podcasts', data: dummyPodcasts },
    { category: 'Discussions', data: dummyDiscussions },
]



export default function Archive({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [currentData, setData] = useState("")

    const Separator = () => {
        return <View style={styles.separator} />;
    };

    const renderHeader = (header) => {
        return (
            <View>
                <Separator/>
                <Text style={styles.sectionHeader}>{header}</Text>
                <Separator />
            </View>
        )
    }

    const SymposiumList = () => {
        return symposiums.map((sym, i) => {
            return (
                <FlatList
                    key={i}
                    style={{ width: '94%' }}
                    data={sym.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { setPressed(!pressed); setModalVisible(!modalVisible); setData(item) }}>
                            <Card data={item} />
                        </TouchableOpacity>)}
                    ItemSeparatorComponent={<Separator />}
                    ListHeaderComponent={renderHeader(sym.category)}
                />
            )
        })
    }


    return (
        <View style={styles.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>

                <View style={styles.modalView}>
                    <View style={styles.container}>
                        <Text style={styles.modalTitle}>{currentData.title}</Text>
                        <Text>{currentData.description}</Text>
                    </View>

                    <View>
                        <Button style={styles.button} title="Back" color="purple"
                            onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>
            </Modal>

            <HStack>
                <Text style={styles.title}>Archive</Text>
            </HStack>

            <SymposiumList />


            <HStack>
                <Button style={[styles.button]} title="Go back" color="purple"
                    onPress={() => {
                        navigation.dispatch(StackActions.pop(1));
                    }} />
            </HStack>

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
    modalView: {
        flex: 1,
        paddingTop: '60%',
        height: '40%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    separator: {
        height: 10,
        width: '100%',
    },

});