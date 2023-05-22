import React, { useState } from 'react';
import { Modal, StyleSheet, View, KeyboardAvoidingView, Keyboard, FlatList, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Stack, TextInput, IconButton, HStack } from "@react-native-material/core";
import { Button as Rbutton } from "@react-native-material/core";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Card, Text, Button } from 'react-native-paper';
import { insert } from '../Models/symposium-db';

export const topicList = ["Entertainment", "Politics", "IT", "Business"]

const CreateModal = ({ navigation, space }) => {
    const [selectedSpeakers, setSelectedSpeaker] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [subject, setSubject] = useState("");

    const handleOnPressSpeaker = (index) => {
        var updated = [...selectedSpeakers];
        if (selectedSpeakers.includes(index)) {
            updated = selectedSpeakers.filter((item) => item !== index) // unselect one already seletected
        } else {
            updated.push(index)
        }
        setSelectedSpeaker(updated)
    }
    const handleOnPressTopic = (index) => {
        var updated = [...selectedTopics];
        if (selectedTopics.includes(index)) {
            updated = selectedTopics.filter((item) => item !== index)
        } else {
            updated.push(index)
        }
        setSelectedTopics(updated)
    }
    const handleOnPressSubmit = async () => {
        const item = {
            title: subject,
            topic: selectedTopics.toString(),
            host: selectedSpeakers.toString(),
            startDate: Date().toString(),
        }
        if (subject != "") {
            await insert(item)
        }
        routeBack()
    }
    const routeBack = () => {
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <View style={styles.modalView}>
                <HStack style={{ width: "100%", alignSelf: "baseline" }} direction='row' items='center' justify='between'>
                    <IconButton
                        icon={props => <Icon name='close' {...props} />}
                        onPress={() => routeBack()} />
                    <Text style={styles.modalTitle}>Have your say!</Text>
                    <IconButton
                        onPress={() => { }} />
                </HStack>
                <ScrollView style={{ flex: 1 }}>
                    <TextInput
                        style={{ width: "100%", marginTop: 4 }}
                        variant='outlined'
                        label='Enter your subject...'
                        onChangeText={text => setSubject(text)}
                        value={subject}
                    />
                    <Text variant="titleMedium">Topics</Text>
                    <FlatList horizontal={true}
                        data={topicList}
                        style={{ flexGrow: 0 }}
                        keyExtractor={(index) => index}
                        renderItem={({ index, item }) => (
                            <Button
                                style={{ marginHorizontal: 2 }}
                                key={index}
                                mode='contained-tonal'
                                buttonColor={selectedTopics.includes(index) ? '#c0a3e6' : '#e1d8ed'}
                                onPress={() => handleOnPressTopic(index)}
                                onStartShouldSetResponder={() => true}>
                                {item}
                            </Button>
                        )} />
                    <Text variant="titleMedium">Speakers</Text>
                    <View style={{ width: "100%" }} >
                        <FlatList horizontal={true}
                            data={space.speakers}
                            keyExtractor={item => item.id}
                            extraData={selectedSpeakers}
                            renderItem={({ index, item }) => (
                                <Card
                                    key={index}
                                    mode={'contained'}
                                    style={{ marginHorizontal: 4 }}
                                    contentStyle={{ backgroundColor: selectedSpeakers.includes(index) ? '#c0a3e6' : '#e1d8ed' }}
                                    onPress={() => handleOnPressSpeaker(index)}>
                                    <Card.Cover
                                        source={item.avatar}
                                        resizeMode={`contain`}
                                        style={{ height: 50 }} />
                                    <Card.Content>
                                        <Text>{item.name}</Text>
                                    </Card.Content>
                                </Card>
                            )} />
                    </View>
                </ScrollView>
            </View>
            <HStack style={styles.buttonContainer}
                direction='row' justify='around' fill wrap="nowrap" spacing={8}>
                <Button
                    style={styles.buttonClose}
                    onPress={() => handleOnPressSubmit()}
                    mode='contained'
                >Submit</Button>
                <IconButton
                    onPress={() => routeBack()}
                    icon={props => <Icon name='clock' {...props} />}
                />
            </HStack>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    modalView: {
        height: '50%',
        marginTop: 'auto',
        backgroundColor: '#FFF4F1',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        overflow: 'hidden',
        alignContent: 'flex-end',
    },
    button: {
        width: '100%',
        padding: 4
    },
    buttonOpen: {
        backgroundColor: '#FFF4F1',
        width: '50%',
    },
    buttonClose: {
        flexGrow: 1,
        paddingVertical: 4,
        flex: 2

    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTitle: {
        fontSize: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        width: "100%", position: 'absolute', bottom: 0, paddingHorizontal: 12,
        backgroundColor: '#FFF4F1', elevation: 5, shadowOffset: { width: 0, height: -4 },
        paddingVertical: 10, shadowRadius: 4, shadowOpacity: 0.1
    }
});

export default CreateModal;