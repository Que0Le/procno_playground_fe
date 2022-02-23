import React, {useEffect, useState} from "react"
import {Alert, Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import api from "../services/api";
import useChangeRoute from "../hooks/useChangeRoute";

export default function Login({user, setUser}) {
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const changeRoute = useChangeRoute();

	function handleSubmit() {
		api.login(
			document.getElementById("email_input").value,
			document.getElementById("password_input").value
		)
			.then(response => {
				if (response["status"] === "success") {
					// TODO: this looks funny. Might need to fix this and api
					response["user"].then(user => setUser(user));
					setErrorMessage("");
					setIsLoggedIn(true);
					changeRoute("/dashboard");
				} else {
					setErrorMessage(response["message"])
				}
			});
	}

	function handleClear() {
		document.getElementById("email_input").value= "";
		document.getElementById("password_input").value = "";
	}

	// useEffect(() => {
	//
	// })
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
