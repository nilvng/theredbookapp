import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { TextInput, IconButton, HStack } from "@react-native-material/core";
import DateTimePicker from '@react-native-community/datetimepicker';
import { v1 } from 'uuid';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, Button } from 'react-native-paper';
import { insert } from '../Models/symposium-db';
import { topicList } from '../../helpers/formatSelection';
import { addSymposium } from '../Models/firestore-helper';
import AvatarName from '../../components/AvatarName';

const CreateModal = ({ navigation, space }) => {
    const [selectedSpeakers, setSelectedSpeaker] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [subject, setSubject] = useState("");
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time] = useState(new Date(Date.now()));
    const [timePicker, setTimePicker] = useState(false);

    function showDatePicker() {
        setDatePicker(true);
    };

    function showTimePicker() {
        setTimePicker(true);
    };

    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
    };

    function onTimeSelected(event, value) {
        date.setTime(value);
        setTimePicker(false);
    };

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
            sid: v1().toString(),
            title: subject,
            topic: selectedTopics.toString(),
            host: selectedSpeakers.toString(),
            startDate: date.toString(),
        }
        if (subject != "" && selectedSpeakers.length > 0) {
            await insert(item)
            await addSymposium(item)
            routeBack()
        } else {
            Alert.alert("Please fill the subject line and select at least one speaker")
        }
    }
    const routeBack = () => {
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: '#000000AA' }}
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

                    <HStack justify='end'>

                        {(Platform.OS === 'ios' || timePicker) && (
                            <View style={styles.schedulePicker}>
                                <DateTimePicker
                                    value={time}
                                    mode={'time'}
                                    is24Hour={false}
                                    onChange={onTimeSelected}
                                />
                            </View>
                        )}

                        {(Platform.OS === 'ios' || datePicker) && (
                            <View style={styles.schedulePicker}>
                                <DateTimePicker
                                    value={date}
                                    mode={'date'}
                                    is24Hour={true}
                                    onChange={onDateSelected}
                                />
                            </View>
                        )}

                        {Platform.OS !== 'ios' && !timePicker && (
                            <View style={{ margin: 10 }}>
                                <Button onPress={showTimePicker}>Select Time</Button>
                            </View>
                        )}

                        {Platform.OS !== 'ios' && !datePicker && (
                            <View style={{ margin: 10 }}>
                                <Button onPress={showDatePicker}>Select Date</Button>
                            </View>
                        )}

                    </HStack>

                    <Text> Scheduled at: {date ? date.toString() : ''}</Text>

                    <Text variant="titleMedium">Speakers</Text>
                    <View style={{ width: "100%" }} >
                        <FlatList horizontal={true}
                            data={space.speakers}
                            keyExtractor={item => item.id}
                            extraData={selectedSpeakers}
                            renderItem={({ index, item }) => (
                                <TouchableOpacity
                                    onPress={() => handleOnPressSpeaker(index)}
                                >
                                    <AvatarName
                                        key={index}
                                        name={item.name}
                                        image={item.avatar.uri}
                                        style={{ borderWidth: selectedSpeakers.includes(index) ? 2 : 0 }}
                                        isSelected={selectedSpeakers.includes(index)}
                                    />
                                </TouchableOpacity>
                            )} />
                    </View >
                </ScrollView >
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
        </KeyboardAvoidingView >
    );
};

const styles = StyleSheet.create({
    modalView: {
        height: '70%',
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
    },
    schedulePicker: {
        marginVertical: 5,
    },
});

export default CreateModal;