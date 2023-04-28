import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Message = ({ content, isMyMessage }) => {
  return (
    <View style={isMyMessage ? styles.myMessageContainer : styles.theirMessageContainer}>
      <Text style={isMyMessage ? styles.myMessageText : styles.theirMessageText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  myMessageContainer: {
    backgroundColor: '#0084ff',
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginTop: 4,
    marginBottom: 4,
    marginRight: 12,
    marginLeft: 80,
  },
  theirMessageContainer: {
    backgroundColor: '#f1f0f0',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginTop: 4,
    marginBottom: 4,
    marginRight: 80,
    marginLeft: 12,
  },
  myMessageText: {
    color: '#fff',
    fontSize: 16,
  },
  theirMessageText: {
    color: '#000',
    fontSize: 16,
  },
});

export default Message;
