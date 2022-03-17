import React, {useEffect, useState} from "react"
import {Alert, Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import api from "../services/api";
import useChangeRoute from "../hooks/useChangeRoute";
import {getUserFromLocalStorage} from "../utils/helpers";

export default function Login({user, setUser}) {
	const [isLoaded, setIsLoaded] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const changeRoute = useChangeRoute();

	function handleSubmit() {
		api.login(
			document.getElementById("email_input").value,
			document.getElementById("password_input").value
		)
			.then(user => {
				setUser(user)
				setErrorMessage("");
				changeRoute("/dashboard");
			})
			.catch(message => {
				setErrorMessage(message);
			});
	}

	function handleClear() {
		document.getElementById("email_input").value= "";
		document.getElementById("password_input").value = "";
	}

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
			<h1>Login with email and password</h1>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					p: 1,
					m: 1,
					bgcolor: "background.paper",
					borderRadius: 1,
				}}
			>
				<TextField
					sx={{margin: 1}}
					id="email_input" label="Email"
					autoFocus
				/>
				<TextField
					sx={{margin: 1}}
					id="password_input" label="Password"
					type="password"
				/>
			</Box>
			{errorMessage ? <Alert severity="error"> {errorMessage} </Alert> : <></>}
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					p: 1,
					m: 1,
					bgcolor: "background.paper",
					borderRadius: 1,
				}}
			>
				<Button onClick={handleSubmit}>Submit</Button>
				<Button onClick={handleClear}>Clear</Button>
			</Box>
		</div>
	)
}
