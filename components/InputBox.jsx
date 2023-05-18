import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

const InputBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.length > 0) {
      onSendMessage(message);
      setMessage('');
    }
  };

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'FAF7E2',
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#FAF7E2',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#F3EED9',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#F3EED9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InputBox;
