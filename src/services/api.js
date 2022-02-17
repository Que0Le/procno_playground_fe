import "../utils/config"
import {ENDPOINTS} from "../utils/config";


let api = {
    login: (email, password) => {
        let formData = new FormData();
        formData.append("username", email);  // yes, its username but the content is email
        formData.append("password", password);
        return fetch(
            ENDPOINTS.login,
            {method: "POST", body: formData}
        ).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            return null;
        });
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
};

export default api;