import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import IncomingCall from './views/incomingCall';
import BasicModal from './Symposium/BasicModal';
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

export default function App() {
  return (
    <View style={styles.container}>
      <IncomingCall space={testData}></IncomingCall>
      <BasicModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
