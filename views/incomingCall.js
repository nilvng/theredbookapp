import { StyleSheet, Text, View } from 'react-native';
import { VStack, Box, Divider, Avatar, HStack, Button } from "@react-native-material/core";


export default function IncomingCall(props) {
  return (
    <View style={styles.container}>
      <VStack m={4} spacing={2}>
        {/* Title */}
        <Box mt={"4em"} pb={"3em"}>
          <Text style={styles.title}>'{props.space.name}' has Started</Text>
          <Text style={styles.subtitle}>{props.space.speakers.length} speaker{props.space.speakers.length == 1 ? '' : 's'}</Text>
        </Box>
        {/* Avatars */}
        <HStack style={{
          justifyContent: 'space-evenly',
          zIndex: 2,
        }}>
          {props.space.speakers.slice(0, 4).map((speaker) => (
            <Avatar key={speaker.id} image={speaker.avatar}></Avatar>
          ))}
        </HStack>
        {/* Platform effect */}
        <Box style={styles.platform}/>
        {/* Buttons */}
        <VStack m={"4em"} spacing={"1em"}>
          <Button style={styles.button} title="Join" color="#66bb6a" />
          <Button style={styles.button} title="Ignore" color="#f44336" />
        </VStack>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: "2em",
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: "0.8em",
    color: '#FFFFFF',
    textAlign: 'center',
  },
  button: {
    padding: "0.5em"
  },
  platform: {
    backgroundColor: "transparent",
    alignSelf: 'stretch',
    borderColor: "transparent",
    borderBottomWidth: "10px",
    borderBottomColor: "#404040",
    borderLeftWidth: "20px",
    borderRightWidth: "20px",
    marginHorizontal: "5px",
    marginTop: "-7px",
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#303030',
    color: '#FFFFFF',
    alignItems: 'center',
  },
});
