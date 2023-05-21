import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Button as ButtonPaper } from 'react-native-paper';
export default function VoteView({ item, onVote }) {
    return (
        <View style={styles.voteContainer}>
            <ButtonPaper
                icon="thumb-up"
                buttonColor='#F3EED9'
                textColor='black'
                onPress={() => onVote(item.id, 'upvote')}
                labelStyle={{ fontSize: 12 }}
                style={{ height: 38 }}
            >
                <Text style={{ fontSize: 12 }}>{item.upvotes}</Text>
            </ButtonPaper>

            <View style={{ width: 10 }} />

            <ButtonPaper
                icon="thumb-down"
                buttonColor='#F3EED9'
                textColor='black'
                onPress={() => onVote(item.id, 'downvote')}
                labelStyle={{ fontSize: 12 }}
                style={{ height: 38 }}
            >
                <Text style={{ fontSize: 12 }}>{item.downvotes}</Text>
            </ButtonPaper>
        </View>
    )
}
const styles = StyleSheet.create({
    voteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})
