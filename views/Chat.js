import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Message from '../components/Message';
import InputBox from '../components/InputBox';

const initialMessages = [
  { id: 1, content: 'Hi', upvotes: 3, downvotes: 4 },
  { id: 2, content: 'Hello', upvotes: 2, downvotes: 1 },
  { id: 3, content: 'How are you?', upvotes: 5, downvotes: 0 },
  { id: 4, content: 'This is a test message', upvotes: 0, downvotes: 0 },
];

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [voteStatus, setVoteStatus] = useState({});

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={styles.message}>
        <Message content={item.content} />
      </View>
      <View style={styles.voteContainer}>
        <TouchableOpacity
          onPress={() => handleVote(item.id, 'upvote')}
          disabled={voteStatus[item.id] === 'upvote'}
        >
          <Text style={styles.voteText}>↑ {item.upvotes}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleVote(item.id, 'downvote')}
          disabled={voteStatus[item.id] === 'downvote'}
        >
          <Text style={styles.voteText}>↓ {item.downvotes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleSendMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      content,
      upvotes: 0,
      downvotes: 0,
    };
    setMessages([...messages, newMessage]);
  };

  const handleVote = (id, type) => {
    setVoteStatus({ ...voteStatus, [id]: type });

    const updatedMessages = messages.map((message) => {
      if (message.id === id) {
        let upvotes = message["upvotes"];
        let downvotes = message["downvotes"];

        if (type === "upvote" && voteStatus[id] !== "upvote") {
          upvotes += 1;
          if (downvotes > 0 && voteStatus[id] === "downvote") {
            downvotes -= 1;
          }
        } else if (type === "downvote" && voteStatus[id] !== "downvote") {
          downvotes += 1;
          if (upvotes > 0 && voteStatus[id] === "upvote") {
            upvotes -= 1;
          }
        }

        return { ...message, upvotes, downvotes };
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
    paddingTop:40,
    flex: 1,
    backgroundColor: '#BD827D',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
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
    color: '#0a0a0a',
    marginHorizontal: 5,
  },
});

export default Chat;
