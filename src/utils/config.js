
const BASE_API = "http://192.168.1.15:8888/api/v1";

export const ENDPOINTS = {
    base: process.env.BASE_API || BASE_API,
    login: process.env.LOGIN || BASE_API + "/login/access-token",
    getOwnTopics: process.env.GET_OWN_TOPIC || BASE_API + "/topics/own-topics",
    getTopicByUniqID: process.env.GET_TOPIC_BY_UNIQ_ID || BASE_API + "/topics/uniq_id/",
    deleteTopicByUniqId: process.env.DELETE_TOPIC_BY_UNIQ_ID || BASE_API + "/topics/uniq_id/",
    getAnswersForTopicByTopicUniqID: process.env.GET_ANSWERS_FOR_TOPIC_BY_TOPIC_UNIQ_ID || BASE_API + "/answers/for-topic/",
    getAudioRecordByFileName: process.env.GET_AUDIO_RECORD_BY_FILE_NAME || BASE_API + "/data/record-or-dummy/",
    // topicEndpoint: process.env.TOPIC_ENDPOINT || BASE_API + "/topics/test/",
    topicEndpoint: process.env.TOPIC_ENDPOINT || BASE_API + "/topics/own-topics/",
}