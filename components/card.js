import { HStack } from '@react-native-material/core';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { getSpeakers, getTopicsNameString } from '../helpers/formatSelection';
import * as Notifications from 'expo-notifications';

// Local notification settings
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


// Card component which is passed the current symposium from archive
export default function Card({ navigation, data }) {
    // State for notification
    const [notificationScheduled, setNotificationScheduled] = useState(false);

    // Request notification permissions on component mount
    useEffect(() => {
        requestNotificationPermission();
    }, []);

    // Request notification permissions
    // Checks if the permissions are granted
    const requestNotificationPermission = async () => {
        const settings = await Notifications.getPermissionsAsync();
        if (settings.granted) {
            return;
        }

        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        console.log('Notification permissions granted');
    };

    // Schedule the notification
    const scheduleNotification = async () => {
        // Set the title of the notification
        const title = data.title;
        // Set the date of the notification
        const notiDate = new Date(data.startDate);

        await Notifications.scheduleNotificationAsync({
            // What the notification will contain
            content: {
                title: 'Redbook - Symposium',
                body: `${title} is starting!`,
            },
            // What causes the notification to send
            trigger: {
                date: notiDate,
            },
        });

        // Sets the notification as scheduled once it has been created
        setNotificationScheduled(true);
    };

    // Handles the set reminder button
    const handleSetReminder = async () => {
        await requestNotificationPermission();
        await scheduleNotification();
        console.log("Reminder set");
    };

    // Text stack view to display all the speakers and date of the symposium
    const TextStackView = (speakers) => (
        <View style={styles.textStack}>
            {speakers != null && speakers.length > 0 ? <Text style={styles.text}>{speakers[0].name} hosted</Text> : null}
            {data.startDate != null ? <Text style={styles.text}>{data.startDate}</Text> : null}
        </View>
    )

    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}> {data.title}</Text>
                    <Text style={styles.footerText}> {getTopicsNameString(data.topic)}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <HStack>
                        {TextStackView(getSpeakers(data.host))}
                        {/* Checks if the symposium's date has passed or is upcoming
                            If the symposium has yet to start, then a button to remind the user is displayed
                            Otherwise, a button to join the symposium is displayed */}
                        {Date.parse(data.startDate) < Date.now() ? <Button
                            onPress={() => { navigation.navigate("Live", { symposium: data }); }}
                        >Join</Button> : <Button onPress={handleSetReminder}>Remind</Button>}
                    </HStack >
                </View >

            </View >
        </View >
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