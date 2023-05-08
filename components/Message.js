import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import MessageBubble from './MessageBb';

const Message = ({ content, isMyMessage }) => {
  const styles = StyleSheet.create({
    iconContainer: {
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    messageContainer: {
      flexDirection: isMyMessage ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginVertical: 5,
      alignSelf: isMyMessage ? 'flex-end' : 'flex-start'
    },
  });

  return (
    <View style={styles.messageContainer}>
      <View style={[styles.iconContainer, { backgroundColor: isMyMessage ? '#0084ff' : '#eee' }]}>
        <MaterialCommunityIcons name="account" size={24} color={isMyMessage ? '#fff' : '#000'} />
      </View>
      <MessageBubble isMyMessage={isMyMessage}>
        <Text style={{ color: isMyMessage ? '#fff' : '#000' }}>{content}</Text>
      </MessageBubble>
    </View>
  );
};

export default Message;
