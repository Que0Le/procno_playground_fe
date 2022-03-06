import "../utils/config"
import {ENDPOINTS} from "../utils/config";


let api = {
    /**
     * Login to backend.
     * @param email
     * @param password
     * @returns {}
     */
    login: (email, password) => {
        let formData = new FormData();
        formData.append("username", email);  // yes, username but the content is email
        formData.append("password", password);
        return fetch(
            ENDPOINTS.login,
            {method: "POST", body: formData}
        ).then(response => {
            if (response.status === 200) {
                return {
                    status: "success",
                    user: response.json()
                };
            } else if (response.status === 400) {
                return {
                    status: "failure",
                    message: "Email or password was not correct!"
                };
            } else {
                return {
                    status: "unknown",
                    message: "unknown"
                };
            }
        });
    },

    sendTopicToServer: (user, isNewTopic, topic) => {
        let token = (user["user"]["access_token"])
        // console.log(topic)
        let headers = {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        return fetch(
            ENDPOINTS.topicEndpoint + (isNewTopic ? "" : topic["topic_uniq_id"]),
            {
                method: isNewTopic ? "POST" : "PUT",
                headers: headers,
                body: JSON.stringify(topic),
            }
        ).then(response => response.json())
            // TODO: check 201, verify, ...
            .then(data => {
                return data;
            })
    },

    // TODO: filter, limit ...
    getOwnerTopics: (user) => {
        let headers = {
            "Content-type": "application/json",
            "Authorization": `Bearer ${user["access_token"]}`}
        return fetch(
            ENDPOINTS.getOwnTopics,
            {method: "GET", headers: headers}
        ).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            return null;
        })
    },

    deleteTopicByUniqIdTopics: (user, topicUniqId) => {
        let headers = {
            "Content-type": "application/json",
            "Authorization": `Bearer ${user["access_token"]}`}
        return fetch(
            ENDPOINTS.deleteTopicByUniqId + topicUniqId,
            {method: "DELETE", headers: headers}
        ).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            return null;
        })
    },

    getTopicByUniqID: (uniqID) => {
        return fetch(
            ENDPOINTS.getTopicByUniqID + uniqID,
            {method: "GET"}
        ).then(response => {
            if (response.status === 200) {
                // console.log(response.json())
                return response.json();
            }
            return null;
        })
    },

    getAnswersForTopicByTopicUniqID: (uniqID) => {
        return fetch(
            ENDPOINTS.getAnswersForTopicByTopicUniqID + uniqID,
            {method: "GET"}
        ).then(response => {
            if (response.status === 200) {
                // console.log(response.json())
                return response.json();
            }
            return null;
        })
    },

    /**
     * Get topics to display on "/dashboard"
     * If user is null, backend will generate some random topics
     * Else, backend will generate topics tailored for this user
     * (Any user, not just the current logged-in user!)
     * @param user
     * @returns {*[]}
     */
    geTopicsForDashboard: (user) => {
        if (!user) {
            return [];
        } else {
            return [];
        }
    }
};

export default api;