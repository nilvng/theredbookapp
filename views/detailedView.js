import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HStack, Button } from "@react-native-material/core";
import { IconButton } from "react-native-paper";
import AvatarName from "../components/AvatarName";

function DetailedModal({ symposium, backButtonPressed, navigation }) {

  const handleChatPressed = () => {
    backButtonPressed(false);
    navigation.navigate("Chat");
  }

  return (
    <View style={styles.modalView}>
      <IconButton
        style={{ alignSelf: "flex-end", marginTop: 12, marginRight: 12 }}
        icon="close"
        color="#1E1E1E"
        size={24}
        onPress={() => backButtonPressed(false)} />
      <View style={styles.center}>
        <Text style={styles.title}>{symposium.title}</Text>
        <Text style={styles.subtitle}>Business - IT - AI</Text>
      </View>
      <View style={{ marginHorizontal: 12 }}>
        <Text style={styles.head1}>Speaker</Text>
        <HStack>
          <AvatarName name={symposium.host} />
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
    backgroundColor: "#F3EED9",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    color: '#FFF4F1',
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
    marginTop: 10,
  },
  head1: {
    color: "#1E1E1E",
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  subtitle: {
    color: "#1E1E1E",
    fontSize: 16,
    marginTop: 10,
  },
  text: {
    color: "#1E1E1E",
    fontSize: 24,
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%", position: 'absolute', bottom: 0, paddingHorizontal: 12,
    paddingVertical: 10,
  }
});