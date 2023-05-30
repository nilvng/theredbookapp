import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MessageBubble from './MessageBb';
import { Avatar } from 'react-native-paper';
const Message = ({ content, isMyMessage, userName }) => {
  const styles = StyleSheet.create({
    messageContainer: {
      flexDirection: isMyMessage ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginVertical: 5,
      alignSelf: isMyMessage ? 'flex-end' : 'flex-start'
    },
  });

  return (
    <View style={styles.messageContainer}>
      {userName != null && <Avatar.Text size={40} label={userName[0].toUpperCase()} style={{ backgroundColor: isMyMessage ? "red" : "purple" }} />}
      {userName == null && <Avatar.Text size={40} label="XD" color={isMyMessage ? "red" : "purple"} />}
      <MessageBubble isMyMessage={isMyMessage}>
        <Text style={{ color: '#000' }}>{content}</Text>
      </MessageBubble>
    </View>
  );
};

export default Message;
