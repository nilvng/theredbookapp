import { FlatList, View } from "react-native";
import React, { useState } from 'react';
import { Image } from "react-native";
import { HStack, Text, Avatar } from "@react-native-material/core";
import { Title } from "react-native-paper";
function LiveView({ navigation, symposium }) {
    const numberOfSpeakers = symposium.speakers.length < 4 ? symposium.speakers.length : 3;
    return (
        <View style={{ margin: 20 }}>
            <Title>{symposium.title}</Title>
            <HStack style={{ width: "100%", alignSelf: "baseline", backgroundColor: "#BD827D", padding: 8, borderRadius: 36 }} direction='row' items='center' justify='between'>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {symposium.speakers.slice(0, numberOfSpeakers).map((speaker) => (
                        <Avatar size={32} key={speaker.id} image={speaker.avatar}></Avatar>
                    ))}
                    <Text> {symposium.speakers.length}+</Text>
                </View>
                <Image
                    style={{ width: 40, height: 20 }}
                    source={require("../../assets/sound_wave.gif")} />
            </HStack>

        </View >
    );
}

export default LiveView;