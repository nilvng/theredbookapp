/**
 * `InputBox` is a React Native component with a text input and a send button. It returns a `View` containing 
 * `TextInput` for message input and `TouchableOpacity` for sending. On button press, `sendMessage` is invoked, 
 * checking message emptiness and then calling `onSendMessage`.
 */

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

/**
 * `InputBox` is a functional component with a prop `onSendMessage`. It uses `useState` to manage a `message` state, initially empty.
 */

const InputBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  /**
   * The function sends a message and resets the message input field if the message length is greater
   * than 0.
   */
  const sendMessage = () => {
    if (message.length > 0) {
      onSendMessage(message);
      setMessage('');
    }
  };

  /**
 * The function returns a `View` with `TextInput` for message input and `TouchableOpacity` for sending.
 * On button press, it calls `sendMessage` to check for non-empty messages and then invokes `onSendMessage`.
 * The component's styles are defined in the `styles` object.
 */

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * `const styles` defines the styles for `View`, `TextInput`, and `TouchableOpacity` within `InputBox`. 
 * Created using `StyleSheet.create()`, it provides styling for the corresponding components in the render function.
 */

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7E2',
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#aaa',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#0084ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InputBox;
