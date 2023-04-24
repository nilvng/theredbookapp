import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Message from './Message';

const Chat = ({ messages }) => {
  const renderItem = ({ item }) => (
    <Message content={item.content} isMyMessage={item.isMyMessage} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Chat;
