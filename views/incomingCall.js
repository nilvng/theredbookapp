import { StyleSheet, Text, View } from 'react-native';
import { VStack, Box, Divider, Avatar, HStack, Button, Spacer } from "@react-native-material/core";


export default function IncomingCall(props) {
  return (
    <View style={styles.container}>
      <VStack m={4} spacing={2}>
        {/* Title */}
        <Box mt={20} pb={3}>
          <Text style={styles.title}>'{props.space.name}' has Started</Text>
          <Text style={styles.subtitle}>{props.space.speakers.length} speaker{props.space.speakers.length == 1 ? '' : 's'}</Text>
        </Box>
        {/* Avatars */}
        <HStack style={{
          justifyContent: 'space-evenly',
        }}>
          {props.space.speakers.slice(0, 4).map((speaker) => (
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
