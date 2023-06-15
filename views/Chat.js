/**
 * `Chat` component fetches messages related to a specific symposium from Firebase, 
 * displays them in a `FlatList`, and provides an `InputBox` for sending new messages.
 * The header of the chat screen displays the symposium title and a back button.
 */

import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Message from '../Chat/Message';
import InputBox from '../Chat/InputBox';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { StackActions } from '@react-navigation/native';
import { auth, db } from '../firebase.config';
import { addDoc, collection, onSnapshot, query, where, doc, updateDoc, orderBy } from '@firebase/firestore';
import { UserContext } from '../Contexts';


/**
 * This is a React component that retrieves messages from a Firebase database based on a symposium ID
 * and updates the state with the retrieved messages.
 */
const Chat = ({ route, navigation }) => {
  const { sid, title } = route.params.symposium;
  const [messages, setMessages] = useState([]);
  const [voteStatus, setVoteStatus] = useState({});
  const [user] = useContext(UserContext);
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

  /**
   * This function renders a message container with a message component inside, passing in item data, a
   * boolean value indicating if the message belongs to the current user, and a function to handle
   * voting.
   */
  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={styles.message}>
        <Message 
          item={item}
          isMyMessage={user.name == item.userName}
          onVote={handleVote}
          />
      </View>
    </View>
  );

  /**
 * Handles the message sending operation. It sends the message to Firestore and updates the state.
 * @param content - The message content.
 * @returns In case of error while sending, it won't update the state. Otherwise, it adds the new message to the state.
 */

  const handleSendMessage = async (content) => {
    if (sid) {
      const newMessage = {
        id: messages.length + 1,
        content,
        upvotes: 0,
        downvotes: 0,
        SID: sid,
        userName: user.name ?? auth.currentUser.email
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

 /**
  * This function handles upvoting and downvoting of messages and updates the database accordingly.
  * @param id - The id of the message being voted on.
  * @param type - The type of vote, either "upvote" or "downvote".
  */

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

    /* `setMessages(updatedMessages)` updates the state of the `messages` array with the new array of
    messages that includes the updated vote counts for the message with the specified `id`. */
    setMessages(updatedMessages);
    setVoteStatus({ ...voteStatus, [id]: type });

    /* This code block is updating the vote counts for a specific message in the Firebase database. */
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

 /**
  * This function handles going back one screen in a navigation stack.
  */
  const handleGoBack = () => {
    navigation.dispatch(StackActions.pop(1));
  };

 /**
 * `Chat` component render function. It includes a View component with a header, FlatList for messages, and an InputBox for new messages. 
 * The header features a back button and symposium title. FlatList renders messages using renderItem function. 
 * InputBox uses handleSendMessage to send a new message.
 */

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

/**
 * `const styles` is an object containing style definitions for Chat's components, created using `StyleSheet.create()`.
 * Each property corresponds to a component and holds its specific style rules, which are applied through the `style` prop.
 */

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