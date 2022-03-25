import "../utils/config"
import "../utils/helpers"
import {ENDPOINTS} from "../utils/config";
import {storeUserInLocalStorage} from "../utils/helpers";


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
            ENDPOINTS.accessToken,
            {method: "POST", body: formData, credentials: "include"}
        ).then(response => {
            return new Promise((resolve, reject) => {
                if (response.status !== 200) {
                    // TODO: process server message
                    response.clone().json().then(payload => reject(payload["detail"]))
                }
                response.clone().json()
                    .then(payload => {
                        delete payload["access_token"]
                        storeUserInLocalStorage(payload)
                        resolve(payload);
                    })
            })
        });
    },

    logout: () => {
        return fetch(
            ENDPOINTS.accessToken,
            {method: "DELETE", credentials: "include"}
        ).then(response => {
            return new Promise((resolve, reject) => {
                if (response.status !== 200) {
                    response.clone().json().then(payload => reject(payload["detail"]));
                }
                resolve();
            })
        });
    },

    // sendTopicToServer: (user, isNewTopic, topic) => {
    //     let token = (user["user"]["access_token"])
    //     // console.log(topic)
    //     let headers = {
    //         "Content-type": "application/json",
    //         "Authorization": `Bearer ${token}`
    //     }
    //     return fetch(
    //         ENDPOINTS.topicEndpoint + (isNewTopic ? "" : topic["topic_uniq_id"]),
    //         {
    //             method: isNewTopic ? "POST" : "PUT",
    //             headers: headers,
    //             body: JSON.stringify(topic),
    //         }
    //     ).then(response => response.json())
    //         // TODO: check 201, verify, ...
    //         .then(data => {
    //             return data;
    //         })
    // },

    sendTopicToServer: (user, isNewTopic, topic) => {
        // console.log(topic)
        let headers = {
            // "Content-type": "application/json",
            // "Authorization": `Bearer ${token}`
        }
        return fetch(
            ENDPOINTS.topicEndpoint + (isNewTopic ? "" : topic["topic_uniq_id"]),
            {
                method: isNewTopic ? "POST" : "PUT",
                headers: headers,
                body: topic,
                credentials: "include"
            }
        ).then(response => response.json())
            // TODO: check 201, verify, ...
            .then(data => {
                return data;
            })
    },

    sendAnswerToServer: (isNewAnswer, answer) => {
        // console.log(topic)
        let headers = {
            // "Content-type": "application/json",
            // "Authorization": `Bearer ${token}`
        }
        return fetch(
            ENDPOINTS.answerEndpoint + (isNewAnswer ? "" : answer["topic_uniq_id"]),
            {
                method: isNewAnswer ? "POST" : "PUT",
                headers: headers,
                body: answer,
                credentials: "include"
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
            // "credentials": "include"
            // "Authorization": `Bearer ${user["access_token"]}`
        }
        return fetch(
            ENDPOINTS.getOwnTopics,
            {method: "GET", headers: headers, credentials: "include"}
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