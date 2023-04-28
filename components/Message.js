import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = ({ content, isMyMessage }) => {
  const containerStyle = [
    styles.container,
    isMyMessage ? styles.myMessage : styles.otherMessage,
  ];

  const textStyle = [styles.text, isMyMessage ? styles.myText : styles.otherText];

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    maxWidth: '80%',
  },
  text: {
    fontSize: 16,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    color: '#fff',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
    color: '#000',
  },
  myText: {
    color: '#fff',
  },
  otherText: {
    color: '#000',
  },
});

export default Message;
