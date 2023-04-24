import React from 'react';
import { StyleSheet, View } from 'react-native';
import Chat from './views/Chat';

export default function App() {
  return (
    <View style={styles.container}>
      <Chat />
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
