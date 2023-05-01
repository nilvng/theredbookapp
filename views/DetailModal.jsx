import React, { useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { HStack, Button } from "@react-native-material/core";
import { IconButton } from "react-native-paper";
import AvatarName from "../components/AvatarName";
import { getSpeakers, getTopicsNameString } from "../helpers/formatSelection";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function DetailedModal({ route, navigation }) {
  const { symposium } = route.params;

  const handleChatPressed = () => {
    navigation.navigate("Chat");
  }

  const routeBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    // Subscribe to incoming notifications
    const subscription = Notifications.addNotificationReceivedListener(handleNotification);

    return () => {
      // Clean up the subscription when the component unmounts
      subscription.remove();
    };
  }, []);

  const handleNotification = (notification) => {
    // Handle the notification here
    Alert.alert('Notification', notification.request.content.body);
  };

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Symposium Starting',
        body: `${symposium.title} is starting!`,
      },
      trigger: { date: new Date(symposium.date) }, // Schedule the notification at the specified date and time
    });
  };


  return (
    <View style={styles.modalView}>
      <IconButton
        style={{ alignSelf: "flex-end", marginTop: 12, marginRight: 12 }}
        icon="close"
        color="#1E1E1E"
        size={24}
        onPress={routeBack} />
      <View style={styles.center}>
        <Text style={styles.title}>{symposium.title}</Text>
        <Text style={styles.subtitle}>{getTopicsNameString(symposium.topic)}</Text>
        <Button title="Remind me" onPress={scheduleNotification} ></Button>
      </View>
      <View style={{ marginHorizontal: 12 }}>
        <Text style={styles.head1}>Speaker</Text>
        <HStack>
          {
            getSpeakers(symposium.host).map((speaker) => (
              <AvatarName key={speaker.id} name={speaker.name} />
            ))
          }
        </HStack>
      </View>

      <HStack
        style={styles.buttonContainer} fill wrap="nowrap" spacing={8}>
        <Button style={{
          flexGrow: 1,
          justifyContent: 'center',
        }} title="Join" color="purple" />
        <IconButton icon="chat" color="#1E1E1E" size={24} onPress={handleChatPressed} />
      </HStack>
    </View >

  )
};

export default DetailedModal;

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    backgroundColor: "white",
  },
  modalView: {
    height: '50%',
    marginTop: 'auto',
    backgroundColor: '#FFF4F1',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.85,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    alignContent: 'flex-end',
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },
  title: {
    color: "#1E1E1E",
    fontWeight: 'bold',
    fontSize: 25,
  },
  head1: {
    color: "#1E1E1E",
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
  subtitle: {
    color: "#1E1E1E",
    fontSize: 16,
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%", position: 'absolute', bottom: 0, paddingHorizontal: 12,
    paddingVertical: 10,
  }
});