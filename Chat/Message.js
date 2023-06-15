/**
 * The Message function is a React component that renders a message bubble with an avatar and a vote
 * view.
 * @returns The `Message` component is being returned.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MessageBubble from './MessageBb';
import { Avatar } from 'react-native-paper';
import VoteView from './VoteView';
import { VStack } from '@react-native-material/core';

/**
 * This is a React Native component that renders a message bubble with content and username, and can be
 * styled based on whether it is the user's own message or not.
 */
const Message = ({ item, isMyMessage, onVote }) => {
  const { content, userName } = item;
  const styles = StyleSheet.create({
    bubbleContainer: {
      flexDirection: isMyMessage ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginVertical: 5
    },
  });

/**
 * Returns JSX rendering a `VStack` with two children: `View` (containing `Avatar` and `MessageBubble`) and `VoteView`.
 * Message alignment is based on `style` prop in `VStack`, depending on whether it's the user's message or not.
 */

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