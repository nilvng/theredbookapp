/**
 * The function creates a message bubble component with specific styles for the left or right side of
 * the screen depending on the value of the isMyMessage prop.
 * @returns The `MessageBubble` component is being returned, which is a `View` component with specific
 * styles based on the `isMyMessage` prop. The `children` prop is also passed as a child of the `View`
 * component.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * The function creates a message bubble component with specific styles for the left side of the
 * screen.
 */
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
