import { StyleSheet, Text, View } from 'react-native';
import { VStack, Box, Avatar, HStack, Button, Spacer } from "@react-native-material/core";
import NotificationBar from '../components/notificationBar';

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

export default function IncomingCall({ navigation }) {
  return (
    <View style={styles.container}>
      <NotificationBar
        message={"'" + testData.name +"' has Started"}
        buttons={[
          {
            title: 'Join',
          },
          {
            title: 'Ignore',
            onPress: () => {navigation.navigate('Archive');},
          }
        ]}
      />

      <VStack m={4} spacing={2}>
        {/* Title */}
        <Box mt={20} pb={3}>
          <Text style={styles.title}>'{testData.name}' has Started</Text>
          <Text style={styles.subtitle}>{testData.speakers.length} speaker{testData.speakers.length == 1 ? '' : 's'}</Text>
        </Box>
        {/* Avatars */}
        <HStack style={{
          justifyContent: 'space-evenly',
        }}>
          {testData.speakers.slice(0, 4).map((speaker) => (
            <Avatar key={speaker.id} image={speaker.avatar}></Avatar>
          ))}
        </HStack>
        {/* Platform effect */}
        <Box style={styles.platform} />
        <Spacer />
        {/* Buttons */}
        <VStack m={4} spacing={8}>
          <Button style={styles.button} title="Join" color="#66bb6a" />
          <Button style={styles.button} title="Ignore" color="#f44336" />
          <Button style={styles.button} title="Archive" color="blue"
            onPress={() => navigation.navigate('Archive')}
          />
        </VStack>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 1,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  button: {
    padding: 4
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
