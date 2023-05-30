import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Message from '../Chat/Message';
import InputBox from '../Chat/InputBox';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import VoteView from '../Chat/VoteView';
import { StackActions } from '@react-navigation/native';
import { db } from '../firebase.config';
import { addDoc, collection, onSnapshot, query, where, doc, updateDoc, orderBy } from '@firebase/firestore';


const Chat = ({ route, navigation }) => {
  const { sid, title } = route.params.symposium;
  const [messages, setMessages] = useState([]);
  const [voteStatus, setVoteStatus] = useState({});

  React.useEffect(() => {
    if (sid) {
      const unsubscribe = onSnapshot(
        query(collection(db, 'messages'), where('SID', '==', sid), orderBy('upvotes', 'desc')),
        (snapshot) => {
          const firebaseMessages = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(firebaseMessages);
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [sid]);

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={styles.message}>
        <Message content={item.content} />
        <VoteView item={item} onVote={handleVote} voteStatus={voteStatus} />
      </View>
    </View>
  );

  const handleSendMessage = async (content) => {
    if (sid) {
      const newMessage = {
        id: messages.length + 1,
        content,
        upvotes: 0,
        downvotes: 0,
        SID: sid,
      };

      try {
        await addDoc(collection(db, 'messages'), newMessage);
      } catch (error) {
        console.error("Error writing new message to Firestore", error);
        return;
      }

      setMessages([...messages, newMessage]);
    } else {
      console.error("SID is undefined");
    }
  };

  const handleVote = (id, type) => {
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
    setVoteStatus({ ...voteStatus, [id]: type });

    const messageToUpdate = updatedMessages.find((message) => message.id === id);
    if (messageToUpdate) {
      const messageRef = doc(collection(db, 'messages'), id);
      updateDoc(messageRef, {
        upvotes: messageToUpdate.upvotes,
        downvotes: messageToUpdate.downvotes,
      })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
  }

  const handleGoBack = () => {
    navigation.dispatch(StackActions.pop(1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.button}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}> {title} </Text>
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