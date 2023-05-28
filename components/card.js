import { HStack } from '@react-native-material/core';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { getSpeakersNameString, getTopicsNameString } from '../helpers/formatSelection';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Card({ data }) {
    const [notificationScheduled, setNotificationScheduled] = useState(false);

    const requestNotificationPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            console.log('Notification permissions not granted');
            return;
        }
        console.log('Notification permissions granted');
    };

    const scheduleNotification = async () => {
        const title = data.title;
        const notiDate = new Date(data.startDate);

        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Redbook - Symposium',
                body: `${title} is starting!`,
            },
            trigger: {
                date: notiDate,
            },
        });

        setNotificationScheduled(true);
    };

    const handleSetReminder = () => {
        requestNotificationPermission();
        console.log("Reminder set")
        scheduleNotification();
    };



    const TextStackView = <View style={styles.textStack}>
        <Text style={styles.hostText}> {getSpeakersNameString(data.host)} hosted</Text>
        {data.startDate != null ? <Text style={styles.text}>{data.startDate}</Text> : null}
    </View>;
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}> {data.title}</Text>
                    <Text style={styles.footerText}> {getTopicsNameString(data.topic)}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <HStack>
                        {TextStackView}
                        {Date.parse(data.startDate) < Date.now() ? <Button>Join</Button> : <Button onPress={handleSetReminder}>Remind</Button>}
                    </HStack>
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
    footerText: {
        fontSize: 14,
        color: '#2e2e2d',

    },
    cardTitleContainer: {
        padding: 10,
        flexGrow: 1,
    },
    cardTitle: {
        fontSize: 24,
        alignSelf: 'baseline',
    },
    detailContainer: {
        borderRadius: 10,
        backgroundColor: '#F3EED9',
    },
    text: {
        fontSize: 14,
    },
    hostText: {
        fontSize: 14,
    },
    textStack: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
    },
});