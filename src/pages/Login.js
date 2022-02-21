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
// 	topic_uniq_id: str
// 	topic_title: str
// 	source_language: str
// 	source_level: str
// 	wish_correct_languages: List[str]
// 	topic_created_at: datetime
// 	topic_updated_at: datetime
// #
// 	owner_uniq_id: str
// 	owner_username: str
// #
// 	nbr_answer: int
// #
// 	tag_and_uniq_id_s: List[TagAndID] = None
// #
// 	question_uniq_id: str
// 	question_created_at: datetime
// 	question_updated_at: datetime
// #
// 	readtext_uniq_id: str
// 	readtext: str
// 	readtext_created_at: datetime
// 	readtext_updated_at: datetime
// #
// 	record_uniq_id: str
// 	record_filename: str
// 	record_created_at: datetime
// 	record_updated_at: datetime
// #
// 	commentar_uniq_id: str
// 	commentar: str
// 	commentar_created_at: datetime
// 	commentar_updated_at: datetime

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
