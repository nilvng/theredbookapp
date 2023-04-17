import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Flex, Stack, TextInput, IconButton, Spacer } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const BasicModal = () => {
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
                                </Stack>
                                <Flex style={{ width: "100%", position: 'absolute', bottom: 0, marginBottom: 16 }}
                                    direction='row' justify='evenly' fill wrap="nowrap" spacing={18}>
                                    <Button
                                        style={[styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                        variant='text'
                                        title="Submit"
                                        color='black'
                                    />
                                    <IconButton
                                        onPress={() => setModalVisible(!modalVisible)}
                                        icon={props => <Icon name='clock' {...props} />}
                                    />
                                </Flex>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            </Modal >

            <Button
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
        backgroundColor: '#BD827D',
        padding: 8,
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