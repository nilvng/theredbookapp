import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
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
      {!isMyMessage && userName != null && <Avatar.Text size={40} label={userName} />}
      {userName == null && <Avatar.Text size={40} label="XD" />}
      <MessageBubble isMyMessage={isMyMessage}>
        <Text style={{ color: isMyMessage ? '#fff' : '#000' }}>{content}</Text>
      </MessageBubble>
    </View>
  );
};

export default Message;
