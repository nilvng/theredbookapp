import { testData } from '../views/incomingCall';
import { topicList } from '../Symposium/Views/CreateModal';
export const getSpeakers = (speakerIdsString) => {
    let speakers = speakerIdsString.split(",");
    let speakerObjects = [];
    for (let i = 0; i < speakers.length; i++) {
        let found = testData.speakers.find(speaker => speaker.id == speakers[i]);
        if (found != null) {
            speakerObjects.push(testData.speakers.find(speaker => speaker.id == speakers[i]).name);
        }
    }
    return speakerObjects.join(", ");
}
export const getTopics = (topicsIdString) => {
    let topics = topicsIdString.split(",");
    let topicObjects = [];
    for (let i = 0; i < topicList.length; i++) {
        if (topics.includes(i.toString())) {
            topicObjects.push(topicList[i]);
        }
    }
    return topicObjects.join(" - ");
}