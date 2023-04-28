import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Message from '../components/Message';

const messages = [
  { id: 1, content: 'Hi', upvote: 3, downvote: 4 },
  { id: 2, content: 'Hello', upvote: 2, downvote: 1 },
  { id: 3, content: 'How are you?', upvote: 5, downvote: 0 },
];

const Chat = () => {
  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={styles.message}>
        <Message content={item.content} />
      </View>
      <View style={styles.voteContainer}>
        <Text style={styles.voteText}>↑ {item.upvote}</Text>
        <Text style={styles.voteText}>↓ {item.downvote}</Text>
      </View>
    </View>
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
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  message: {
    width: '70%',
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '10%',
  },
  voteText: {
    fontSize: 14,
    color: '#999',
    marginHorizontal: 5,
  },
});

export default Chat;
