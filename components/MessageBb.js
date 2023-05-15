import React from 'react';
import { View, StyleSheet } from 'react-native';

const MessageBubble = ({ children, isMyMessage }) => {
  const styles = StyleSheet.create({
    containerLeft: {
      maxWidth: '80%',
      borderRadius: 12,
      backgroundColor: '#F3EED9',
      padding: 10,
      marginLeft: 8,
      marginTop: 4,
      marginBottom: 4,
    },
  });

  const containerStyle = isMyMessage ? styles.containerRight : styles.containerLeft;

  return <View style={containerStyle}>{children}</View>;
};

export default MessageBubble;
