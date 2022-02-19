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

    /**
     * Get topics to display on /dashboard
     * If user is null, backend will generate some random topics
     * Else, backend will generate topics tailored for this user
     * (Any user, not just the current logged-in user!)
     * @param user
     * @returns {*[]}
     */
    geTopicsForDashboardT: (user) => {
        if (!user) {
            return [];
        } else {
            return [];
        }
    }
};

export default api;