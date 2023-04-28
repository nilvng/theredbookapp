import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Message from '../components/Message';
import InputBox from '../components/InputBox';

const initialMessages = [
  { id: 1, content: 'Hi', upvote: 3, downvote: 4 },
  { id: 2, content: 'Hello', upvote: 2, downvote: 1 },
  { id: 3, content: 'How are you?', upvote: 5, downvote: 0 },
  { id: 4, content: 'This is a test message', upvote: 0, downvote: 0 },
];

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);

  const [pressedButtons, setPressedButtons] = useState({});

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={styles.message}>
        <Message content={item.content} />
      </View>
      <View style={styles.voteContainer}>
        <TouchableOpacity
          onPress={() => handleVote(item.id, 'upvote')}
          disabled={pressedButtons[item.id] === 'upvote'}
        >
          <Text style={styles.voteText}>↑ {item.upvote}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleVote(item.id, 'downvote')}
          disabled={pressedButtons[item.id] === 'downvote'}
        >
          <Text style={styles.voteText}>↓ {item.downvote}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleSendMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      content,
      upvote: 0,
      downvote: 0,
    };
    setMessages([...messages, newMessage]);
  };

  const handleVote = (id, type) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === id) {
        let count = message[type];
        if (count > 0) {
          count = message[type] === 1 ? 0 : message[type] + 1;
        } else {
          count = message[type] === -1 ? 0 : message[type] + 1;
        }
        return { ...message, [type]: count };
      }
      return message;
    });
    setMessages(updatedMessages);
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <InputBox onSendMessage={handleSendMessage} />
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
    justifyContent: 'flex-start',
  },
  message: {
    width: '70%',
    alignSelf: 'center',
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '17%',
  },
  voteText: {
    fontSize: 15,
    color: '#999',
    marginHorizontal: 5,
  },
});

export default Chat;
