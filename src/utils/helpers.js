

export function storeUserInLocalStorage(user) {
	localStorage.setItem("procno_user_token_type", user["token_type"]);
	localStorage.setItem("procno_user_uniq_id", user["uniq_id"]);
	localStorage.setItem("procno_user_username", user["username"]);
}

export function getUserFromLocalStorage() {
	let token_type = localStorage.getItem("procno_user_token_type");
	let uniq_id = localStorage.getItem("procno_user_uniq_id");
	let username = localStorage.getItem("procno_user_username");

	if (token_type && uniq_id && username) {
		return {
			"token_type": token_type,
			"uniq_id": uniq_id,
			"username": username,
		}
	}
	return null
}

export function removeUserFromLocalStorage() {
	localStorage.removeItem("procno_user_token_type");
	localStorage.removeItem("procno_user_uniq_id");
	localStorage.removeItem("procno_user_username");
}