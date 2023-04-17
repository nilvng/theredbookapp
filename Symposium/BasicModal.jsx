import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Flex, Stack, TextInput, IconButton } from "@react-native-material/core";
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
                // presentationStyle='pageSheet' // iOS only
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <TouchableOpacity
                    style={styles.modalContainer}
                    onPress={() => setModalVisible(false)}
                    onPressOut={() => setModalVisible(false)}
                    activeOpacity={1}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Have your say!</Text>
                        <Stack fill spacing={8} style={{ width: "100%", marginTop: 16 }}>
                            <TextInput
                                style={{ width: "100%" }}
                                variant='outlined'
                                label='Enter your subject line'
                                keyboardType='default'
                            />
                        </Stack>
                    <Flex style={{ width: "100%", position: 'absolute', bottom: 0, marginBottom: 16 }}
                        direction='row' justify='evenly' fill wrap="nowrap" spacing={18}>
                        <Button
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                            variant='text'
                            title="Submit"
                            tintColor='white'
                        />
                        <IconButton
                            onPress={() => setModalVisible(!modalVisible)}
                            icon={props => <Icon name='clock' {...props} />}
                        />
                    </Flex>
                    </View>
                </TouchableOpacity>
            </Modal >

            <Button
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
                variant='text'
                title="Open Modal"
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
    },
    buttonOpen: {
        backgroundColor: '#FFF4F1',
        width: '50%',
    },
    buttonClose: {
        backgroundColor: '#BD827D',
        padding: 8,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        fontFamily: 'Roboto',
        textAlign: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginVertical: 12,
        fontFamily: 'Roboto',
        textAlign: 'center',
    },
});

export default BasicModal;