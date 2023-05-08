import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { VStack } from "@react-native-material/core";

export default function SpaceListView(props) {
  const Item = ({ title, date, topics }) => (
    <VStack fill>
      <Text>{title}</Text>
      <Text>{date}</Text>
      <Text>{topics}</Text>
      {/* {topics.map((topic) => (
        <Text>{topic}</Text>
      ))} */}
    </VStack>
  );
  return (
    <View style={{ flex: 1, backgroundColor: 'white', width: "100%" }}>
      <Text>SpaceListView</Text>
      <FlatList data={props.data}
        keyExtractor={(item) => item.sid}
        renderItem={({ item }) => <Item title={item.title} date={item.startDate} topics={item.topic} />} />
    </View>
  )
}
