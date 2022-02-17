

export const ENDPOINTS = {
    base: process.env.BASE_API || "http://localhost:8888/api/v1",
    login: process.env.LOGIN || "http://localhost:8888/api/v1/login/access-token",
    getOwnTopics: process.env.GET_OWN_TOPIC || "http://localhost:8888/api/v1/topics/own-topics",
}