import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HStack, Button } from "@react-native-material/core";
import { IconButton } from "react-native-paper";

function DetailedModal({ symposium, backButtonPressed }) {

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
        <Text style={styles.text}>{symposium.topic}</Text>
      </View>
      <Text style={styles.head1}>Speaker</Text>
      <Text style={styles.text}>{symposium.host}</Text>
      <HStack
        style={styles.buttonContainer} fill wrap="nowrap" spacing={8}>
        <Button style={{
          flexGrow: 1,
          justifyContent: 'center',
        }} title="Join" color="purple" />
        <IconButton icon="chat" color="#1E1E1E" size={24} />
      </HStack>
    </View>

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
    fontSize: 30,
    marginTop: 10,
  },
  head1: {
    color: "#1E1E1E",
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  text: {
    color: "#1E1E1E",
    fontSize: 24,
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%", position: 'absolute', bottom: 0, paddingHorizontal: 12,
    paddingVertical: 10, shadowRadius: 4, shadowOpacity: 0.1
  }
});