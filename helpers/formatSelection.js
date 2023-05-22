export const getSpeakersNameString = (speakerIdsString) => {
    let speakers = getSpeakers(speakerIdsString)
    let speakerObjects = [];
    for (let i = 0; i < speakers.length; i++) {
        speakerObjects.push(speakers[i].name);
    }
    return speakerObjects.join(", ");
}

export const getSpeakers = (speakerIdsString) => {
    let speakers = speakerIdsString.split(",");
    let speakerObjects = [];
    for (let i = 0; i < speakers.length; i++) {
        let found = testData.speakers.find(speaker => speaker.id == speakers[i]);
        if (found != null) {
            speakerObjects.push(testData.speakers.find(speaker => speaker.id == speakers[i]));
        }
    }
    return speakerObjects;
}

export const getTopicsNameString = (topicsIdString) => {
    return getTopics(topicsIdString).join(" - ");
}

export const getTopics = (topicsIdString) => {
    let topics = topicsIdString.split(",");
    let topicObjects = [];
    for (let i = 0; i < topicList.length; i++) {
        if (topics.includes(i.toString())) {
            topicObjects.push(topicList[i]);
        }
    }
    return topicObjects;
}

export const topicList = ["Entertainment", "Politics", "IT", "Business"]

export const testData = {
    title: 'Important Meeting',
    startDate: '2021-04-01T12:00:00Z',
    speakers: [
        {
            id: 1,
            name: 'Speaker 1',
            avatar: { uri: 'https://pbs.twimg.com/profile_images/1356980987360591877/X3n_qwdq_400x400.jpg' },
        },
        {
            id: 2,
            name: 'Speaker 2',
            avatar: { uri: 'https://pbs.twimg.com/profile_images/1315124510689951744/xMft8kFx_400x400.png' },
        },
        {
            id: 3,
            name: 'Speaker 3',
            avatar: { uri: 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg' },
        },
        {
            id: 4,
            name: 'Speaker 4',
            avatar: { uri: 'https://pbs.twimg.com/profile_images/1372928334653444103/hoyp5vRt_400x400.jpg' },
        },
        {
            id: 5,
            name: 'Speaker 5',
            avatar: { uri: 'https://pbs.twimg.com/profile_images/1330811947026055168/3u8TsJde_400x400.jpg' },
        }
    ],
}