/**
 * A React component rendering a voting view with upvote and downvote buttons, utilizing `react-native-paper`.
 * It accepts `item` (voting information) and `onVote` (voting logic handler) as props.
 * Returns a `View` with two `ButtonPaper` components styled via `StyleSheet`.
 */

import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Button as ButtonPaper } from 'react-native-paper';

/**
 * `VoteView` is a functional React component accepting `item` and `onVote` as props. It renders a `View` 
 * with two `ButtonPaper` components for upvote and downvote, each calling `onVote` with `item.id` and vote type.
 * Vote counts are displayed using `item.upvotes` and `item.downvotes`. Styles are defined via `StyleSheet`.
 */

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
/**
 * `const styles` creates a stylesheet for the `VoteView` component using `StyleSheet.create()`. 
 * It optimizes `voteContainer` style for performance, defining `flexDirection` as `row` and `alignItems` as `center`.
 */

const styles = StyleSheet.create({
    voteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})
