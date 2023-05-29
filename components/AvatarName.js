import React from 'react'
import { Avatar } from 'react-native-paper'
import { View, Text } from 'react-native'

export default function AvatarName({ name, image, isSelected }) {
    return (
        <View style={{ alignItems: "center", marginTop: 4, borderWidth: (isSelected ? 1 : 0), marginHorizontal: 6, borderColor: "black", paddingHorizontal: 4 }}>
            {console.log("isSelected: " + isSelected)}
            {image == null && name != null && <Avatar.Text size={45} label={name[0].toUpperCase()} />}
            {image != null && <Avatar.Image size={45} source={{ uri: image }} />}
            <Text style={{ marginTop: 6 }}> {name} </Text>
        </View>
    )
}
