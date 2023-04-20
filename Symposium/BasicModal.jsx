import React, { useState } from 'react';
import { Modal, StyleSheet, View, KeyboardAvoidingView, Keyboard, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Flex, Stack, TextInput, IconButton, HStack } from "@react-native-material/core";
import { Button as Rbutton } from "@react-native-material/core";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Card, Text, Button } from 'react-native-paper';
const BasicModal = (props) => {
    const topicList = ["Entertainment", "Politics", "IT", "Business"]
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View
                    style={styles.modalContainer}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalTitle}>Have your say!</Text>
                                <Stack fill spacing={8} style={{ width: "100%", marginTop: 16 }}>
                                    <TextInput
                                        style={{ width: "100%" }}
                                        variant='outlined'
                                        label='Enter your subject...'
                                        keyboardType='default'
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
                                                onStartShouldSetResponder={() => true}>
                                                {item}
                                            </Button>
                                        )} />
                                    <Text variant="titleMedium">Speakers</Text>
                                    <View style={{ width: "100%" }} >
                                        <FlatList horizontal={true}
                                            data={props.space.speakers}
                                            keyExtractor={item => item.id}
                                            renderItem={({ index, item }) => (
                                                <Card
                                                    key={index}
                                                    mode='contained'
                                                    style={{ marginHorizontal: 4 }}
                                                    onStartShouldSetResponder={() => true}>
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
                                </Stack>
                            </View>
                        </TouchableWithoutFeedback>
                        <HStack style={{
                            width: "100%", position: 'absolute', bottom: 0, paddingHorizontal: 4,
                            backgroundColor: '#FFF4F1', elevation: 5, shadowOffset: { width: 0, height: -4 },
                            paddingVertical: 10, shadowRadius: 4, shadowOpacity: 0.1
                        }}
                            direction='row' justify='around' fill wrap="nowrap" spacing={18}>
                            <Button
                                style={{ flexGrow: 1 }}
                                onPress={() => setModalVisible(!modalVisible)}
                                mode='contained'
                                dark={true}
                            >Submit
                            </Button>
                            <IconButton
                                onPress={() => setModalVisible(!modalVisible)}
                                icon={props => <Icon name='clock' {...props} />}
                            />
                        </HStack>
                    </KeyboardAvoidingView>
                </View>
            </Modal >

            <Rbutton
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(!modalVisible)}
                variant='text'
                title="Host symposium"
            />
        </View >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
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
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginVertical: 12,
        textAlign: 'center',
    },
});

export default BasicModal;