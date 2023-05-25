import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Message from '../Chat/Message';
import InputBox from '../Chat/InputBox';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import VoteView from '../Chat/VoteView';
import { StackActions } from '@react-navigation/native';
import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { addDoc, collection, onSnapshot } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAzu1mjzrOqKX-0MROl-kOicR6NhpttvZ8",
  authDomain: "redbookapp-412c2.firebaseapp.com",
  projectId: "redbookapp-412c2",
  storageBucket: "redbookapp-412c2.appspot.com",
  messagingSenderId: "13215877824",
  appId: "1:13215877824:web:7412a57acdc17b6b8c7b25",
  measurementId: "G-T76LCBQY4N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const initialMessages = [
  { id: 1, content: 'Hi', upvotes: 3, downvotes: 4 },
  { id: 2, content: 'Hello', upvotes: 2, downvotes: 1 },
  { id: 3, content: 'How are you?', upvotes: 5, downvotes: 0 },
  { id: 4, content: 'This is a test message', upvotes: 0, downvotes: 0 },
];

const Chat = ({ title, navigation }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [voteStatus, setVoteStatus] = useState({});

  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
      const firebaseMessages = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMessages(firebaseMessages);
    });
  
    // Clean up function
    return () => {
      unsubscribe();
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={styles.message}>
        <Message content={item.content} />
        <VoteView item={item} onVote={handleVote} voteStatus={voteStatus} />
      </View>
    </View>
  );

  const handleSendMessage = async (content) => {
    const newMessage = {
      id: messages.length + 1,
      content,
      upvotes: 0,
      downvotes: 0,
    };

    try {
      await addDoc(collection(db, 'messages'), newMessage);
    } catch (error) {
      console.error("Error writing new message to Firestore", error);
      return; // exit the function early if there's an error
    }

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

  const handleGoBack = () => {
    navigation.dispatch(StackActions.pop(1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.button}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}> Symposium (title) </Text>
      </View>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#AFEEEE',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    marginTop: 10
  },

  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    marginLeft: 15
  },

  messageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 15

  },
  message: {
    width: '100%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#F3EED9',
    borderRadius: 5,
    padding: 5,
    margin: 10,
    width: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default Chat;