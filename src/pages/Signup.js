import React, {useEffect, useState} from "react"
import useChangeRoute from "../hooks/useChangeRoute";
import {getUserFromLocalStorage} from "../utils/helpers";

export default function Signup({user, setUser}) {
	const [isLoaded, setIsLoaded] = useState(null);

	const changeRoute = useChangeRoute();

	useEffect(() => {
		if (!isLoaded || !user) {
			setUser(getUserFromLocalStorage());
			setIsLoaded(true);
		}
		if (user && isLoaded) {
			changeRoute("/dashboard");
		}
	})

	return (
		<div>
			<h1>Signup with username, email and password</h1>
		</div>
	)
}