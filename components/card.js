import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Card(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}> {props.data.title}</Text>
                </View>
                <View style={styles.cardHostContainer}>
                    <Text style={styles.cardHost}> {props.data.host}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF4F1',
        height: 200,
    },
    cardContent: {
        flex: 1,
    },
        cardTitleContainer: {
        flexGrow: 1,
    },
    cardTitle: {
        fontSize: 15,
        paddingLeft: 10,
        alignSelf: 'baseline',
    },
    cardHostContainer: {
        height: '30%',
        borderRadius: 10,
        backgroundColor: '#F3EED9',
    },
    cardHost: {
        paddingHorizontal: 10,

    },
});