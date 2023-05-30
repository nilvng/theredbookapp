import React from 'react';
import { View, StyleSheet } from 'react-native';

const MessageBubble = ({ children, isMyMessage }) => {
  const styles = StyleSheet.create({
    containerLeft: {
      maxWidth: '80%',
      borderRadius: 12,
      backgroundColor: '#f1f0f0',
      padding: 10,
      marginLeft: 8,
      marginTop: 4,
      marginBottom: 4,
    },
  });

  const containerStyle = styles.containerLeft;

  return <View style={containerStyle}>{children}</View>;
};

export default MessageBubble;
