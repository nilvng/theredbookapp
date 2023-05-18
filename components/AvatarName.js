import React from 'react'
import { Avatar } from 'react-native-paper'
import { View, Text } from 'react-native'

export default function AvatarName({ name, image }) {
    return (
        <View style={{ alignItems: "center" }}>
            {image == null && <Avatar.Text size={45} label={name[0]} />}
            {image != null && <Avatar.Image size={45} source={{ uri: image }} />}
            <Text> {name} </Text>
        </View>
    )
}
