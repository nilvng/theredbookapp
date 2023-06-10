import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Button, HStack } from "@react-native-material/core";
import { StackActions } from '@react-navigation/native';
import Card from '../components/card';
import { getSymposiums } from '../Symposium/Models/firestore-helper';
import { SafeAreaView } from 'react-navigation';

export default function Archive({ navigation }) {
    const [currentSymposiums, setSymposiums] = useState();

    const loadData = useCallback(async () => {
        try {
            getSymposiums().then((data) => {
                setSymposiums(data);
            })
        } catch (error) {
            console.log("Archive error:" + error);
        }
    }, []);

    const onItemPress = (item) => {
        navigation.navigate("Detail", { symposium: item });
    }

    useEffect(() => {
        loadData();
    }, [loadData]);

    const Separator = () => {
        return <View style={styles.separator} />;
    };

    const SymposiumList = () => {
        return (
            <FlatList
                style={{ width: '94%' }}
                data={currentSymposiums}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { onItemPress(item) }}>
                        <Card data={item} navigation={navigation} />
                    </TouchableOpacity>)}
                ItemSeparatorComponent={<Separator />}
            />
        )
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
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
        </SafeAreaView>
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
    modalContainer: {
        flex: 1,
        backgroundColor: '#F3EED9',
        color: '#FFFFFF',
        alignItems: 'center',
        paddingVertical: 25,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    modalView: {
        flex: 1,
        paddingTop: '70%',
        height: '30%',
        color: '#FFF4F1',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    modalButton: {
        color: 'black',
        backgroundColor: 'white',
    },
    separator: {
        height: 10,
        width: '100%',
    },

});