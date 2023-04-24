import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Message from './Message';

const messages = [
  { id: 1, content: 'Hi', upvote: 3, downvote: 4 },
  { id: 2, content: 'Hello', upvote: 2, downvote: 1 },
  { id: 3, content: 'How are you?', upvote: 5, downvote: 0 },
];

const Chat = () => {
  const renderItem = ({ item }) => (
    <Message content={item.content} isMyMessage={item.isMyMessage} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Chat;
