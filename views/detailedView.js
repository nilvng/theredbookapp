import React, { useState } from "react";
import { Button, StatusBar, StyleSheet, Text, View, Modal } from "react-native";

function DetailedModal({ symposium }) {

  return (
    <View style={styles.modalView}>
      <View style={styles.center}>
        <View style={styles.barIcon} />
        <Text style={styles.title}>{symposium.title}</Text>
        <Text style={styles.head1}>Topics:</Text>
        <Text style={styles.text}>{symposium.topic}</Text>
        <Text style={styles.head1}>Hosts:</Text>
        <Text style={styles.text}>{symposium.host}</Text>
        <Text style={styles.head1}>Scheduled:</Text>
        <Text style={styles.text}> {symposium.startDate} </Text>

        <Button title="Join" />
      </View>
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
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
});