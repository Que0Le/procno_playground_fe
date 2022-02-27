import React, {useEffect, useState} from "react"
import {Alert, Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import api from "../services/api";
import useChangeRoute from "../hooks/useChangeRoute";

const labels = {
	"title_input": "Topic title",
	"source_languages_input": "Source language",
	"source_level_input": "Source language level",
	"wish_languages_input": "Wish languages",
	"tags_input": "Tags",
	"readtext_input": "Read text",
	"commentar_input": "Commentar"
}

export default function TopicEditor({user, oldTopic, isNewTopic}) {
	const [errorMessage, setErrorMessage] = useState("");
	const changeRoute = useChangeRoute();

	function handleSubmit() {
		let newTopic = {}
		let inputValues = {
			"title_input": document.getElementById("title_input").value,
			"source_languages_input": document.getElementById("source_languages_input").value,
			"source_level_input": document.getElementById("source_level_input").value,
			"wish_languages_input": document.getElementById("wish_languages_input").value,
			"tags_input": document.getElementById("tags_input").value,
			"readtext_input": document.getElementById("readtext_input").value,
			"commentar_input": document.getElementById("commentar_input").value
		}
		let constructMessage = ""
		for (const [key, value] of Object.entries(inputValues)) {
			// console.log(`${key}: ${value}`);
			if (value === "") {
				constructMessage += labels[key] + ", ";
			}
		}
		if (constructMessage !== "") {
			setErrorMessage("No empty field allowed: " + constructMessage.substring(0, constructMessage.length - 2));
			return;
		}

		if (isNewTopic) {
			newTopic["topic_title"] = inputValues["title_input"]
			newTopic["source_language"] = inputValues["source_languages_input"]
			newTopic["source_level"] = inputValues["source_level_input"]
			newTopic["owner_uniq_id"] = user ? user["uniq_id"] : ""
			newTopic["owner_username"] = user ? user["username"] : ""
			newTopic["wish_correct_languages"] = inputValues["wish_languages_input"].split(",")
			newTopic["tags"] = inputValues["tags_input"].split(",")
			newTopic["readtext"] = inputValues["readtext_input"]
			newTopic["record_filename"] = "__PLACE__HOLDER__"
			newTopic["commentar"] = inputValues["commentar_input"]
		} else {
			oldTopic["topic_title"] = inputValues["title_input"]
			oldTopic["source_language"] = inputValues["source_languages_input"]
			oldTopic["source_level"] = inputValues["source_level_input"]
			oldTopic["wish_correct_languages"] = inputValues["wish_languages_input"].split(",")
			oldTopic["tags"] = inputValues["tags_input"].split(",")
			oldTopic["readtext"] = inputValues["readtext_input"]
			oldTopic["commentar"] = inputValues["commentar_input"]
		}
		// setErrorMessage("");
		// console.log(newTopic);
		api.sendTopicToServer(user={user}, isNewTopic, isNewTopic ? newTopic : oldTopic)
			.then(response => {
				if (response["status"] === "success") {
					// console.log({"response": response})
					console.log(response["topic"])
					setErrorMessage("");
					// TODO: this looks funny. Might need to fix this and api
					// response["topic"].then(topic => changeRoute("/topic/" + topic["topic_uniq_id"]));
					// response.then(data => console.log(data["topic"]));
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

	useEffect(() => {
		const now = Date.now();
		Object.keys(labels).forEach(k => {
			// console.log(k)
			document.getElementById(k).value = now;
		})
	})
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
