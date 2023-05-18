import { StyleSheet, Text, View } from 'react-native';
import { VStack, Box, Divider, Avatar, HStack, Button, Spacer, Surface, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { auth } from '../remote/firebase';
import { useState } from 'react';

const testData = {
  name: 'Important Meeting',
  startDate: '2021-04-01T12:00:00Z',
  speakers: [
    {
      id: 1,
      name: 'Speaker 1',
      avatar: { uri: 'https://pbs.twimg.com/profile_images/1356980987360591877/X3n_qwdq_400x400.jpg' },
    },
    {
      id: 2,
      name: 'Speaker 2',
      avatar: { uri: 'https://pbs.twimg.com/profile_images/1315124510689951744/xMft8kFx_400x400.png' },
    },
    {
      id: 3,
      name: 'Speaker 3',
      avatar: { uri: 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg' },
    },
    {
      id: 4,
      name: 'Speaker 4',
      avatar: { uri: 'https://pbs.twimg.com/profile_images/1372928334653444103/hoyp5vRt_400x400.jpg' },
    },
    {
      id: 5,
      name: 'Speaker 5',
      avatar: { uri: 'https://pbs.twimg.com/profile_images/1330811947026055168/3u8TsJde_400x400.jpg' },
    }
  ],
}

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
  }

  return (
    <View style={styles.container}>
      <Spacer />
      <Surface style={styles.surface}
        elevation={4}
        category="medium"
        padding={40}
      >
        <VStack>
          <Text style={styles.title}>Redbook</Text>
          <Box>
            <TextInput style={styles.textBox} label="Email" defaultValue="s3779569@student.rmit.edu.au" value={email} onChangeText={text => setEmail(text)} leading={props => <Icon name="account" {...props} />} />
            <TextInput style={styles.textBox} label="Password" defaultValue="Password123-+" leading={props => <Icon name="lock" {...props} />} />
            <Button style={styles.button} title="Log In" color="pink" onPress={handleLogin} />
          </Box>
        </VStack>

      </Surface>
      <Spacer />
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    backgroundColor: "#4353535",
    color: '#FFFFFF',
    width: 300,
    height: 360,
  },
  textBox: {
    marginTop: 16,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingBottom: 16,
  },
  button: {
    padding: 2,
    marginTop: 24,
  },
  platform: {
    backgroundColor: "transparent",
    alignSelf: 'stretch',
    borderColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#404040",
    borderLeftWidth: 20,
    borderRightWidth: 20,
    marginHorizontal: 5,
    marginTop: 28,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#303030',
    color: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 50,
  },
});
