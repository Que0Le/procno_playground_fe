import React, {useEffect, useState} from "react"
import {Alert, Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import api from "../services/api";
import useChangeRoute from "../hooks/useChangeRoute";

export default function TopicEditor({user, oldTopic, isNewTopic}) {
	const [errorMessage, setErrorMessage] = useState("");
	const changeRoute = useChangeRoute();

	function handleSubmit() {
		let newTopic = {}
		if (isNewTopic) {
			newTopic["topic_title"] = document.getElementById("title_input").value
			newTopic["source_language"] = document.getElementById("source_languages_input").value
			newTopic["source_level"] = document.getElementById("source_level_input").value
			newTopic["wish_correct_languages"] = document.getElementById("wish_languages_input").value
			newTopic["tags"] = document.getElementById("tags_input").value.split(",")
			newTopic["readtext"] = document.getElementById("readtext_input").value
			newTopic["commentar"] = document.getElementById("commentar_input").value
		} else {
			oldTopic["topic_title"] = document.getElementById("title_input").value
			oldTopic["source_language"] = document.getElementById("source_languages_input").value
			oldTopic["source_level"] = document.getElementById("source_level_input").value
			oldTopic["wish_correct_languages"] = document.getElementById("wish_languages_input").value
			oldTopic["tags"] = document.getElementById("tags_input").value.split(",")
			oldTopic["readtext"] = document.getElementById("readtext_input").value
			oldTopic["commentar"] = document.getElementById("commentar_input").value
		}
		api.sendTopicToServer(isNewTopic, isNewTopic ? newTopic : oldTopic)
			.then(response => {
				if (response["status"] === "success") {
					// TODO: this looks funny. Might need to fix this and api
					setErrorMessage("");
					response["topic"].then(topic => changeRoute("/topic/" + topic["topic_uniq_id"]));
				} else {
					setErrorMessage(response["message"])
				}
			});
	}

	function handleClear() {
		document.getElementById("title_input").value = "";
		document.getElementById("source_languages_input").value = "";
		document.getElementById("source_level_input").value = "";
		document.getElementById("wish_languages_input").value = "";
		document.getElementById("tags_input").value = "";
		document.getElementById("readtext_input").value = "";
		document.getElementById("commentar_input").value = "";
	}

	// useEffect(() => {
	//
	// })
	return (
		<div>
			<h1>Topic editor</h1>
			<Box
				sx={{
					display: "flex", flexDirection: "column",
					p: 1, m: 1,
					bgcolor: "background.paper", borderRadius: 1,
				}}
			>
				<TextField sx={{margin: 1}} id="title_input" label="Topic title" required={true}/>
				<TextField sx={{margin: 1}} id="source_languages_input" label="Source language" required={true}/>
				<TextField sx={{margin: 1}} id="source_level_input" label="Source language level" required={true}/>
				<TextField sx={{margin: 1}} id="wish_languages_input" label="Wish languages" required={true}/>
				<TextField sx={{margin: 1}} id="tags_input" label="Tags" required={true}/>
				<TextField sx={{margin: 1}} id="readtext_input" label="Read text" multiline minRows={1} maxRows={10} required={true}/>
				<TextField sx={{margin: 1}} id="commentar_input" label="Commentar" required={true}/>
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
