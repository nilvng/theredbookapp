import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MessageBubble from './MessageBb';
import { Avatar } from 'react-native-paper';
import VoteView from './VoteView';
import { VStack } from '@react-native-material/core';
const Message = ({ item, isMyMessage, onVote }) => {
  const { content, userName } = item;
  const styles = StyleSheet.create({
    bubbleContainer: {
      flexDirection: isMyMessage ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginVertical: 5
    },
  });

  return (
    <VStack style={{ alignSelf: isMyMessage ? "flex-end" : "flex-start" }}>
      <View style={styles.bubbleContainer}>
        {userName != null && <Avatar.Text size={40} label={userName[0].toUpperCase()} style={{ backgroundColor: isMyMessage ? "red" : "purple" }} />}
        {userName == null && <Avatar.Text size={40} label="XD" />}
        <MessageBubble isMyMessage={isMyMessage}>
          <Text style={{ color: '#000' }}>{content}</Text>
        </MessageBubble>
      </View>
      <VoteView item={item} onVote={onVote} />
    </VStack>
  );
};

export default Message;
