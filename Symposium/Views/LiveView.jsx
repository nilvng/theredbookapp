import { View } from "react-native";
import React from 'react';
import { Image } from "react-native";
import { HStack, Text, Avatar } from "@react-native-material/core";
import { Button, Title } from "react-native-paper";
import { getSpeakers } from "../../helpers/formatSelection";
function LiveView({ navigation, route }) {
    const { symposium } = route.params;
    const numberOfSpeakers = symposium.host.length < 4 ? symposium.host.length : 3;
    return (
        <View style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: "#F3EED9" }}>
            <HStack justify="between">
                <Title>{symposium.title}</Title>
                <Button onPress={() => navigation.goBack()}>End</Button>
            </HStack>
            <HStack style={{ width: "100%", alignSelf: "baseline", backgroundColor: "#BD827D", padding: 8, borderRadius: 36 }} direction='row' items='center' justify='between'>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {getSpeakers(symposium.host).slice(0, numberOfSpeakers).map((speaker) => (
                        <Avatar size={32} key={speaker.id} image={speaker.avatar}></Avatar>
                    ))}
                    <Text> {symposium.host.length}+</Text>
                </View>
                <Image
                    style={{ width: 40, height: 20 }}
                    source={require("../../assets/sound_wave.gif")} />
            </HStack>

        </View >
    );
}

export default LiveView;