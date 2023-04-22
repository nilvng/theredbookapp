import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChatBox from './chatBox';

export default function App() {
  return (
    <View style={styles.container}>
      <ChatBox />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
