

export const ENDPOINTS = {
    base: process.env.BASE_API || "http://localhost:8888/api/v1",
    login: process.env.LOGIN || "http://localhost:8888/api/v1/login/access-token",
    getOwnTopics: process.env.GET_OWN_TOPIC || "http://localhost:8888/api/v1/topics/own-topics",
    getTopicByUniqID: process.env.GET_TOPIC_BY_UNIQ_ID || "http://localhost:8888/api/v1/topics/uniq_id/",
    getAnswersForTopicByTopicUniqID: process.env.GET_ANSWERS_FOR_TOPIC_BY_TOPIC_UNIQ_ID || "http://localhost:8888/api/v1/answers/for-topic/",
    getAudioRecordByFileName: process.env.GET_AUDIO_RECORD_BY_FILE_NAME || "http://localhost:8888/api/v1/data/dummies-records/",
    topicEndpoint: process.env.TOPIC_ENDPOINT || "http://localhost:8888/api/v1/topics/own-topics/",
}