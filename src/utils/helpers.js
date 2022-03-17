

export function storeUserInLocalStorage(user) {
	localStorage.setItem("procno_user_token_type", user["token_type"]);
	localStorage.setItem("procno_user_uniq_id", user["uniq_id"]);
	localStorage.setItem("procno_user_username", user["username"]);
}

export function getUserFromLocalStorage() {
	let token_type = localStorage.getItem("procno_user_token_type");
	let uniq_id = localStorage.getItem("procno_user_uniq_id");
	let username = localStorage.getItem("procno_user_username");
	let procno_token_expiration = getCookie("procno_token_expiration");

	if (token_type && uniq_id && username && procno_token_expiration) {
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
	deleteCookie("procno_token_expiration");
}

// https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

// https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// https://www.w3schools.com/js/js_cookies.asp
function deleteCookie(cname) {
	document.cookie = cname + "=; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}